export type FormatedPrefixType = {
    camelCase: string; 
    kebabCase: string
}

export function formatPrefix(input: string = ''): FormatedPrefixType {
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