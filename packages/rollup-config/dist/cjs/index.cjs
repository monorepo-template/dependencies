'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript2 = require('rollup-plugin-typescript2');
var commonjs = require('@rollup/plugin-commonjs');
var fs = require('fs');
var path = require('path');
var json = require('@rollup/plugin-json');
var rollupPluginInsert = require('rollup-plugin-insert');
var nodeResolve = require('@rollup/plugin-node-resolve');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var typescript2__default = /*#__PURE__*/_interopDefaultLegacy(typescript2);
var commonjs__default = /*#__PURE__*/_interopDefaultLegacy(commonjs);
var json__default = /*#__PURE__*/_interopDefaultLegacy(json);
var nodeResolve__default = /*#__PURE__*/_interopDefaultLegacy(nodeResolve);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var COMMONJS_PLUGIN = commonjs__default["default"]({
    extensions: ['.js', '.jsx'],
});

function mapRecordToKeysSet(record) {
    return new Set(Object.keys(record));
}

var DEFAULT_DEPENDENCIES_RECORD = Object.freeze({});
function mapPackageJsonToDependenciesRecord(packageJson) {
    if (typeof packageJson.dependencies !== 'undefined') {
        return packageJson.dependencies;
    }
    return DEFAULT_DEPENDENCIES_RECORD;
}

var CWD = process.cwd();

function filterByArray(value) {
    return Array.isArray(value);
}

function filterByRecord(value) {
    return typeof value === 'object' && value !== null;
}

function filterByString(value) {
    return typeof value === 'string';
}

var filterByStringTuple = function (value) {
    return filterByArray(value) && value.every(filterByString);
};
var filterByStringRecord = function (value) {
    return (filterByRecord(value) && Object.entries(value).every(filterByStringTuple));
};
function validatePackageJson(value) {
    if (!filterByRecord(value)) {
        throw new Error('Expected `package.json` to be a record.');
    }
    var dependencies = value.dependencies, peerDependencies = value.peerDependencies;
    if (typeof dependencies !== 'undefined' &&
        !filterByStringRecord(dependencies)) {
        throw new Error("Expected `package.json`'s `dependencies` to be a record of strings.");
    }
    if (typeof peerDependencies !== 'undefined' &&
        !filterByStringRecord(peerDependencies)) {
        throw new Error("Expected `package.json`'s `peerDependencies` to be a record of strings.");
    }
    return {
        dependencies: dependencies,
        peerDependencies: peerDependencies,
    };
}

function getPackageJson() {
    var path$1 = path.join(CWD, 'package.json');
    var contents = fs.readFileSync(path$1, 'utf8');
    var value = JSON.parse(contents);
    return validatePackageJson(value);
}

var PACKAGE_JSON = getPackageJson();

var DEPENDENCIES_RECORD = mapPackageJsonToDependenciesRecord(PACKAGE_JSON);

var DEFAULT_PEER_DEPENDENCIES_RECORD = Object.freeze({});
function mapPackageJsonToPeerDependenciesRecord(packageJson) {
    if (typeof packageJson.peerDependencies !== 'undefined') {
        return packageJson.peerDependencies;
    }
    return DEFAULT_PEER_DEPENDENCIES_RECORD;
}

var PEER_DEPENDENCIES_RECORD = mapPackageJsonToPeerDependenciesRecord(PACKAGE_JSON);

var EXTERNAL_DEPENDENCIES_SET = new Set(__spreadArray(__spreadArray([], __read(mapRecordToKeysSet(DEPENDENCIES_RECORD)), false), __read(mapRecordToKeysSet(PEER_DEPENDENCIES_RECORD)), false));

var IS_DEV = process.env.NODE_ENV === 'development';

var JSON_PLUGIN = json__default["default"]();

var NO_JSX_RUNTIME_PLUGIN = rollupPluginInsert.prepend("import React from 'react';\n", {
    include: '**/*.tsx',
});

var NODE_RESOLVE_PLUGIN = nodeResolve__default["default"]({
    extensions: ['.cjs', '.js', '.json', '.jsx', '.mjs', '.ts', '.tsx'],
    preferBuiltins: true,
});

var WATCH = {
    exclude: 'node_modules/**',
};

function filterByNonNull(value) {
    return value !== null;
}

function reduceEntriesToRecord(record, _a) {
    var _b;
    var _c = __read(_a, 2), key = _c[0], value = _c[1];
    return __assign(__assign({}, record), (_b = {}, _b[key] = value, _b));
}

var INITIAL_RECORD = Object.freeze({});
function mapMapToRecord(map) {
    var entries = __spreadArray([], __read(map.entries()), false);
    var initialRecord = INITIAL_RECORD;
    return entries.reduce(reduceEntriesToRecord, initialRecord);
}

function reducePluginsFunctionsToPlugins(plugins, pluginsFunction) {
    return pluginsFunction(plugins);
}

var EMPTY = 0;
var RollupConfig = (function () {
    function RollupConfig() {
        var _this = this;
        this._cjsDirectory = './dist/cjs';
        this._cjsExtension = 'cjs';
        this._developmentMode = IS_DEV;
        this._developmentTSConfigPath = './tsconfig.development.json';
        this._esmDirectory = './dist/esm';
        this._esmExtension = 'js';
        this._externalDependencies = EXTERNAL_DEPENDENCIES_SET;
        this._fileName = '[name]';
        this._input = new Map();
        this._jsxRuntime = true;
        this._pluginsFunctions = [];
        this._tsconfigPath = './tsconfig.json';
        this.addExternalDependency = function (dependency) {
            _this.externalDependencies.add(dependency);
            return _this;
        };
        this.addInput = function (name, path) {
            _this._input.set(name, path);
            return _this;
        };
        this.disableDevelopmentMode = function () {
            _this._developmentMode = false;
            return _this;
        };
        this.disableJsxRuntime = function () {
            _this._jsxRuntime = false;
            return _this;
        };
        this.enableDevelopmentMode = function () {
            _this._developmentMode = true;
            return _this;
        };
        this.enableJsxRuntime = function () {
            _this._jsxRuntime = true;
            return _this;
        };
        this.removeExternalDependency = function (dependency) {
            _this.externalDependencies.delete(dependency);
            return _this;
        };
        this.removeInput = function (name) {
            _this._input.delete(name);
            return _this;
        };
        this.setCjsDirectory = function (cjsDirectory) {
            _this._cjsDirectory = cjsDirectory;
            return _this;
        };
        this.setCjsExtension = function (cjsExtension) {
            _this._cjsExtension = cjsExtension;
            return _this;
        };
        this.setDevelopmentTSConfigPath = function (developmentTSConfigPath) {
            _this._developmentTSConfigPath = developmentTSConfigPath;
            return _this;
        };
        this.setEsmDirectory = function (esmDirectory) {
            _this._esmDirectory = esmDirectory;
            return _this;
        };
        this.setEsmExtension = function (esmExtension) {
            _this._esmExtension = esmExtension;
            return _this;
        };
        this.setFileName = function (fileName) {
            _this._fileName = fileName;
            return _this;
        };
        this.setPlugins = function (f) {
            _this._pluginsFunctions.push(f);
            return _this;
        };
        this.setTSConfigPath = function (tsconfigPath) {
            _this._tsconfigPath = tsconfigPath;
            return _this;
        };
        this.toJSON = function () { return ({
            external: _this.external,
            input: _this.input,
            output: _this.output,
            plugins: _this.plugins,
            treeshake: !_this.developmentMode,
            watch: WATCH,
        }); };
        this.external = function (id) {
            var e_1, _a;
            if (_this.externalDependencies.has(id)) {
                return true;
            }
            try {
                for (var _b = __values(_this.externalDependencies), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var pkg = _c.value;
                    if (id.startsWith("".concat(pkg, "/"))) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
    }
    Object.defineProperty(RollupConfig.prototype, "developmentTSConfigPath", {
        get: function () {
            return this._developmentTSConfigPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "tsconfig", {
        get: function () {
            if (this.developmentMode) {
                return this.developmentTSConfigPath;
            }
            return this.tsconfigPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "tsconfigPath", {
        get: function () {
            return this._tsconfigPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "cjsDirectory", {
        get: function () {
            return this._cjsDirectory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "cjsExtension", {
        get: function () {
            return this._cjsExtension;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "developmentMode", {
        get: function () {
            return this._developmentMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "esmDirectory", {
        get: function () {
            return this._esmDirectory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "esmExtension", {
        get: function () {
            return this._esmExtension;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "externalDependencies", {
        get: function () {
            return this._externalDependencies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "fileName", {
        get: function () {
            return this._fileName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "hasInput", {
        get: function () {
            return this._input.size > EMPTY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "input", {
        get: function () {
            if (this.hasInput) {
                return mapMapToRecord(this._input);
            }
            return 'src/index.ts';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "jsxRuntime", {
        get: function () {
            return this._jsxRuntime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "output", {
        get: function () {
            return [this.outputCjs, this.outputEsm].filter(filterByNonNull);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "outputCjs", {
        get: function () {
            if (this.cjsDirectory === null) {
                return null;
            }
            return {
                chunkFileNames: "".concat(this.fileName, "-[hash].").concat(this.cjsExtension),
                dir: this.cjsDirectory,
                entryFileNames: "".concat(this.fileName, ".").concat(this.cjsExtension),
                exports: 'named',
                format: 'cjs',
                sourcemap: this.developmentMode,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "outputEsm", {
        get: function () {
            if (this.esmDirectory === null) {
                return null;
            }
            return {
                chunkFileNames: "".concat(this.fileName, "-[hash].").concat(this.esmExtension),
                dir: this.esmDirectory,
                entryFileNames: "".concat(this.fileName, ".").concat(this.esmExtension),
                format: 'es',
                sourcemap: this.developmentMode,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "plugins", {
        get: function () {
            var plugins = [
                COMMONJS_PLUGIN,
                NODE_RESOLVE_PLUGIN,
                JSON_PLUGIN,
            ];
            if (!this.jsxRuntime) {
                plugins.push(NO_JSX_RUNTIME_PLUGIN);
            }
            plugins.push(this.typeScriptPlugin);
            return this._pluginsFunctions.reduce(reducePluginsFunctionsToPlugins, plugins);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "tsconfigOverride", {
        get: function () {
            if (this.jsxRuntime) {
                return;
            }
            return {
                compilerOptions: {
                    jsx: 'react',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollupConfig.prototype, "typeScriptPlugin", {
        get: function () {
            return typescript2__default["default"]({
                check: !this.developmentMode,
                clean: true,
                tsconfig: this.tsconfig,
                tsconfigOverride: this.tsconfigOverride,
                useTsconfigDeclarationDir: true,
            });
        },
        enumerable: false,
        configurable: true
    });
    return RollupConfig;
}());

var rollupConfig = new RollupConfig().toJSON();

exports["default"] = rollupConfig;
