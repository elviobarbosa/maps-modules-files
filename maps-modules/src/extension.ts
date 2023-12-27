import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FormatedPrefix, formatPrefix, replacePrefixes } from './utils';

type files = {
	fileName: string,
	content: string
}
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "maps-modules" is now active!');

	let disposable = vscode.commands.registerCommand('maps-modules.createMapsStructure', async () => {
		const workspacePath = vscode.workspace.rootPath;

		const prefix = await vscode.window.showInputBox({
            prompt: 'Qual o nome do módulo?'
        });

        const folderStructure = [
			'components', 
			'containers', 
			'services', 
			'services/entities', 
			'services/repository',
			'services/usecases'
		];

        folderStructure.forEach(folder => {
            const folderPathToCreate = path.join(workspacePath || '', folder);
            
			if (!fs.existsSync(folderPathToCreate)) {
				fs.mkdirSync(folderPathToCreate, { recursive: true });

				if (folder === 'services/entities') {
					createUsecaseFiles(
						folderPathToCreate, 
						workspacePath || '',
						[
							{
								fileName: 'active.entity.ts',
								content: 'entities/request-response.txt'
							},
						],
						formatPrefix(prefix)
					);
				}

				if (folder === 'services/usecases') {
					createUsecaseFiles(
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

function createUsecaseFiles(folderPath: string, workspacePath: string, fileName: files[], prefix: FormatedPrefix) {
    
    fileName.forEach(file => {
		//path.join(__dirname, 'templates', 'active.txt')
        const filePath = path.join(folderPath, `${prefix.kebabCase}-${file.fileName}`);
	    
        // Ler o conteúdo de um arquivo existente (por exemplo, 'template.ts')
        //const templateFilePath = path.join(workspacePath, file.content);
		const templateFilePath = path.join(__dirname, 'templates', file.content);
		//const codeAsString = getCodeAsString(filePath);

        const existingContent = fs.readFileSync(templateFilePath, 'utf-8');

        // Incorporar o conteúdo existente no novo arquivo
        const fileContent = `${replacePrefixes(existingContent, prefix.camelCase, prefix.kebabCase)}`;

        fs.writeFileSync(filePath, fileContent);
       return path.join(workspacePath, file.content);
		 
    });
}

export function deactivate() {}
