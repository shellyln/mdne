// Copyright (c) 2020 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { nativeNotifyEditorDirty,
         nativeAlert,
         nativeConfirm } from './backend-api.js';
import AppState          from './appstate.js';



export const notifyEditorDirty = (dirty) => {
    AppState.fileChanged = dirty;
    if (nativeNotifyEditorDirty) {
        nativeNotifyEditorDirty(dirty);
    }
}


export const alertWrap = async (message) => {
    if (nativeAlert) {
        await nativeAlert(String(message));
    } else {
        alert(message);
    }
}


export const confirmWrap = async (message) => {
    if (nativeConfirm) {
        return await nativeConfirm(String(message));
    } else {
        return confirm(message);
    }
}
