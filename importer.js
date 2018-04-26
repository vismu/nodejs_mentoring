import EventEmitter from "events";
import csvToJson from "convert-csv-to-json";

export default class Importer extends EventEmitter {
  import = filePath =>
    new Promise(resolve => resolve(csvToJson.getJsonFromCsv(filePath)));

  importSync = filePath => csvToJson.getJsonFromCsv(filePath);
}
