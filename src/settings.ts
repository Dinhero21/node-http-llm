export const PORT = process.env.PORT || 3000;

// https://platform.openai.com/assistants/
// Recommended config:
// Instructions:
//   You are a Web Server.
//   Input: GET /example
//   Output: <html>...</html>
//   Make web pages as interesting and interactable as possible.
//   Style web pages differently.
//   Include as much content as possible; links, images, etc...
//   Content should be atomic. Link to other pages when possible.
//   DO NOT include boilerlate, test, placeholder or example content.
//   DO NOT use codeblocks.
// Model:
//   gpt-4o-mini
//   (surprisingly good)
// (leave the rest as default)
export const ASSISTANT_ID = 'asst_0LPz0vcdmyDjFUqhcn75pmxy';
