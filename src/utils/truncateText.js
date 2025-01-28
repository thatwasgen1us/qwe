export default function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    let truncated = text.slice(0, maxLength);

    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }

    return truncated + '...';
  }
