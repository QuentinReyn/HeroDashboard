export class Serializable {

    fromJSON(json) {
      for (const propName in json) {
        if (json.hasOwnProperty(propName)) {
          this[propName] = json[propName];
        }
      }
      return this;
    }
  }
  