import * as vscode from 'vscode';
import * as path from 'path';
import { formatPrefix } from './resources/scripts/format-prefix';
import { copyFiles } from './resources/scripts/copy-files';



export function activate(context: vscode.ExtensionContext) {

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

		copyFiles(templatePath, destinationPath, selectedFolders.map(uri => uri.fsPath), formatPrefix(prefix));
        
        
        vscode.window.showInformationMessage('Arquivos criados com sucesso :]');
	});

	context.subscriptions.push(disposable);
}


