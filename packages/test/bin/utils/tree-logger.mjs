// This should either be a third-party module from NPM that does this better, or
//   it should be moved to a separate package in this monorepo.

const ERROR_CODE = 1;
const INDEX_OFFSET = 1;
const NONE = 0;

export default class TreeLogger {
  _indent = NONE;

  _logged = false;

  constructor(value) {
    this._tree = {
      children: [],
      value,
    };

    process.on('uncaughtException', this.handleUncaughtException);
  }

  get currentItem() {
    let currentItem = this._tree;
    for (let i = 0; i < this._indent; i++) {
      const currentItemChildrenLastIndex =
        currentItem.children.length - INDEX_OFFSET;
      currentItem = currentItem.children[currentItemChildrenLastIndex];
    }
    return currentItem;
  }

  addItem = value => {
    this.currentItem.children.push({
      children: [],
      value,
    });
  };

  handleUncaughtException = err => {
    if (this._logged) {
      return;
    }
    this.log();
    console.log('');
    console.error(err);
    console.log('');
    console.log('Failure');
    process.exit(ERROR_CODE);
  };

  indent = () => {
    // This should throw an error if there is not a `currentItem` at this
    //   indentation level, i.e. `indent()` -> `indent()`
    this._indent++;
  };

  log = () => {
    this._logged = true;
    console.log('');
    this.logItem();
  };

  logItem = (...indices) => {
    let item = this._tree;
    let prefix = '';
    const indicesCount = indices.length;
    const lastIndicesIndex = indicesCount - INDEX_OFFSET;
    for (let i = 0; i < indicesCount; i++) {
      const index = indices[i];
      const lastIndex = item.children.length - INDEX_OFFSET;
      if (index === lastIndex) {
        if (i === lastIndicesIndex) {
          prefix += '   └─';
        } else {
          prefix += '     ';
        }
      } else {
        if (i === lastIndicesIndex) {
          prefix += '   ├─';
        } else {
          prefix += '   │ ';
        }
      }

      item = item.children[index];
    }
    console.log(`${prefix} ${item.value}`);

    const childrenCount = item.children.length;
    if (childrenCount > NONE) {
      for (let i = 0; i < childrenCount; i++) {
        this.logItem(...indices, i);
      }
    }
  };

  unindent = () => {
    this._indent--;
  };
}
