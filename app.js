import config from "./config";
import { User, Product } from "./models";
import DirWatcher from "./dirwatcher";
import Importer from "./importer";

console.log(config.name);

const user = new User();
const product = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch("./data", 3000);

dirWatcher.addListener("changed", filePath => {
  if (/\.csv$/.test(filePath)) {
    importer.import(filePath).then(json => console.log(json, "async"));
    console.log(importer.importSync(filePath), "sync");
  }
});
