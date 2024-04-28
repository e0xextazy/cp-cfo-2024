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
    link: string;
    title: string;
    price: number;
    desc: string;
    match: number;
    vac_stack: string[];
    cover: string[];
    duration: number;
};

export type Result = {
    count: number;
    result: any[];
};
