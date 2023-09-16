const specialCharacters = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ñ': 'n',
    'ó': 'o',
    'ú': 'u',
    'ü': 'u'
}

export function simplifyText(text: string) {
    text = text.toLowerCase()

    for (let key in specialCharacters) {
        const regex = new RegExp(key, 'g');
        text = text.replace(regex, specialCharacters[key as keyof typeof specialCharacters]);
    }

    return text.replace(/[^a-z0-9]/gi, '') // remove non alpha-numeric using regex voodoo-magic
}

export function compareText(a: string, b: string) {
    if (a == null || b == null) return false
    
    return simplifyText(a) == simplifyText(b)
}