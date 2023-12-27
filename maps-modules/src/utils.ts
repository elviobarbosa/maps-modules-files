export type FormatedPrefix = {
    camelCase: string; 
    kebabCase: string
}

export function formatPrefix(input: string = ''): FormatedPrefix {
    if (!input) {
        return { camelCase: '', kebabCase: '' };
    }
    const words = input.split(' ');

    // Formatar para Camel Case
    const camelCase = words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

    // Formatar para Kebab Case
    const kebabCase = words.join('-').toLowerCase();

    return { camelCase, kebabCase };
}

export function replacePrefixes(content: string, prefixCamelCase: string, prefixKebabCase: string): string {
    return content
        .replace(/\[PREFIX-CAMELCASE\]/g, prefixCamelCase)
        .replace(/\[PREFIX-KABEBCASE\]/g, prefixKebabCase);
}