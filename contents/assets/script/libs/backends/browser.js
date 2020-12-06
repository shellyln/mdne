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


const additionalContentStyles = `
<style>
::-webkit-scrollbar {
    width: 13px;
    height: 13px;
}
::-webkit-scrollbar-track {
    border-style: solid;
    border-width: 1px;
    border-color: rgb(88, 88, 88);
    background-color: rgb(56, 56, 56);
}
::-webkit-scrollbar-thumb {
    border-style: solid;
    border-width: 1px;
    border-color: rgb(88, 88, 88);
    background-color: rgb(102, 102, 102);
}
</style>
`;


if (!window._MDNE_BACKEND_TYPE || window._MDNE_BACKEND_TYPE === 'BROWSER_EMULATION') {
    // Fallback (for Browser)

    window._MDNE_BACKEND_TYPE = 'BROWSER_EMULATION';
    window._MDNE_BACKEND_CAPS_NO_PDF_RENDERER = true;
    window._MDNE_BACKEND_CAPS_NO_PDF_PREVIEW_PLUGIN = true;

    const welcomeFile = 'assets/data/welcome.md';

    // eslint-disable-next-line no-unused-vars
    renderByMenneu_ = (async (source, data, options, srcPath, ...exportPath) => {
        const opts = Object.assign({}, options, {
            // NOTE: to enhance macros, define Vx02PGUB3NFWwhsd__replacementMacros.
            replacementMacros: [{
                re: /!!!lsx\s([\s\S]+?)!!!/g,
                fn: 'lsx', // evaluate input as LSX script
            }].concat(
                window.Vx02PGUB3NFWwhsd__replacementMacros &&
                Array.isArray(window.Vx02PGUB3NFWwhsd__replacementMacros) ?
                    window.Vx02PGUB3NFWwhsd__replacementMacros:
                    []),
        });
        if (!opts.outputFormat || opts.outputFormat.toLowerCase() !== 'html') {
            const errText = `output format ${opts.outputFormat} is not available.`;
            throw new Error(errText);
        }

        // eslint-disable-next-line no-undef
        const buf = await menneu.render(source, {}, opts);
        let bufStr = buf.toString();
        if (exportPath.length === 0) {
            bufStr += additionalContentStyles;
        }

        // NOTE: Browsers treat Data URLs as cross-origin.
        //       To avoid cross-origin, use Blob URLs instead.
        // const resultUrl = 'data:text/html;base64,' + menneu.getAppEnv().RedAgateUtil.Base64.encode(buf);

        // eslint-disable-next-line no-undef
        const resultUrl = URL.createObjectURL(new Blob([bufStr], { type: 'text/html' }));

        if (exportPath.length > 0) {
            internalSaveFileEx(true, bufStr, ...exportPath);
        }

        // schedule revoking the Blob URL.
        setTimeout(() => URL.revokeObjectURL(resultUrl), 5000);
        return resultUrl;
    });

    // eslint-disable-next-line no-unused-vars
    loadFile_ = (async (...filePath) => {
        // eslint-disable-next-line no-undef
        const response = await fetch(welcomeFile);
        return await response.text();
    });

    // eslint-disable-next-line no-inner-declarations
    async function internalSaveFileEx(forExport, text, ...filePath) {
        const p = await pathJoin(...filePath);
        const b = await getBaseName(p);
        // eslint-disable-next-line no-undef
        const util = menneu.getAppEnv().RedAgateUtil;
        await util.FileSaver.saveTextAs(b, text);

        if (!forExport) {
            try {
                // eslint-disable-next-line require-atomic-updates, no-undef
                window.location.hash = `filename=${encodeURIComponent(b)}&open.d=${util.Base64.encode(pako.deflate(
                    util.TextEncoding.encodeToUtf8(text)))
                    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')}`;
            // eslint-disable-next-line no-empty
            } catch (e) {}
        }

        return {
            path: p,
            name: b,
        };
    }

    saveFile_ = (async (text, ...filePath) => {
        return await internalSaveFileEx(false, text, ...filePath);
    });

    // eslint-disable-next-line no-unused-vars
    listDirectory_ = (async (...dirPath) => {
        return {
            directory: '',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    });

    listDesktopDirectory_ = (async () => {
        return {
            directory: '/',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    });

    listHomeDirectory_ = (async () => {
        return {
            directory: '/',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    });

    // eslint-disable-next-line no-unused-vars
    fileExists_ = (async (...filePath) => {
        return false;
    });

    pathJoin_ = (async (...filePath) => {
        const p = filePath.filter(x => x.length > 0).join('/').replace(/\/+/g, '/');
        const a = p.split('/');
        const stack = [];
        for (const x of a) {
            switch (x) {
            case '.': case '':
                break;
            case '..':
                stack.pop();
                break;
            default:
                if (x.match(/^[.]+$/)) {
                    stack.pop();
                } else {
                    stack.push(x);
                }
                break;
            }
        }
        return (p.startsWith('/') ? '/' : '') + stack.join('/');
    });

    getDirName_ = (async (filePath) => {
        let dir = filePath;
        if (dir.lastIndexOf('/') !== -1) {
            dir = dir.substring(0, dir.lastIndexOf('/'));
        }
        if (dir === '') {
            dir = '/';
        }
        return dir;
    });

    getBaseName_ = (async (filePath) => {
        let base = filePath.substring(filePath.lastIndexOf('/') + 1);
        return base;
    });

    getStartupFile_ = (async () => {
        let targetPath = '/welcome.md';
        let targetUrl = welcomeFile;
        // eslint-disable-next-line no-undef
        const util = menneu.getAppEnv().RedAgateUtil;

        if (window.location.hash) {
            if (window.location.hash.indexOf('open.d=') >= 0) {
                const result = {};
                window.location.hash.substring(1).split('&').forEach((part) => {
                    const item = part.split('=');
                    result[item[0]] = decodeURIComponent(item[1]);
                });
                if (result['open.d']) {
                    targetPath = result['filename'] || '/Untitled.md';
                    try {
                        // eslint-disable-next-line no-undef
                        targetUrl = `data:text/plain;base64,${util.Base64.encode(pako.inflate(
                            util.Base64.decode(
                                result['open.d'].replace(/-/g, '+').replace(/_/g, '/'))))}`;
                    // eslint-disable-next-line no-empty
                    } catch (e) {}
                }
            } else if (window.location.hash.indexOf('open.url=') >= 0) {
                const result = {};
                window.location.hash.substring(1).split('&').forEach((part) => {
                    const item = part.split('=');
                    result[item[0]] = decodeURIComponent(item[1]);
                });
                if (result['open.url']) {
                    targetPath = result['open.url']
                        .substring(result['open.url'].lastIndexOf('/') + 1) ||
                        'index';
                    targetUrl = result['open.url'];
                }
            }
        }
        // eslint-disable-next-line no-undef
        const response = await fetch(targetUrl, {});
        if (response.ok) {
            return {
                path: targetPath,
                text: await response.text(),
            };
        }
        throw new Error('Fetching url failed. Network response was not ok, or CORB error.');
    });

    openURL_ = (async (url) => {
        window.open(url, '_blank', 'noopener');
        return true;
    });

    openNewWindow_ = (async () => {
        window.open(window.location.pathname + '#filename=untitled.md&open.d=eJwDAAAAAAE', '_blank', 'noopener');
        return true;
    });

    const LM_async_ = (() => {
        let config = Object.assign({}, liyad.defaultConfig);
        config.reservedNames = Object.assign({}, config.reservedNames, {
            Template: '$concat',
        });
    
        config = liyad.installCore(config);
        config = liyad.installArithmetic(config);
        config = liyad.installSequence(config);
        config = liyad.installConcurrent(config);
    
        config.stripComments = true;
        config.returnMultipleRoot = true;
    
        return liyad.SExpressionAsync(config);
    })();

    LM_async_
    .setGlobals({})
    .install(config => {
        const operators = [{
            name: '$>',
            // eslint-disable-next-line no-unused-vars
            fn: (state, name) => (...command) => {
                return new Promise((resolve, reject) => {
                    reject(new Error('cannot execute shell'));
                });
            },
        }];
        config.funcs = (config.funcs || []).concat(operators);
        // config.macros = (config.macros || []).concat(macros);
        // config.symbols = (config.symbols || []).concat(symbols);
        return config;
    });

    class Backend {
        async setFrontend(frontend) {
            // Node world can now use frontend RPC handle.
            this.frontend_ = frontend;
            (async () => {
                //
            })();
        }

        async runCommand(command) {
            return LM_async_(command);
        }

        async runCommandAST(ast) {
            return LM_async_.evaluateAST(ast);
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
            const promise = new Promise((resolve, reject) => {
                // eslint-disable-next-line no-undef
                const reader = new FileReader();
                // eslint-disable-next-line no-unused-vars
                reader.onload = ev => {
                    resolve({
                        path: file.name,
                        fileBodyText: reader.result,
                    });
                };
                // eslint-disable-next-line no-unused-vars
                reader.onerror = ev => {
                    reject(reader.error);
                };
                reader.readAsText(file, 'UTF-8');
            });
            return promise;
        }),
    };
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
