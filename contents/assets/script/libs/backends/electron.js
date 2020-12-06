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


if (window._MDNE_BACKEND_TYPE === 'ELECTRON_IPC') {
    // Electron backend

    const apiKey = mdneApi.getKey();

    window._MDNE_BACKEND_CAPS_NO_PDF_RENDERER = false;
    window._MDNE_BACKEND_CAPS_NO_PDF_PREVIEW_PLUGIN = false;

    nativeNotifyEditorDirty_ = (dirty) => {
        mdneApi.send(apiKey, 'app:editor:notifyEditorDirty', {
            dirty,
        });
    };

    nativeAlert_ = (async (message, type) => {
        return await mdneApi.ipc(apiKey, 'app:editor:nativeAlert', {
            message,
            type,
        });
    });

    nativeAlertSync_ = ((message, type) => {
        return mdneApi.ipcSync(apiKey, 'app:editor:nativeAlertSync', {
            message,
            type,
        });
    });

    nativeConfirm_ = (async (message, type) => {
        return await mdneApi.ipc(apiKey, 'app:editor:nativeConfirm', {
            message,
            type,
        });
    });

    nativeConfirmSync_ = ((message, type) => {
        return mdneApi.ipcSync(apiKey, 'app:editor:nativeConfirmSync', {
            message,
            type,
        });
    });

    nativeFileOpenDialog_ = (async (title, defaultPath, filters) => {
        return await mdneApi.ipc(apiKey, 'app:editor:nativeFileOpenDialog', {
            title,
            defaultPath,
            filters,
        });
    });

    nativeFileSaveDialog_ = (async (title, defaultPath, filters) => {
        return await mdneApi.ipc(apiKey, 'app:editor:nativeFileSaveDialog', {
            title,
            defaultPath,
            filters,
        });
    });

    renderByMenneu_ = (async (source, data, options, srcPath, ...exportPath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:renderByMenneu', {
            source,
            data,
            options,
            srcPath,
            exportPath,
        });
    });

    loadFile_ = (async (...filePath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:loadFile', {
            filePath,
        });
    });

    saveFile_ = (async (text, ...filePath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:saveFile', {
            text,
            filePath,
        });
    });

    listDirectory_ = (async (...dirPath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:listDirectory', {
            dirPath,
        });
    });

    listDesktopDirectory_ = (async () => {
        return await mdneApi.ipc(apiKey, 'app:editor:listDesktopDirectory', {});
    });

    listHomeDirectory_ = (async () => {
        return await mdneApi.ipc(apiKey, 'app:editor:listHomeDirectory', {});
    });

    fileExists_ = (async (...filePath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:fileExists', {
            filePath,
        });
    });

    pathJoin_ = (async (...filePath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:pathJoin', {
            filePath,
        });
    });

    getDirName_ = (async (filePath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:getDirName', {
            filePath,
        });
    });

    getBaseName_ = (async (filePath) => {
        return await mdneApi.ipc(apiKey, 'app:editor:getBaseName', {
            filePath,
        });
    });

    getStartupFile_ = (async () => {
        return await mdneApi.ipc(apiKey, 'app:editor:getStartupFile', {});
    });

    openURL_ = (async (url) => {
        return await mdneApi.ipc(apiKey, 'app:editor:openURL', {
            url,
        });
    });

    openNewWindow_ = (async () => {
        return await mdneApi.ipc(apiKey, 'app:editor:openNewWindow', {});
    });

    class Backend {
        async setFrontend(frontend) {
            this.frontend_ = frontend;
            (async () => {
                //
            })();
        }

        async runCommand(command) {
            return await mdneApi.ipc(apiKey, 'app:editor:Backend:runCommand', {
                command,
            });
        }

        async runCommandAST(ast) {
            return await mdneApi.ipc(apiKey, 'app:editor:Backend:runCommandAST', {
                ast,
            });
        }
    }

    const backend_ = new Backend;

    rpc_ = {
        handle: x => x,
    };

    carlo_ = {
        loadParams: (async () => {
            return [backend_];
        }),
        fileInfo: (async (file) => {
            return ({
                path: file.path,
                fileBodyText: await loadFile(file.path),
            });
        }),
    };

    mdneApi.on(apiKey, 'app:editor:Frontend:runCommand', async (event, arg) => {
        try {
            let ret = backend_.frontend_.runCommand(arg.command);
            if (ret instanceof Promise) {
                ret = await ret;
            }
            event.sender.send('app:editor:Frontend:runCommand', {succeeded: true, payload: ret});
        } catch (e) {
            event.sender.send('app:editor:Frontend:runCommand', {succeeded: false, error: e.message});
        }
    });

    document.addEventListener('keyup', (ev) => {
        if (ev.keyCode === 122) {
            // F11
            mdneApi.ipc(apiKey, 'app:editor:toggleFullScreen', {});
            ev.preventDefault();
        }
    }, false);
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
