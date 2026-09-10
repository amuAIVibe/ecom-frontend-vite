export const truncateText = (text, charLimit = 30) => {
    if (text?.length <= charLimit) {
        return text;
    }
    return text.slice(0, charLimit) + '...';
};