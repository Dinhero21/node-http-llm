import { createReadStream } from 'fs';
import { createServer } from 'http';
import OpenAI from 'openai';

import Queue from './queue.js';
import { ASSISTANT_ID, PORT } from './settings.js';

const openai = new OpenAI();

const thread = await openai.beta.threads.create();

const queue = new Queue();

const server = createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    createReadStream('favicon.ico').pipe(res, { end: true });
    return;
  }

  const reqTime = Date.now();

  queue.push(async () => {
    if (req.closed) return;

    const resStartTime = Date.now();

    try {
      await openai.beta.threads.messages.create(thread.id, {
        content: `${req.method} ${req.url}`,
        role: 'user',
      });

      const stream = await openai.beta.threads.runs.stream(thread.id, {
        assistant_id: ASSISTANT_ID,
      });

      stream.on('textDelta', (delta) => {
        const text = delta.value;
        if (text === undefined) return;

        res.write(text);
      });

      await new Promise<void>((resolve) => {
        stream.on('end', resolve);
      });

      res.end();
    } catch (error) {
      console.error(error);

      res.statusCode = 500;
      res.end();
    }

    const resEndTime = Date.now();

    console.log(
      `${req.method} ${req.url} | start:${
        resStartTime - reqTime
      }ms | duration:${resEndTime - resStartTime}ms`
    );
  });
});

server.listen(PORT);
