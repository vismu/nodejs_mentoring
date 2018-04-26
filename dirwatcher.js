import EventEmitter from "events";
import fs from "fs";
import path from "path";
import map from "async/map";

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.watchedFiles = {};
  }

  watch(dir, delay = 0) {
    if (!dir) {
      throw new Error("DirWatcher: dir argument is missing in watch method");
    }

    this.watcher = setInterval(() => {
      fs.readdir(dir, (err, files) =>
        map(files, file =>
          fs.stat(path.join(dir, file), (err, fileStats) => {
            if (this.watchedFiles[file] !== fileStats.mtimeMs) {
              this.watchedFiles[file] = fileStats.mtimeMs;
              this.emit("changed", path.join(dir, file));
            }
          })
        )
      );
    }, delay);
  }
}
