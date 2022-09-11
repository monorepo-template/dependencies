import { resolve, join } from 'path';
import { writeFileSync } from 'fs';
import makeDir from 'make-dir';
import libCoverage from 'istanbul-lib-coverage';
import NYC from 'nyc';
import pMap from 'p-map';
import { cpus } from 'os';

function mapRelativePathToAbsolutePath(path) {
    return resolve(path);
}

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

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

var P_MAP_OPTIONS = {
    concurrency: cpus().length,
};

function getCoverageMap(_a) {
    var enableLogging = _a.enableLogging, paths = _a.paths, reporter = _a.reporter, workingDirectory = _a.workingDirectory;
    return __awaiter(this, void 0, void 0, function () {
        var map, nyc, _loop_1, paths_1, paths_1_1, path, e_1_1;
        var e_1, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    map = libCoverage.createCoverageMap({});
                    nyc = new NYC({
                        cwd: workingDirectory,
                        reporter: reporter,
                        skipEmpty: true,
                        skipFull: false,
                    });
                    _loop_1 = function (path) {
                        var handlePMap, files, _d, filterByShouldInstrument;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    handlePMap = function (file) { return __awaiter(_this, void 0, void 0, function () {
                                        var report;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (enableLogging) {
                                                        console.log("Merging coverage file: ".concat(join(path, file)));
                                                    }
                                                    return [4, nyc.coverageFileLoad(file, path)];
                                                case 1:
                                                    report = _a.sent();
                                                    map.merge(report);
                                                    return [2];
                                            }
                                        });
                                    }); };
                                    return [4, nyc.coverageFiles(path)];
                                case 1:
                                    files = _e.sent();
                                    return [4, pMap(files, handlePMap, P_MAP_OPTIONS)];
                                case 2:
                                    _e.sent();
                                    _d = map;
                                    return [4, nyc.sourceMaps.remapCoverage(map.data)];
                                case 3:
                                    _d.data = _e.sent();
                                    if (nyc.config.excludeAfterRemap) {
                                        filterByShouldInstrument = function (filename) {
                                            var shouldInstrument = nyc.exclude.shouldInstrument(filename);
                                            if (!shouldInstrument) {
                                                return false;
                                            }
                                            if (enableLogging) {
                                                console.log("Excluding coverage file after remap: ".concat(join(path, filename)));
                                            }
                                            return true;
                                        };
                                        map.filter(filterByShouldInstrument);
                                    }
                                    return [2];
                            }
                        });
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    paths_1 = __values(paths), paths_1_1 = paths_1.next();
                    _c.label = 2;
                case 2:
                    if (!!paths_1_1.done) return [3, 5];
                    path = paths_1_1.value;
                    return [5, _loop_1(path)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    paths_1_1 = paths_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (paths_1_1 && !paths_1_1.done && (_b = paths_1.return)) _b.call(paths_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8: return [2, map];
            }
        });
    });
}

var DEFAULT_OPTIONS = {};
var SPACES_COUNT = 2;
function mergeCoverage(paths, _a) {
    var _b = _a === void 0 ? DEFAULT_OPTIONS : _a, _c = _b.enableLogging, enableLogging = _c === void 0 ? true : _c, _d = _b.outputDirectory, outputDirectory = _d === void 0 ? '.nyc_output' : _d, _e = _b.outputFile, outputFile = _e === void 0 ? 'out.json' : _e, _f = _b.reporter, reporter = _f === void 0 ? ['clover', 'json', 'lcov', 'text'] : _f, _g = _b.workingDirectory, workingDirectory = _g === void 0 ? process.cwd() : _g;
    return __awaiter(this, void 0, void 0, function () {
        var map, OUTPUT_DIR, OUTPUT_FILE, mapStr;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4, getCoverageMap({
                        enableLogging: enableLogging,
                        paths: paths,
                        reporter: reporter,
                        workingDirectory: workingDirectory,
                    })];
                case 1:
                    map = _h.sent();
                    OUTPUT_DIR = join(workingDirectory, outputDirectory);
                    return [4, makeDir(OUTPUT_DIR)];
                case 2:
                    _h.sent();
                    OUTPUT_FILE = join(OUTPUT_DIR, outputFile);
                    if (enableLogging) {
                        console.log("Writing coverage file: ".concat(OUTPUT_FILE));
                    }
                    mapStr = JSON.stringify(map, null, SPACES_COUNT);
                    writeFileSync(OUTPUT_FILE, mapStr, 'utf8');
                    return [2];
            }
        });
    });
}

var COMMAND_PREFIX_LENGTH = 2;
var relativePaths = process.argv.slice(COMMAND_PREFIX_LENGTH);
var absolutePaths = relativePaths.map(mapRelativePathToAbsolutePath);
mergeCoverage(absolutePaths, {
    workingDirectory: process.cwd(),
}).catch(console.error);
