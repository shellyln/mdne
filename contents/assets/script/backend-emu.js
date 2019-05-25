// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


{
    const welcomeFile = 'assets/data/welcome.md';

    window.rpc = {};
    window.rpc.handle = x => x;
    window.carlo = {};

    // eslint-disable-next-line no-unused-vars
    window.renderByMenneu = async (source, data, options, srcPath, ...exportPath) => {
        const opts = Object.assign({}, options, {});
        if (!opts.outputFormat || opts.outputFormat.toLowerCase() !== 'html') {
            const errText = `output format ${opts.outputFormat} is not available.`;
            throw new Error(errText);
        }
        // eslint-disable-next-line no-undef
        const buf = await menneu.render(source, {}, opts);
        // eslint-disable-next-line no-undef
        const resultUrl = 'data:text/html;base64,' + menneu.getAppEnv().RedAgateUtil.Base64.encode(buf);
        if (exportPath.length > 0) {
            saveFile(buf.toString(), ...exportPath);
        }
        return resultUrl;
    };

    // eslint-disable-next-line no-unused-vars
    window.loadFile = async (...filePath) => {
        // eslint-disable-next-line no-undef
        const response = await fetch(welcomeFile);
        return await response.text();
    };

    window.saveFile = async (text, ...filePath) => {
        const p = await window.pathJoin(...filePath);
        const b = await window.getBaseName(p);
        // eslint-disable-next-line no-undef
        const util = menneu.getAppEnv().RedAgateUtil;
        await util.FileSaver.saveTextAs(b, text);

        return {
            path: p,
            name: b,
        };
    };

    // eslint-disable-next-line no-unused-vars
    window.listDirectory = async (...dirPath) => {
        return {
            directory: '',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    };

    window.listDesktopDirectory = async () => {
        return {
            directory: '/',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    };

    window.listHomeDirectory = async () => {
        return {
            directory: '/',
            files: [{
                name: '.',
                isDirectory: true,
            }],
        };
    };

    // eslint-disable-next-line no-unused-vars
    window.fileExists = async (...filePath) => {
        return false;
    };

    window.pathJoin = async (...filePath) => {
        const p = filePath.filter(x => x.length > 0).join('/').replace(/\/+/g, '/');
        const a = p.split('/');
        const stack = [];
        for (const x of a) {
            switch (x) {
            case '.':
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
    };

    window.getDirName = async (filePath) => {
        let dir = filePath;
        if (dir.lastIndexOf('/') !== -1) {
            dir = dir.substring(0, dir.lastIndexOf('/'));
        }
        if (dir === '') {
            dir = '/';
        }
        return dir;
    };

    window.getBaseName = async (filePath) => {
        let base = filePath.substring(filePath.lastIndexOf('/') + 1);
        return base;
    };

    window.getStartupFile = async () => {
        // eslint-disable-next-line no-undef
        const response = await fetch(welcomeFile);
        return {
            path: '/welcome.md',
            text: await response.text(),
        };
    };

    window.openURL = async (url) => {
        window.open(url, '_blank');
        return true;
    };

    window.openNewWindow = async () => {
        window.open(window.location.pathname, '_blank');
        return true;
    };


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


    window.carlo.loadParams = async () => {
        return [backend_];
    };

    window.carlo.fileInfo = async (file) => {
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
    };
}
