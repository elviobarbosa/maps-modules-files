import * as fs from 'fs';
import * as path from 'path';
import { FormatedPrefixType } from './format-prefix';

export function checkFolderNames(destPath: string, prefix: FormatedPrefixType) {
    const items = fs.readdirSync(destPath);

    items.forEach(item => {
        const itemPath = path.join(destPath, item);

        if (fs.statSync(itemPath).isDirectory()) {
            // Se for um diretório, chama recursivamente a função
            checkFolderNames(itemPath, prefix);
        }

        if (item.startsWith('PREFIX-KEBABCASE')) {
            const newItemName = item.replace('PREFIX-KEBABCASE', prefix.kebabCase);
            const newItemPath = path.join(destPath, newItemName);

            // Verifica se o item de destino existe antes de renomear
            if (!fs.existsSync(newItemPath)) {
                fs.renameSync(itemPath, newItemPath);
            }
        }
    });
}