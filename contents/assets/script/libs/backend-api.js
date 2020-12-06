// Copyright (c) 2020 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import * as carloBackend    from './backends/carlo.js';
import * as electronBackend from './backends/electron.js';
import * as browserBackend  from './backends/browser.js';


let backend = null;


if (window._MDNE_BACKEND_TYPE === 'CARLO_RPC') {
    // Carlo backend
    backend = carloBackend;
} else if (window._MDNE_BACKEND_TYPE === 'ELECTRON_IPC') {
    // Electron backend
    backend = electronBackend;
} else {
    // Fallback (for Browser)
    backend = browserBackend;
}


export const nativeNotifyEditorDirty = backend.nativeNotifyEditorDirty;
export const nativeAlert = backend.nativeAlert;
export const nativeAlertSync = backend.nativeAlertSync;
export const nativeConfirm = backend.nativeConfirm;
export const nativeConfirmSync = backend.nativeConfirmSync;
export const nativeFileOpenDialog = backend.nativeFileOpenDialog;
export const nativeFileSaveDialog = backend.nativeFileSaveDialog;
export const renderByMenneu = backend.renderByMenneu;
export const loadFile = backend.loadFile;
export const saveFile = backend.saveFile;
export const listDirectory = backend.listDirectory;
export const listDesktopDirectory = backend.listDesktopDirectory;
export const listHomeDirectory = backend.listHomeDirectory;
export const fileExists = backend.fileExists;
export const pathJoin = backend.pathJoin;
export const getDirName = backend.getDirName;
export const getBaseName = backend.getBaseName;
export const getStartupFile = backend.getStartupFile;
export const openURL = backend.openURL;
export const openNewWindow = backend.openNewWindow;
export const rpc = backend.rpc;
export const carlo = backend.carlo;
