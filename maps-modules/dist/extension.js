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
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
const utils_1 = __webpack_require__(4);
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
        const folderStructure = [
            '/',
            'components',
            'containers',
            'services',
            'services/entities',
            'services/repository',
            'services/usecases',
            'services/mapper'
        ];
        folderStructure.forEach(folder => {
            const folderPathToCreate = path.join(workspacePath || '', folder);
            if (!fs.existsSync(folderPathToCreate)) {
                //if (folder !== '/') {
                fs.mkdirSync(folderPathToCreate, { recursive: true });
                //}
                if (folder === '/') {
                    (0, utils_1.createFiles)(folderPathToCreate, workspacePath || '', [
                        {
                            fileName: 'module.ts',
                            content: 'module.txt'
                        },
                        {
                            fileName: 'routing.module.ts',
                            content: 'routing.module.txt'
                        },
                    ], (0, utils_1.formatPrefix)(prefix));
                }
                if (folder === 'services/entities') {
                    (0, utils_1.createFiles)(folderPathToCreate, workspacePath || '', [
                        {
                            fileName: 'request-response.entity.ts',
                            content: 'entities/request-response.txt'
                        },
                    ], (0, utils_1.formatPrefix)(prefix));
                }
                if (folder === 'services/repository') {
                    (0, utils_1.createFiles)(folderPathToCreate, workspacePath || '', [
                        {
                            fileName: 'repository.ts',
                            content: 'repository/repository.txt'
                        },
                    ], (0, utils_1.formatPrefix)(prefix));
                }
                if (folder === 'services/usecases') {
                    (0, utils_1.createFiles)(folderPathToCreate, workspacePath || '', [
                        {
                            fileName: 'active.usecase.ts',
                            content: 'usecases/active.txt'
                        },
                        {
                            fileName: 'byid.usecase.ts',
                            content: 'usecases/byid.txt'
                        },
                        {
                            fileName: 'create.usecase.ts',
                            content: 'usecases/create.txt'
                        },
                        {
                            fileName: 'delete.usecase.ts',
                            content: 'usecases/delete.txt'
                        },
                        {
                            fileName: 'list.usecase.ts',
                            content: 'usecases/list.txt'
                        },
                        {
                            fileName: 'update.usecase.ts',
                            content: 'usecases/update.txt'
                        }
                    ], (0, utils_1.formatPrefix)(prefix));
                }
            }
        });
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
exports.createFiles = exports.replacePrefixes = exports.formatPrefix = void 0;
const path = __importStar(__webpack_require__(3));
const fs = __importStar(__webpack_require__(2));
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
function replacePrefixes(content, prefixCamelCase, prefixKebabCase) {
    return content
        .replace(/\[PREFIX-CAMELCASE\]/g, prefixCamelCase)
        .replace(/\[PREFIX-KABEBCASE\]/g, prefixKebabCase);
}
exports.replacePrefixes = replacePrefixes;
function createFiles(folderPath, workspacePath, fileName, prefix) {
    fileName.forEach(file => {
        const filePath = path.join(folderPath, `${prefix.kebabCase}-${file.fileName}`);
        const templateFilePath = path.join(__dirname, 'templates', file.content);
        const existingContent = fs.readFileSync(templateFilePath, 'utf-8');
        const fileContent = `${replacePrefixes(existingContent, prefix.camelCase, prefix.kebabCase)}`;
        fs.writeFileSync(filePath, fileContent);
        return path.join(workspacePath, file.content);
    });
}
exports.createFiles = createFiles;
// function getCodeAsString(filePath: string): string | null {
//     try {
//         const content = fs.readFileSync(filePath, 'utf-8');
//         return content;
//     } catch (error) {
//         console.error(`Erro ao ler o arquivo ${filePath}: ${error}`);
//         return null;
//     }
// }


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