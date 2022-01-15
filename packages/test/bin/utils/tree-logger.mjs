// This should either be a third-party module from NPM that does this better, or
//   it should be moved to a separate package in this monorepo.

const ERROR_CODE = 1;
const INDEX_OFFSET = 1;
const NONE = 0;
const SPACING = '   ';

export default class TreeLogger {
  _indent = NONE;

  _logged = false;

  constructor(value) {
    this._tree = {
      children: [],
      errors: [],
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

  addError = err => {
    this.currentItem.errors.push(err);
  };

  addItem = value => {
    this.currentItem.children.push({
      children: [],
      errors: [],
      value,
    });
  };

  handleUncaughtException = err => {
    this.addError(err);
  };

  indent = () => {
    // This should throw an error if there is not a `currentItem` at this
    //   indentation level, i.e. `indent()` -> `indent()`
    this._indent++;
  };

  log = () => {
    this._logged = true;
    console.log('');
    const errorsCount = this.logItem();
    console.log('');
    if (errorsCount > NONE) {
      console.log(`Failed with ${errorsCount} errors`);
      process.exit(ERROR_CODE);
    } else {
      console.log('Success');
    }
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
          prefix += `${SPACING}└─`;
        } else {
          prefix += `${SPACING}  `;
        }
      } else {
        if (i === lastIndicesIndex) {
          prefix += `${SPACING}├─`;
        } else {
          prefix += `${SPACING}│ `;
        }
      }

      item = item.children[index];
    }

    console.log(`${prefix} ${item.value}`);

    const errorsCount = item.errors.length;
    if (errorsCount > NONE) {
      const lastErrorIndex = errorsCount - INDEX_OFFSET;
      const mapErrorIndexToPip = errorIndex => {
        if (errorIndex === lastErrorIndex) {
          return '└─';
        }
        return '├─';
      };

      for (let i = 0; i < errorsCount; i++) {
        const error = item.errors[i];
        const pip = mapErrorIndexToPip(i);
        console.error(`${prefix}${SPACING}${pip} ${error.message}`);
      }
    }

    const childrenCount = item.children.length;
    let childrenErrorsCount = 0;
    if (childrenCount > NONE) {
      for (let i = 0; i < childrenCount; i++) {
        childrenErrorsCount += this.logItem(...indices, i);
      }
    }

    return errorsCount + childrenErrorsCount;
  };

  unindent = () => {
    this._indent--;
  };
}
