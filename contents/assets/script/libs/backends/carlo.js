// Copyright (c) 2020 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



let nativeNotifyEditorDirty_ = void 0;
let nativeAlert_ = void 0;
let nativeAlertSync_ = void 0;
let nativeConfirm_ = void 0;
let nativeConfirmSync_ = void 0;
let nativeFileOpenDialog_ = void 0;
let nativeFileSaveDialog_ = void 0;
let renderByMenneu_ = void 0;
let loadFile_ = void 0;
let saveFile_ = void 0;
let listDirectory_ = void 0;
let listDesktopDirectory_ = void 0;
let listHomeDirectory_ = void 0;
let fileExists_ = void 0;
let pathJoin_ = void 0;
let getDirName_ = void 0;
let getBaseName_ = void 0;
let getStartupFile_ = void 0;
let openURL_ = void 0;
let openNewWindow_ = void 0;
let rpc_ = void 0;
let carlo_ = void 0;


if (window._MDNE_BACKEND_TYPE === 'CARLO_RPC') {
    // Carlo backend

    window._MDNE_BACKEND_CAPS_NO_PDF_RENDERER = false;
    window._MDNE_BACKEND_CAPS_NO_PDF_PREVIEW_PLUGIN = false;

    renderByMenneu_ = window.renderByMenneu;
    loadFile_ = window.loadFile;
    saveFile_ = window.saveFile;
    listDirectory_ = window.listDirectory;
    listDesktopDirectory_ = window.listDesktopDirectory;
    listHomeDirectory_ = window.listHomeDirectory;
    fileExists_ = window.fileExists;
    pathJoin_ = window.pathJoin;
    getDirName_ = window.getDirName;
    getBaseName_ = window.getBaseName;
    getStartupFile_ = window.getStartupFile;
    openURL_ = window.openURL;
    openNewWindow_ = window.openNewWindow;
    rpc_ = window.rpc;
    carlo_ = window.carlo;
}


export const nativeNotifyEditorDirty = nativeNotifyEditorDirty_;
export const nativeAlert = nativeAlert_;
export const nativeAlertSync = nativeAlertSync_;
export const nativeConfirm = nativeConfirm_;
export const nativeConfirmSync = nativeConfirmSync_;
export const nativeFileOpenDialog = nativeFileOpenDialog_;
export const nativeFileSaveDialog = nativeFileSaveDialog_;
export const renderByMenneu = renderByMenneu_;
export const loadFile = loadFile_;
export const saveFile = saveFile_;
export const listDirectory = listDirectory_;
export const listDesktopDirectory = listDesktopDirectory_;
export const listHomeDirectory = listHomeDirectory_;
export const fileExists = fileExists_;
export const pathJoin = pathJoin_;
export const getDirName = getDirName_;
export const getBaseName = getBaseName_;
export const getStartupFile = getStartupFile_;
export const openURL = openURL_;
export const openNewWindow = openNewWindow_;
export const rpc = rpc_;
export const carlo = carlo_;
