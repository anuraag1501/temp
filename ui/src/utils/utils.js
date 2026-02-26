
export function searchAndHighlight(text, searchVal) {
    if (!searchVal) return text;
    text = String(text);

    const regex = new RegExp(`(${searchVal})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        regex.test(part) ? (
            <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
        ) : (
            part
        )
    );
}
