import { FormatedPrefixType } from "./format-prefix";

/**
 * 
 * @param content conteúdo do arquivo
 * @param prefixCamelCase prefixo em Camel Case
 * @param prefixKebabCase prefixo em Kebab Case 
 * @returns 
 */
export function replacePrefixes(content: string, prefix: FormatedPrefixType): string {
    const camelCasePrefixRegex = /\[PREFIX-CAMELCASE\]/g;
    const kebabCasePrefixRegex = /\[PREFIX-KEBABCASE\]/g;

    return content
        .replace(camelCasePrefixRegex, prefix.camelCase)
        .replace(kebabCasePrefixRegex, prefix.kebabCase);
}