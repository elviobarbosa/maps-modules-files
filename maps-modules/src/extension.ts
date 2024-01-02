import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { copyFiles } from './resources/scripts/copy-files';
import { formatPrefix } from './resources/scripts/format-prefix';
import { checkFolderNames } from './resources/scripts/check-folder';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "template-structure" is now active!');

    let disposable = vscode.commands.registerCommand('template-structure.create', async () => {

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

        copyFiles(templatePath, destinationPath, formatPrefix(prefix));
        checkFolderNames(destinationPath, formatPrefix(prefix));

        vscode.window.showInformationMessage('Arquivos criados e nomes de pastas verificados com sucesso :]');
    });

    context.subscriptions.push(disposable);
}