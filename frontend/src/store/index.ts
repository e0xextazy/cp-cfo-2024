import {create} from 'zustand';

import {InputTypes, InputPayload, Result} from '@/types';

interface State {
    inputType: string;
    inputPayload: InputPayload | null;
    result: Result | null;
    setInputType: (inputType: string) => void;
    setInputPayload: (inputPayload: InputPayload) => void;
    resetPayload: () => void;
    setResult: (result: Result) => void;
    resetResult: () => void;
}

export const useAppState = create<State>((set) => ({
    inputType: InputTypes.UPLOAD_FILE,
    setInputType: (inputType: string) => set({inputType, inputPayload: null}),
    inputPayload: null,
    setInputPayload: (inputPayload: InputPayload) => set({inputPayload}),
    resetPayload: () => set({inputPayload: null}),
    result: null,
    setResult: (result: Result) => set({result}),
    resetResult: () => set({result: null}),
}));
