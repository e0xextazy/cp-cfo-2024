import {create} from 'zustand';

import {InputTypes, InputPayload} from '@/types';

interface State {
    inputType: string;
    inputPayload: InputPayload | null;
    setInputType: (inputType: string) => void;
    setInputPayload: (inputPayload: InputPayload) => void;
    resetPayload: () => void;
}

export const useAppState = create<State>((set) => ({
    inputType: InputTypes.UPLOAD_FILE,
    setInputType: (inputType: string) => set({inputType, inputPayload: null}),
    inputPayload: null,
    setInputPayload: (inputPayload: InputPayload) => set({inputPayload}),
    resetPayload: () => set({inputPayload: null}),
}));
