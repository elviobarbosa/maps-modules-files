import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

type files = {
	fileName: string,
	content: string
}
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "maps-modules" is now active!');

	let disposable = vscode.commands.registerCommand('maps-modules.createMapsStructure', () => {
		const workspacePath = vscode.workspace.rootPath;
		let t = ''

        const folderStructure = [
			'components', 
			'containers', 
			'services', 
			'services/entity', 
			'services/repository',
			'services/usecases'
		];

        folderStructure.forEach(folder => {
            const folderPathToCreate = path.join(workspacePath || '', folder);
            
			if (!fs.existsSync(folderPathToCreate)) {
				fs.mkdirSync(folderPathToCreate, { recursive: true });

				if (folder === 'services/usecases') {
					createUsecaseFiles(
						folderPathToCreate, 
						workspacePath || '',
						[
							{
								fileName: 'CreateUserUseCase.ts',
								content: './src/templates/usecases/create.txt'
							},
							{
								fileName: 'UpdateUserUseCase.ts',
								content: 'src/templates/usecases/update.txt'
							} 
						]
					);
				}
			}
        });

        vscode.window.showInformationMessage(t);
	});

	context.subscriptions.push(disposable);
}

function createUsecaseFiles(folderPath: string, workspacePath: string, fileName: files[]) {
    
    fileName.forEach(file => {
        const filePath = path.join(folderPath, file.fileName);
	    
        // Ler o conteúdo de um arquivo existente (por exemplo, 'template.ts')
        const templateFilePath = path.join(workspacePath, file.content);
        const existingContent = fs.readFileSync(templateFilePath, 'utf-8');

        // Incorporar o conteúdo existente no novo arquivo
        const fileContent = `// Conteúdo do arquivo ${file.fileName}\n${existingContent}`;
		console.log('Caminho do modelo:', templateFilePath);

        fs.writeFileSync(filePath, fileContent);
       return path.join(workspacePath, file.content);
		 
    });
}

export function deactivate() {}
