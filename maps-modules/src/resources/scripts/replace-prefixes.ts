/**
 * 
 * @param content conteúdo do arquivo
 * @param prefixCamelCase prefixo em Camel Case
 * @param prefixKebabCase prefixo em Kebab Case 
 * @returns 
 */
export function replacePrefixes(content: string, prefixCamelCase: string, prefixKebabCase: string): string {
    return content
        .replace(/\[PREFIX-CAMELCASE\]/g, prefixCamelCase)
        .replace(/\[PREFIX-KABEBCASE\]/g, prefixKebabCase);
}