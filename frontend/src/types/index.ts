export const InputTypes = {
    UPLOAD_FILE: 'upload-file',
    UPLOAD_LINK: 'upload-link',
    UPLOAD_TEXT: 'upload-text',
} as const;

export type InputPayload = {
    type: 'text' | 'link' | 'file';
    content: any;
};
