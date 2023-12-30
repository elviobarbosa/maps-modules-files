/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(3));
const format_prefix_1 = __webpack_require__(4);
const copy_files_1 = __webpack_require__(5);
function activate(context) {
    console.log('Congratulations, your extension "maps-modules" is now active!');
    let disposable = vscode.commands.registerCommand('maps-modules.createMapsStructure', async () => {
        const selectedFolders = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: 'Select Folder'
        });
        if (!selectedFolders || selectedFolders.length === 0) {
            return;
        }
        const workspacePath = selectedFolders[0].fsPath;
        const prefix = await vscode.window.showInputBox({
            prompt: 'Qual o nome do módulo?'
        });
        const templatePath = path.join(__dirname, 'templates');
        const destinationPath = workspacePath;
        (0, copy_files_1.copyFiles)(templatePath, destinationPath, selectedFolders.map(uri => uri.fsPath), (0, format_prefix_1.formatPrefix)(prefix));
        vscode.window.showInformationMessage('Arquivos criados com sucesso :]');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatPrefix = void 0;
function formatPrefix(input = '') {
    if (!input) {
        return { camelCase: '', kebabCase: '' };
    }
    const words = input.split(' ');
    // Formatar para Camel Case
    const camelCase = words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    // Formatar para Kebab Case
    const kebabCase = words.join('-').toLowerCase();
    return { camelCase, kebabCase };
}
exports.formatPrefix = formatPrefix;


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.copyFiles = void 0;
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
const replace_prefixes_1 = __webpack_require__(6);
function copyFiles(srcPath, destPath, selectedFolders, prefix) {
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }
    const files = fs.readdirSync(srcPath);
    files.forEach(file => {
        const srcFilePath = path.join(srcPath, file);
        const destFilePath = path.join(destPath, file);
        const stats = fs.statSync(srcFilePath);
        if (stats.isDirectory()) {
            copyFiles(srcFilePath, destFilePath, selectedFolders, prefix);
        }
        else {
            if (selectedFolders.some(folder => destFilePath.startsWith(folder))) {
                const fileExtension = path.extname(destFilePath);
                const fileNameWithoutExtension = path.basename(destFilePath, fileExtension);
                const newFileName = (fileNameWithoutExtension.startsWith('-') ? `${prefix.kebabCase}${fileNameWithoutExtension}.ts` : `${prefix.kebabCase}.${fileNameWithoutExtension}.ts`);
                const newDestFilePath = path.join(destPath, newFileName);
                const fileContent = fs.readFileSync(srcFilePath, 'utf-8');
                const modifiedContent = (0, replace_prefixes_1.replacePrefixes)(fileContent, prefix.camelCase, prefix.kebabCase);
                fs.writeFileSync(newDestFilePath, modifiedContent);
            }
        }
    });
}
exports.copyFiles = copyFiles;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replacePrefixes = void 0;
/**
 *
 * @param content conteúdo do arquivo
 * @param prefixCamelCase prefixo em Camel Case
 * @param prefixKebabCase prefixo em Kebab Case
 * @returns
 */
function replacePrefixes(content, prefixCamelCase, prefixKebabCase) {
    return content
        .replace(/\[PREFIX-CAMELCASE\]/g, prefixCamelCase)
        .replace(/\[PREFIX-KABEBCASE\]/g, prefixKebabCase);
}
exports.replacePrefixes = replacePrefixes;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map