export const InputTypes = {
    UPLOAD_FILE: 'upload-file',
    UPLOAD_LINK: 'upload-link',
    UPLOAD_TEXT: 'upload-text',
} as const;

export type InputPayload = {
    type: 'text' | 'link' | 'file';
    content: any;
};

export type CourseInfo = {
    url: string;
    title: string;
    price: number;
    description: string;
    match: number;
    technologies: string[];
    months: number;
};

export type Result = {
    count: number;
    result: any[];
};
