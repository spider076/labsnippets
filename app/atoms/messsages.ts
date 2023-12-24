import {atom, RecoilState } from "recoil";

export const messagesState: RecoilState<string[]> = atom<string[]>({
    key: 'messagesState',
    default: [],
});