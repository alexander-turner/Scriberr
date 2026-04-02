import type React from 'react';

interface Segment {
    text: string;
    speaker?: string;
}

/** Group segments by consecutive speaker into paragraph strings. Returns null if only one group. */
export function groupSegmentsBySpeaker(segments: Segment[]): string[] | null {
    const paragraphs: string[] = [];
    let currentSpeaker: string | undefined;
    let currentTexts: string[] = [];
    for (const seg of segments) {
        if (currentTexts.length > 0 && seg.speaker !== currentSpeaker) {
            paragraphs.push(currentTexts.join(' '));
            currentTexts = [];
        }
        currentSpeaker = seg.speaker;
        if (seg.text) currentTexts.push(seg.text.trim());
    }
    if (currentTexts.length > 0) paragraphs.push(currentTexts.join(' '));
    return paragraphs.length > 1 ? paragraphs : null;
}

// Cross-browser caret position for click-to-seek
export function getCaretOffsetFromPoint(x: number, y: number): number | null {
    if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(x, y);
        return range ? range.startOffset : null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((document as any).caretPositionFromPoint) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pos = (document as any).caretPositionFromPoint(x, y);
        return pos ? pos.offset : null;
    }
    return null;
}

// Shared style for text-selectable transcript elements (iOS/Android compat)
export const textSelectionStyle: React.CSSProperties = {
    WebkitUserSelect: 'text',
    userSelect: 'text',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'pan-y pinch-zoom',
    WebkitTouchCallout: 'default'
};
