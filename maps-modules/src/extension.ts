import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createFiles, formatPrefix } from './utils';


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
				if (folder !== '/') {
					fs.mkdirSync(folderPathToCreate, { recursive: true });
				}

				if (folder === '/') {
					createFiles(
						'', 
						workspacePath || '',
						[
							{
								fileName: 'module.ts',
								content: 'module.txt'
							},
							{
								fileName: 'routing.module.ts',
								content: 'routing.module.txt'
							},
						],
						formatPrefix(prefix)
					);
				}		

				if (folder === 'services/entities') {
					createFiles(
						folderPathToCreate, 
						workspacePath || '',
						[
							{
								fileName: 'geral.entity.ts',
								content: 'entities/request-response.txt'
							},
						],
						formatPrefix(prefix)
					);
				}

				if (folder === 'services/repository') {
					createFiles(
						folderPathToCreate, 
						workspacePath || '',
						[
							{
								fileName: 'repository.ts',
								content: 'repository/repository.txt'
							},
						],
						formatPrefix(prefix)
					);
				}

				if (folder === 'services/usecases') {
					createFiles(
						folderPathToCreate, 
						workspacePath || '',
						[
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
						],
						formatPrefix(prefix)
					);
				}
			}
        });

        vscode.window.showInformationMessage('Arquivos criados com sucesso :]');
	});

	context.subscriptions.push(disposable);
}


