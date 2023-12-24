import {atom, RecoilState } from "recoil";

export const userState: RecoilState<string> = atom<string>({
    key: 'userState',
    default: "",
});