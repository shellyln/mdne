// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


{
    const welcomeFile = 'assets/data/welcome.md';

    window.rpc = window.rpc || {};
    window.rpc.handle = window.rpc.handle || (x => x);
    window.carlo = window.carlo || {};

    window._MDNE_BACKEND_TYPE = 'BROWSER_EMULATION';
    window._MDNE_BACKEND_CAPS_NO_PDF_RENDERER = true;
    window._MDNE_BACKEND_CAPS_NO_PDF_PREVIEW_PLUGIN = true;


    // eslint-disable-next-line no-unused-vars
    window.renderByMenneu = window.renderByMenneu || (async (source, data, options, srcPath, ...exportPath) => {
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

        // NOTE: Browsers treat Data URLs as cross-origin.
        //       To avoid cross-origin, use Blob URLs instead.
        // const resultUrl = 'data:text/html;base64,' + menneu.getAppEnv().RedAgateUtil.Base64.encode(buf);

        // eslint-disable-next-line no-undef
        const resultUrl = URL.createObjectURL(new Blob([buf.toString()], { type: 'text/html' }));

        if (exportPath.length > 0) {
            internalSaveFileEx(true, buf.toString(), ...exportPath);
        }

        // schedule revoking the Blob URL.
        setTimeout(() => URL.revokeObjectURL(resultUrl), 5000);
        return resultUrl;
    });

    // eslint-disable-next-line no-unused-vars
    window.loadFile = window.loadFile || (async (...filePath) => {
        // eslint-disable-next-line no-undef
        const response = await fetch(welcomeFile);
        return await response.text();
    });

    // eslint-disable-next-line no-inner-declarations
    async function internalSaveFileEx(forExport, text, ...filePath) {
        const p = await window.pathJoin(...filePath);
        const b = await window.getBaseName(p);
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

    window.saveFile = window.saveFile || (async (text, ...filePath) => {
        return await internalSaveFileEx(false, text, ...filePath);
    });

    // eslint-disable-next-line no-unused-vars
    window.listDirectory = window.listDirectory || (async (...dirPath) => {
        return {
            directory: '',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    });

    window.listDesktopDirectory = window.listDesktopDirectory || (async () => {
        return {
            directory: '/',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    });

    window.listHomeDirectory = window.listHomeDirectory || (async () => {
        return {
            directory: '/',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    });

    // eslint-disable-next-line no-unused-vars
    window.fileExists = window.fileExists || (async (...filePath) => {
        return false;
    });

    window.pathJoin = window.pathJoin || (async (...filePath) => {
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

    window.getDirName = window.getDirName || (async (filePath) => {
        let dir = filePath;
        if (dir.lastIndexOf('/') !== -1) {
            dir = dir.substring(0, dir.lastIndexOf('/'));
        }
        if (dir === '') {
            dir = '/';
        }
        return dir;
    });

    window.getBaseName = window.getBaseName || (async (filePath) => {
        let base = filePath.substring(filePath.lastIndexOf('/') + 1);
        return base;
    });

    window.getStartupFile = window.getStartupFile || (async () => {
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

    window.openURL = window.openURL || (async (url) => {
        window.open(url, '_blank');
        return true;
    });

    window.openNewWindow = window.openNewWindow || (async () => {
        window.open(window.location.pathname + '#filename=untitled.md&open.d=eJwDAAAAAAE', '_blank');
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


    window.carlo.loadParams = window.carlo.loadParams || (async () => {
        return [backend_];
    });

    window.carlo.fileInfo = window.carlo.fileInfo || (async (file) => {
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
    });
}
