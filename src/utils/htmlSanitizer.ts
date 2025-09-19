import sanitizeHtml from 'sanitize-html';

export function sanitize(input: string): string {
    /**
     *  This library is fairy generous with what it allows by default.
     *  We want to be very strict and only allow plain text.
     * So we override all the defaults to allow nothing.
     */
    return sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: []
    });
};