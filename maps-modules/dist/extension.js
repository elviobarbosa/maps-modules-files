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
const copy_files_1 = __webpack_require__(5);
const format_prefix_1 = __webpack_require__(4);
const check_folder_1 = __webpack_require__(7);
function activate(context) {
    console.log('Congratulations, your extension "maps-modules" is now active!');
    let disposable = vscode.commands.registerCommand('maps-modules.createMapsStructure', async () => {
        const templateFolders = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: 'Select Template Folder'
        });
        if (!templateFolders || templateFolders.length === 0) {
            return;
        }
        const templatePath = templateFolders[0].fsPath;
        const selectedFolders = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: 'Select Destination Folder'
        });
        if (!selectedFolders || selectedFolders.length === 0) {
            return;
        }
        const destinationPath = selectedFolders[0].fsPath;
        const prefix = await vscode.window.showInputBox({
            prompt: 'Qual o nome do módulo?'
        });
        (0, copy_files_1.copyFiles)(templatePath, destinationPath, (0, format_prefix_1.formatPrefix)(prefix));
        (0, check_folder_1.checkFolderNames)(destinationPath, (0, format_prefix_1.formatPrefix)(prefix));
        vscode.window.showInformationMessage('Arquivos criados e nomes de pastas verificados com sucesso :]');
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
    const camelCase = words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
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
function copyFiles(srcPath, destPath, prefix) {
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }
    const items = fs.readdirSync(srcPath);
    items.forEach(item => {
        const srcItemPath = path.join(srcPath, item);
        const destItemPath = path.join(destPath, item);
        const stats = fs.statSync(srcItemPath);
        if (stats.isDirectory()) {
            copyFiles(srcItemPath, destItemPath, prefix);
        }
        else {
            const newFileName = (item.startsWith('-') ? `${prefix.kebabCase}${item}` : `${prefix.kebabCase}.${item}`);
            const newDestItemPath = path.join(destPath, newFileName);
            const fileContent = fs.readFileSync(srcItemPath, 'utf-8');
            const modifiedContent = (0, replace_prefixes_1.replacePrefixes)(fileContent, prefix);
            fs.writeFileSync(newDestItemPath, modifiedContent);
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
function replacePrefixes(content, prefix) {
    const camelCasePrefixRegex = /\[PREFIX-CAMELCASE\]/g;
    const kebabCasePrefixRegex = /\[PREFIX-KEBABCASE\]/g;
    return content
        .replace(camelCasePrefixRegex, prefix.camelCase)
        .replace(kebabCasePrefixRegex, prefix.kebabCase);
}
exports.replacePrefixes = replacePrefixes;


/***/ }),
/* 7 */
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
exports.checkFolderNames = void 0;
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
function checkFolderNames(destPath, prefix) {
    const items = fs.readdirSync(destPath);
    items.forEach(item => {
        const itemPath = path.join(destPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
            checkFolderNames(itemPath, prefix);
        }
        if (item.startsWith('PREFIX-KEBABCASE')) {
            const newItemName = item.replace('PREFIX-KEBABCASE', prefix.kebabCase);
            const newItemPath = path.join(destPath, newItemName);
            if (!fs.existsSync(newItemPath)) {
                fs.renameSync(itemPath, newItemPath);
            }
        }
    });
}
exports.checkFolderNames = checkFolderNames;


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