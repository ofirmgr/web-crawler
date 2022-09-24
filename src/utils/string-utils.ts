export function hashCode(string: string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        const code = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export function normalizeNameOrTitle(str: string) {
    if (str in ['Guest', 'Unknown', 'Anonymous']) {
        return "";
    } else return str;
}

export function stripTrailingSpaces(content: string) {
    return content.replace(/\s+$/, '');
}
