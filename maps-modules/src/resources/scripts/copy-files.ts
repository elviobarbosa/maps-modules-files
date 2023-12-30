import * as fs from 'fs';
import * as path from 'path';
import { FormatedPrefixType } from './format-prefix';
import { replacePrefixes } from './replace-prefixes';

export function copyFiles(srcPath: string, destPath: string, selectedFolders: string[], prefix: FormatedPrefixType) {
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
        } else {
    
            if (selectedFolders.some(folder => destFilePath.startsWith(folder))) {
                const fileExtension = path.extname(destFilePath);
                const fileNameWithoutExtension = path.basename(destFilePath, fileExtension);
                const newFileName = (fileNameWithoutExtension.startsWith('-') ? `${prefix.kebabCase}${fileNameWithoutExtension}` : `${prefix.kebabCase}.${fileNameWithoutExtension}`);
                const newDestFilePath = path.join(destPath, newFileName);
                const fileContent = fs.readFileSync(srcFilePath, 'utf-8');
                const modifiedContent = replacePrefixes(fileContent, prefix.camelCase, prefix.kebabCase);

                fs.writeFileSync(newDestFilePath, modifiedContent);
                
            }
        }
    });
}