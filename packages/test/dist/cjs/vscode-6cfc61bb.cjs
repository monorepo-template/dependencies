'use strict';

var fs = require('fs');
var path = require('path');
var jsYaml = require('js-yaml');

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

function filterByArray(value) {
    return Array.isArray(value);
}

function filterByRecord(value) {
    return typeof value === 'object' && value !== null;
}

function filterByString(value) {
    return typeof value === 'string';
}

function filterByUndefined(value) {
    return typeof value === 'undefined';
}

var VALUE_INDEX = 1;
function filterEntryByRecordValue(entry) {
    return filterByRecord(entry[VALUE_INDEX]);
}

function mapPathToPackageJson(path$1) {
    var packageFileName = path.join(path$1, 'package.json');
    var packageContents = fs.readFileSync(packageFileName, 'utf8');
    var packageJson = JSON.parse(packageContents);
    return packageJson;
}

function validateRecord(value) {
    if (!filterByRecord(value)) {
        throw new Error("Expected value to be a record, but got ".concat(typeof value, "."));
    }
    return value;
}

function mapYamlPathToJson(path) {
    var yaml = fs.readFileSync(path, 'utf8');
    var workflow = jsYaml.load(yaml);
    return validateRecord(workflow);
}

function noop() {
    return;
}

var DEPENDENCY_PROPERTIES = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
];

var EXPECTED_ON_TYPE_ERROR = new Error("Expected `on` property to be an object.");

function mapGitHubWorkflowEventNameToPathsTypeError(event) {
    return new Error("Expected `on.".concat(event, ".paths` to be an array of strings."));
}

function mapGitHubWorkflowEventNameToPathsTypeFail(event) {
    return function failGitHubWorkflowEvent() {
        this.addError(mapGitHubWorkflowEventNameToPathsTypeError(event));
    };
}

var ROOT_DIRECTORY = /^.*\/(?=.github\/workflows)/;
function mapGitHubWorkflowPathToRelative(path) {
    return path.replace(ROOT_DIRECTORY, '');
}

var GLOB_ENDING$1 = /(?:\/\*\*)?\/\*$/;
var GitHubWorkflowTest = (function () {
    function GitHubWorkflowTest(absolutePath) {
        this._relativeWorkspacePaths = [];
        this._absolutePath = absolutePath;
        this._relativePath = mapGitHubWorkflowPathToRelative(absolutePath);
    }
    Object.defineProperty(GitHubWorkflowTest.prototype, "test", {
        get: function () {
            var on = mapYamlPathToJson(this._absolutePath).on;
            if (typeof on === 'undefined') {
                return noop;
            }
            if (!filterByRecord(on)) {
                return function failGitHubWorkflow() {
                    this.addError(EXPECTED_ON_TYPE_ERROR);
                };
            }
            var eventEntries = Object.entries(on).filter(filterEntryByRecordValue);
            var mapEventEntryToTestEntry = this.mapEventEntryToTestEntry.bind(this);
            var testEntries = eventEntries.map(mapEventEntryToTestEntry);
            return function testGitHubWorkflow() {
                var e_1, _a;
                try {
                    for (var testEntries_1 = __values(testEntries), testEntries_1_1 = testEntries_1.next(); !testEntries_1_1.done; testEntries_1_1 = testEntries_1.next()) {
                        var _b = __read(testEntries_1_1.value, 2), event_1 = _b[0], test_1 = _b[1];
                        this.scope(event_1, test_1);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (testEntries_1_1 && !testEntries_1_1.done && (_a = testEntries_1.return)) _a.call(testEntries_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    GitHubWorkflowTest.prototype.setRelativeWorkspacePaths = function (paths) {
        this._relativeWorkspacePaths = paths;
        return this;
    };
    GitHubWorkflowTest.prototype.mapEventEntryToTest = function (_a) {
        var _b = __read(_a, 2), event = _b[0], sources = _b[1];
        var paths = sources.paths;
        if (!filterByArray(paths) || !paths.every(filterByString)) {
            return mapGitHubWorkflowEventNameToPathsTypeFail(event);
        }
        var relativePath = this._relativePath;
        if (!paths.includes(relativePath)) {
            return function failGitHubWorkflowEvent() {
                this.addError(new Error("Expected `on.".concat(event, ".paths` to include itself ('").concat(relativePath, "').")));
            };
        }
        var mapPathToWorkspace = this.mapPathToWorkspace.bind(this);
        return function testGitHubWorkflowEvent() {
            var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
            var workspacePackageJsons = new Map();
            try {
                for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                    var path = paths_1_1.value;
                    var workspacePath = mapPathToWorkspace(path);
                    if (filterByUndefined(workspacePath)) {
                        continue;
                    }
                    if (workspacePackageJsons.has(workspacePath)) {
                        continue;
                    }
                    this.addItem(path.replace(GLOB_ENDING$1, ''));
                    var packageJson = mapPathToPackageJson(workspacePath);
                    workspacePackageJsons.set(workspacePath, packageJson);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var filterWorkspacePackageJsonsByPackageName = function (packageName) {
                var e_6, _a;
                try {
                    for (var _b = __values(workspacePackageJsons.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var name_1 = _c.value.name;
                        if (name_1 === packageName) {
                            return true;
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                return false;
            };
            try {
                for (var _e = __values(workspacePackageJsons.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var _g = __read(_f.value, 2), workspacePath = _g[0], packageJson = _g[1];
                    try {
                        for (var DEPENDENCY_PROPERTIES_1 = (e_4 = void 0, __values(DEPENDENCY_PROPERTIES)), DEPENDENCY_PROPERTIES_1_1 = DEPENDENCY_PROPERTIES_1.next(); !DEPENDENCY_PROPERTIES_1_1.done; DEPENDENCY_PROPERTIES_1_1 = DEPENDENCY_PROPERTIES_1.next()) {
                            var property = DEPENDENCY_PROPERTIES_1_1.value;
                            var dependenciesRecord = packageJson[property];
                            if (typeof dependenciesRecord === 'undefined') {
                                continue;
                            }
                            try {
                                for (var _h = (e_5 = void 0, __values(Object.entries(dependenciesRecord))), _j = _h.next(); !_j.done; _j = _h.next()) {
                                    var _k = __read(_j.value, 2), packageName = _k[0], packageVersion = _k[1];
                                    if (!packageVersion.startsWith('workspace:')) {
                                        continue;
                                    }
                                    if (filterWorkspacePackageJsonsByPackageName(packageName)) {
                                        continue;
                                    }
                                    this.addError(new Error("Expected `on.".concat(event, ".paths` to include `").concat(packageName, "`'s workspace path, because it is a dependency of `").concat(workspacePath, "`.")));
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_j && !_j.done && (_d = _h.return)) _d.call(_h);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (DEPENDENCY_PROPERTIES_1_1 && !DEPENDENCY_PROPERTIES_1_1.done && (_c = DEPENDENCY_PROPERTIES_1.return)) _c.call(DEPENDENCY_PROPERTIES_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
    };
    GitHubWorkflowTest.prototype.mapEventEntryToTestEntry = function (_a) {
        var _b = __read(_a, 2), event = _b[0], sources = _b[1];
        return [event, this.mapEventEntryToTest([event, sources])];
    };
    GitHubWorkflowTest.prototype.mapPathToWorkspace = function (path) {
        var e_7, _a;
        try {
            for (var _b = __values(this._relativeWorkspacePaths), _c = _b.next(); !_c.done; _c = _b.next()) {
                var relativeWorkspacePath = _c.value;
                if (path === relativeWorkspacePath ||
                    path.startsWith("".concat(relativeWorkspacePath, "/"))) {
                    return relativeWorkspacePath;
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return;
    };
    return GitHubWorkflowTest;
}());

var DIRECTORY = /^.*\//;
var YAML_FILE_EXTENSION = /\.yml$/;
function mapYamlFilePathToName(path) {
    return path.replace(DIRECTORY, '').replace(YAML_FILE_EXTENSION, '');
}

var MISSING_PACKAGE_WORKSPACES_PROPERTY_ERROR = new Error('Expected `package.json` to have a `workspaces` property.');

var PACKAGE_WORKSPACES_TYPE_ERROR = new Error('Expected `package.json`’s `workspaces` property to be an array of strings.');

var YAML_FILENAME = /\.ya?ml$/;

function filterFileNameByYaml(fileName) {
    return YAML_FILENAME.test(fileName);
}

var MISSING_GITHUB_DIRECTORY_ERROR = new Error('Expected to find a `.github` directory.');

var MISSING_GITHUB_WORKFLOWS_DIRECTORY_ERROR = new Error('Expected to find a `.github/workflows` directory.');

function mapRootToGitHubWorkflowFileNames(root) {
    if (!fs.readdirSync(root).includes('.github')) {
        throw MISSING_GITHUB_DIRECTORY_ERROR;
    }
    var gitHubPath = path.join(root, '.github');
    var gitHubFileNames = fs.readdirSync(gitHubPath);
    if (!gitHubFileNames.includes('workflows')) {
        throw MISSING_GITHUB_WORKFLOWS_DIRECTORY_ERROR;
    }
    var gitHubWorkflowsPath = path.join(gitHubPath, 'workflows');
    return fs.readdirSync(gitHubWorkflowsPath).filter(filterFileNameByYaml);
}

function mapRootToGitHubWorkflowPaths(root) {
    var fileNames = mapRootToGitHubWorkflowFileNames(root);
    var mapFileNameToPath = function (fileName) {
        return path.resolve(root, '.github', 'workflows', fileName);
    };
    return fileNames.map(mapFileNameToPath);
}

function mapWorkspaceGlobToEndsWithError(glob) {
    return new Error("Expected workspace glob `".concat(glob, "` to end with `/*`"));
}

var GLOB_ENDING = /\/\*$/;
var GitHubWorkflowsTest = (function () {
    function GitHubWorkflowsTest(root) {
        if (root === void 0) { root = process.cwd(); }
        var packageJson = mapPathToPackageJson(root);
        this._root = root;
        this._workflowPaths = mapRootToGitHubWorkflowPaths(root);
        this._workspacePaths =
            this.mapPackageJsonToRelativeWorkspacePaths(packageJson);
    }
    Object.defineProperty(GitHubWorkflowsTest.prototype, "test", {
        get: function () {
            var getTestEntries = this.getTestEntries.bind(this);
            return function testGitHubWorkflows() {
                var e_1, _a;
                try {
                    for (var _b = __values(getTestEntries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), name_1 = _d[0], test_1 = _d[1];
                        this.scope(name_1, test_1);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitHubWorkflowsTest.prototype, "testEntries", {
        get: function () {
            var mapPathToTestEntry = this.mapPathToTestEntry.bind(this);
            return this._workflowPaths.map(mapPathToTestEntry);
        },
        enumerable: false,
        configurable: true
    });
    GitHubWorkflowsTest.prototype.getTestEntries = function () {
        return this.testEntries;
    };
    GitHubWorkflowsTest.prototype.mapWorkspaceGlobToPaths = function (glob) {
        if (!glob.endsWith('/*')) {
            throw mapWorkspaceGlobToEndsWithError(glob);
        }
        var newPath = path.join(this._root, glob.replace(GLOB_ENDING, ''));
        var mapFileNameToPath = function (fileName) {
            return "".concat(newPath, "/").concat(fileName);
        };
        var newFileNames = fs.readdirSync(newPath);
        return newFileNames.map(mapFileNameToPath);
    };
    GitHubWorkflowsTest.prototype.mapPackageJsonToRelativeWorkspacePaths = function (_a) {
        var workspaces = _a.workspaces;
        if (typeof workspaces === 'undefined') {
            throw MISSING_PACKAGE_WORKSPACES_PROPERTY_ERROR;
        }
        if (!filterByArray(workspaces) || !workspaces.every(filterByString)) {
            throw PACKAGE_WORKSPACES_TYPE_ERROR;
        }
        var reduceWorkspaceGlobsToPaths = this.reduceWorkspaceGlobsToPaths.bind(this);
        return workspaces.reduce(reduceWorkspaceGlobsToPaths, []);
    };
    GitHubWorkflowsTest.prototype.mapPathToTestEntry = function (path) {
        var gitHubWorkflow = new GitHubWorkflowTest(path);
        gitHubWorkflow.setRelativeWorkspacePaths(this._workspacePaths);
        return [mapYamlFilePathToName(path), gitHubWorkflow.test];
    };
    GitHubWorkflowsTest.prototype.reduceWorkspaceGlobsToPaths = function (paths, glob) {
        var newPaths = this.mapWorkspaceGlobToPaths(glob);
        return __spreadArray(__spreadArray([], __read(paths), false), __read(newPaths), false);
    };
    return GitHubWorkflowsTest;
}());

function filterByDefined(value) {
    return typeof value !== 'undefined';
}

var MISSING_PACKAGES_DIRECTORY_ERROR = new Error('Expected to find a `packages` directory.');

function mapPackageJsonToDependenciesSet(packageJson) {
    var record = __assign(__assign(__assign({}, packageJson.dependencies), packageJson.devDependencies), packageJson.peerDependencies);
    var arr = Object.keys(record);
    return new Set(arr);
}

var DEFAULT_PEER_DEPENDENCIES = Object.freeze({});
function mapPackageJsonToPeerDependenciesList(packageJson) {
    var _a = packageJson.peerDependencies, peerDependencies = _a === void 0 ? DEFAULT_PEER_DEPENDENCIES : _a;
    return Object.keys(peerDependencies);
}

var WORKSPACE_VERSION = /^workspace:.*$/;
function createDependenciesTest(_a) {
    var dependencyKey = _a.dependencyKey, packageJson = _a.packageJson, packageNameToJsonMap = _a.packageNameToJsonMap;
    var record = packageJson[dependencyKey];
    if (typeof record === 'undefined') {
        return noop;
    }
    return function testDependencies() {
        var e_1, _a;
        var _loop_1 = function (name_1, version) {
            var e_2, _e;
            if (!WORKSPACE_VERSION.test(version)) {
                return "continue";
            }
            var dependencyPackageJson = packageNameToJsonMap.get(name_1);
            if (typeof dependencyPackageJson === 'undefined') {
                this_1.addError(new Error("Expected to find `".concat(name_1, "` in the `packages` directory.")));
                return "continue";
            }
            var packageDependenciesSet = mapPackageJsonToDependenciesSet(packageJson);
            var filterByMissingDependency = function (dependency) {
                return !packageDependenciesSet.has(dependency);
            };
            var dependencyPeerDependenciesList = mapPackageJsonToPeerDependenciesList(dependencyPackageJson);
            var missingDependencies = dependencyPeerDependenciesList.filter(filterByMissingDependency);
            try {
                for (var missingDependencies_1 = (e_2 = void 0, __values(missingDependencies)), missingDependencies_1_1 = missingDependencies_1.next(); !missingDependencies_1_1.done; missingDependencies_1_1 = missingDependencies_1.next()) {
                    var missingDependency = missingDependencies_1_1.value;
                    this_1.addError(new Error("Expected dependency `".concat(missingDependency, "` as required by `").concat(name_1, "`.")));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (missingDependencies_1_1 && !missingDependencies_1_1.done && (_e = missingDependencies_1.return)) _e.call(missingDependencies_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(Object.entries(record)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_1 = _d[0], version = _d[1];
                _loop_1(name_1, version);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
}

var FILES_PROPERTY_ERROR = new Error('Replace the `files` property with a `.npmignore` file.');

function failPackageJsonFiles() {
    this.addError(FILES_PROPERTY_ERROR);
}

function mapPackageDirectoryToMissingPackageJsonError(dir) {
    return new Error("Missing `package.json` for package directory `".concat(dir, "`"));
}

var DEFAULT_EXPORT_CONDITION_INDEX_ERROR = new Error('The default condition must be the last one.');

function findDefaultString(value) {
    return value === 'default';
}

var ARRAY_INDEX_OFFSET = 1;
var NOT_FOUND = -1;
function mapPackageJsonExportsToTest(exports) {
    return function testPackageJsonExports() {
        var e_1, _a;
        var _this = this;
        var _loop_1 = function (path, record) {
            if (!filterByRecord(record)) {
                return "continue";
            }
            this_1.scope(path, function () {
                var keys = Object.keys(record);
                var defaultExportIndex = keys.findIndex(findDefaultString);
                if (defaultExportIndex === NOT_FOUND) {
                    return;
                }
                var lastExportIndex = keys.length - ARRAY_INDEX_OFFSET;
                if (defaultExportIndex !== lastExportIndex) {
                    _this.addError(DEFAULT_EXPORT_CONDITION_INDEX_ERROR);
                }
            });
        };
        var this_1 = this;
        try {
            for (var _b = __values(Object.entries(exports)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), path = _d[0], record = _d[1];
                _loop_1(path, record);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
}

var DEPENDENCY_KEYS = ['dependencies', 'devDependencies'];
var PackagesTest = (function () {
    function PackagesTest(root) {
        if (root === void 0) { root = process.cwd(); }
        this._packagesDirectory = 'packages';
        this._root = root;
    }
    Object.defineProperty(PackagesTest.prototype, "test", {
        get: function () {
            var getPackageDirectories = this.getPackageDirectories.bind(this);
            var mapPackageDirectoryToPackageJson = this.mapPackageDirectoryToPackageJson.bind(this);
            return function testPackages() {
                var e_1, _a, e_2, _b;
                var packageDirectories = getPackageDirectories();
                var packageDirectoryToJsonMap = new Map();
                var packageNameToJsonMap = new Map();
                try {
                    for (var packageDirectories_1 = __values(packageDirectories), packageDirectories_1_1 = packageDirectories_1.next(); !packageDirectories_1_1.done; packageDirectories_1_1 = packageDirectories_1.next()) {
                        var packageDirectory = packageDirectories_1_1.value;
                        var packageJson = mapPackageDirectoryToPackageJson(packageDirectory);
                        packageDirectoryToJsonMap.set(packageDirectory, packageJson);
                        packageNameToJsonMap.set(packageJson.name, packageJson);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (packageDirectories_1_1 && !packageDirectories_1_1.done && (_a = packageDirectories_1.return)) _a.call(packageDirectories_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var mapPackageDirectoryToTest = function (packageDirectory) {
                    return function testPackage() {
                        var e_3, _a;
                        var packageJson = packageDirectoryToJsonMap.get(packageDirectory);
                        if (filterByUndefined(packageJson)) {
                            this.addError(mapPackageDirectoryToMissingPackageJsonError(packageDirectory));
                            return;
                        }
                        var exports = packageJson.exports, files = packageJson.files;
                        if (filterByRecord(exports)) {
                            this.scope('exports', mapPackageJsonExportsToTest(exports));
                        }
                        if (filterByDefined(files)) {
                            this.scope('files', failPackageJsonFiles);
                        }
                        try {
                            for (var DEPENDENCY_KEYS_1 = __values(DEPENDENCY_KEYS), DEPENDENCY_KEYS_1_1 = DEPENDENCY_KEYS_1.next(); !DEPENDENCY_KEYS_1_1.done; DEPENDENCY_KEYS_1_1 = DEPENDENCY_KEYS_1.next()) {
                                var dependencyKey = DEPENDENCY_KEYS_1_1.value;
                                if (!Object.prototype.hasOwnProperty.call(packageJson, dependencyKey)) {
                                    continue;
                                }
                                this.scope(dependencyKey, createDependenciesTest({
                                    dependencyKey: dependencyKey,
                                    packageJson: packageJson,
                                    packageNameToJsonMap: packageNameToJsonMap,
                                }));
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (DEPENDENCY_KEYS_1_1 && !DEPENDENCY_KEYS_1_1.done && (_a = DEPENDENCY_KEYS_1.return)) _a.call(DEPENDENCY_KEYS_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    };
                };
                try {
                    for (var packageDirectories_2 = __values(packageDirectories), packageDirectories_2_1 = packageDirectories_2.next(); !packageDirectories_2_1.done; packageDirectories_2_1 = packageDirectories_2.next()) {
                        var packageDirectory = packageDirectories_2_1.value;
                        this.scope(packageDirectory, mapPackageDirectoryToTest(packageDirectory));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (packageDirectories_2_1 && !packageDirectories_2_1.done && (_b = packageDirectories_2.return)) _b.call(packageDirectories_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PackagesTest.prototype, "packageDirectories", {
        get: function () {
            if (!fs.readdirSync(this._root).includes(this._packagesDirectory)) {
                throw MISSING_PACKAGES_DIRECTORY_ERROR;
            }
            var packagesPath = path.join(this._root, this._packagesDirectory);
            return fs.readdirSync(packagesPath);
        },
        enumerable: false,
        configurable: true
    });
    PackagesTest.prototype.setPackagesDirectory = function (dir) {
        this._packagesDirectory = dir;
        return this;
    };
    PackagesTest.prototype.getPackageDirectories = function () {
        return this.packageDirectories;
    };
    PackagesTest.prototype.mapPackageDirectoryToPackageJson = function (packageDir) {
        var path$1 = path.join(this._root, this._packagesDirectory, packageDir);
        return mapPathToPackageJson(path$1);
    };
    return PackagesTest;
}());

function mapUnknownToError(value) {
    if (value instanceof Error) {
        return value;
    }
    if (typeof value === 'string') {
        return new Error(value);
    }
    return new Error(JSON.stringify(value));
}

var DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS = [
    '.git',
    'packages/*/.nyc_output',
    'packages/*/build',
    'packages/*/coverage',
    'packages/*/cypress/coverage',
    'packages/*/cypress/screenshots',
    'packages/*/cypress/videos',
    'packages/*/dist',
    'packages/*/jest',
    'packages/*/node_modules',
    '**/.yarn',
    '**/.pnp.*',
];

var MISSING_SETTINGS_JSON_FILE = new Error('`.vscode/settings.json` does not exist.');

var VSCodeTest = (function () {
    function VSCodeTest(root) {
        if (root === void 0) { root = process.cwd(); }
        this._bannedSearchExcludeKeys = new Set();
        this._requiredSearchExcludeKeys = new Set(DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS);
        this._root = root;
    }
    Object.defineProperty(VSCodeTest.prototype, "bannedSearchExcludeKeys", {
        get: function () {
            return this._bannedSearchExcludeKeys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSCodeTest.prototype, "requiredSearchExcludeKeys", {
        get: function () {
            return this._requiredSearchExcludeKeys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSCodeTest.prototype, "test", {
        get: function () {
            var testSettingsJson = this.testSettingsJson;
            return function testVSCode() {
                this.scope('settings.json', testSettingsJson);
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSCodeTest.prototype, "settingsJsonPath", {
        get: function () {
            return path.join(this._root, '.vscode', 'settings.json');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSCodeTest.prototype, "testSettingsJson", {
        get: function () {
            var getSearchExcludeTest = this.getSettingsJsonSearchExcludeTest.bind(this);
            return function testSettingsJson() {
                try {
                    this.scope('search.exclude', getSearchExcludeTest());
                }
                catch (err) {
                    this.addError(mapUnknownToError(err));
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    VSCodeTest.prototype.banSearchExcludeKey = function (key) {
        this._bannedSearchExcludeKeys.add(key);
        return this;
    };
    VSCodeTest.prototype.requireSearchExcludeKey = function (key) {
        this._requiredSearchExcludeKeys.add(key);
        return this;
    };
    VSCodeTest.prototype.unbanSearchExcludeKey = function (key) {
        this._bannedSearchExcludeKeys.delete(key);
        return this;
    };
    VSCodeTest.prototype.unrequireSearchExcludeKey = function (key) {
        this._requiredSearchExcludeKeys.delete(key);
        return this;
    };
    VSCodeTest.prototype.getBannedSearchExcludeKeys = function () {
        return this._bannedSearchExcludeKeys;
    };
    VSCodeTest.prototype.getRequiredSearchExcludeKeys = function () {
        return this._requiredSearchExcludeKeys;
    };
    VSCodeTest.prototype.getSettingsJson = function () {
        var path = this.settingsJsonPath;
        if (!fs.existsSync(path)) {
            throw MISSING_SETTINGS_JSON_FILE;
        }
        var contents = fs.readFileSync(path, 'utf8');
        return JSON.parse(contents);
    };
    VSCodeTest.prototype.getSettingsJsonSearchExcludeTest = function () {
        var settingsJson = this.getSettingsJson();
        var searchExclude = settingsJson['search.exclude'];
        if (typeof searchExclude === 'undefined') {
            return noop;
        }
        var getBannedKeys = this.getBannedSearchExcludeKeys.bind(this);
        var getRequiredKeys = this.getRequiredSearchExcludeKeys.bind(this);
        return function testSettingsJsonSearchExclude() {
            var e_1, _a, e_2, _b;
            try {
                for (var _c = __values(getBannedKeys()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var bannedKey = _d.value;
                    if (Object.prototype.hasOwnProperty.call(searchExclude, bannedKey)) {
                        this.addError(new Error("Remove `".concat(bannedKey, "`.")));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = __values(getRequiredKeys()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var requiredKey = _f.value;
                    if (!Object.prototype.hasOwnProperty.call(searchExclude, requiredKey)) {
                        this.addError(new Error("Add `".concat(requiredKey, "`.")));
                        continue;
                    }
                    if (!searchExclude[requiredKey]) {
                        this.addError(new Error("Enable `".concat(requiredKey, "`.")));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
    };
    return VSCodeTest;
}());

exports.GitHubWorkflowsTest = GitHubWorkflowsTest;
exports.PackagesTest = PackagesTest;
exports.VSCodeTest = VSCodeTest;
