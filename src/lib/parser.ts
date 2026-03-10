export interface ParsedMessage {
    speaker: string;
    content: string;
    messageIndex: number;
}

/**
 * Parses a raw pasted chat transcript into an array of structured messages.
 * Matches common chat formats like:
 * "John: Hello there"
 * "John Doe [10:45 AM]: Hello there"
 * "Alice 10/12/2023: Hey"
 */
export function parseConversation(rawText: string): ParsedMessage[] {
    const messages: ParsedMessage[] = [];
    const lines = rawText.split(/\r?\n/);

    let currentSpeaker = "";
    let currentContent = "";
    let messageIndex = 0;

    // Regex to match typical speaker patterns, e.g. "SpeakerName:" or "Speaker Name [time]:"
    // It looks for string followed by colon, prioritizing words at the start of lines.
    const speakerRegex = /^([a-zA-Z0-9\s_-]{2,30}?)(?:\s*\[.*?\]|\s*\d{1,2}:\d{2}.*?)?\s*:\s*(.*)/;

    for (const line of lines) {
        if (!line.trim()) continue;

        const match = line.match(speakerRegex);
        if (match) {
            // If we already had a message brewing, push it
            if (currentSpeaker && currentContent) {
                messages.push({
                    speaker: currentSpeaker.trim(),
                    content: currentContent.trim(),
                    messageIndex: messageIndex++,
                });
            }

            currentSpeaker = match[1];
            currentContent = match[2];
        } else {
            // Continuation of the previous message
            if (currentSpeaker) {
                currentContent += "\n" + line.trim();
            } else {
                // If no speaker previously determined, we will assign this to "Unknown" 
                // to at least capture the start of the transcript.
                currentSpeaker = "Unknown";
                currentContent = line.trim();
            }
        }
    }

    // Push the very last message in the buffer
    if (currentSpeaker && currentContent) {
        messages.push({
            speaker: currentSpeaker.trim(),
            content: currentContent.trim(),
            messageIndex: messageIndex++,
        });
    }

    return messages;
}
