type AsyncVoid = void | Promise<void>;
type AsyncVoidFunction = () => AsyncVoid;

class Queue {
  protected readonly _queue: AsyncVoidFunction[] = [];

  public push(task: AsyncVoidFunction) {
    this._queue.push(task);
    this._run();
  }

  protected running: boolean = false;

  protected async _run() {
    if (this.running) return;
    this.running = true;

    while (this._queue.length > 0) {
      const task = this._queue.shift();
      if (task === undefined) break;

      await task();
    }

    this.running = false;
    this._queue.length = 0;
  }
}

export default Queue;
