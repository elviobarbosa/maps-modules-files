import * as fs from 'fs';
import * as path from 'path';
import { FormatedPrefixType } from './format-prefix';
import { replacePrefixes } from './replace-prefixes';

export function copyFiles(srcPath: string, destPath: string, prefix: FormatedPrefixType) {
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }

    const items = fs.readdirSync(srcPath);

    items.forEach(item => {
        const srcItemPath = path.join(srcPath, item);
        const destItemPath = path.join(destPath, item);

        const stats = fs.statSync(srcItemPath);

        if (stats.isDirectory()) {
           // if (item.startsWith('PREFIX-KEBABCASE')) {
                // const newFolderName = item.replace('PREFIX-KEBABCASE', prefix.kebabCase);
                // const newDestItemPath = path.join(destPath, newFolderName);

                // // Verifica se o diretório de destino existe antes de renomear
                // if (!fs.existsSync(newDestItemPath)) {
                //     fs.renameSync(destItemPath, newDestItemPath);
                // }

            //     copyFiles(srcItemPath, destItemPath, prefix);
            // } else {
                copyFiles(srcItemPath, destItemPath, prefix);
           // }
        } else {
            const newFileName = (item.startsWith('-') ? `${prefix.kebabCase}${item}` : `${prefix.kebabCase}.${item}`);
            const newDestItemPath = path.join(destPath, newFileName);

            const fileContent = fs.readFileSync(srcItemPath, 'utf-8');
            const modifiedContent = replacePrefixes(fileContent, prefix);

            fs.writeFileSync(newDestItemPath, modifiedContent);
        }
    });
}