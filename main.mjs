// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import './lib/extension';

import findChrome       from 'carlo/lib/find_chrome';
import { HtmlRenderer } from 'red-agate/modules/red-agate/renderer';
import { Base64 }       from 'red-agate-util/modules/convert/Base64';
import { TextEncoding } from 'red-agate-util/modules/convert/TextEncoding';
import requireDynamic   from 'red-agate-util/modules/runtime/require-dynamic';
import { render,
         getAppEnv }    from 'menneu/modules';
import getContentType   from './lib/mime';
import Backend          from './lib/backend';
import fs    from 'fs';
import util  from 'util';
import path  from 'path';
import url   from 'url';
import child_process from 'child_process';
import carlo from 'carlo';

import * as rpc_ from 'carlo/rpc';
const rpc = (rpc_.default || rpc_).rpc;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const readdirAsync = util.promisify(fs.readdir);
const statAsync = util.promisify(fs.stat);



const isWebpack = typeof __webpack_require__ === 'function';
let thisFileName = '';
let thisDirName = '';
if (isWebpack) {
    thisFileName = __filename;
    thisDirName = __dirname;
} else {
    thisFileName = url.fileURLToPath(import.meta.url);
    thisDirName = path.dirname(thisFileName);
}


const curDir = process.cwd();
let lastSrcDir = path.join(curDir, 'contents');


if (process.argv[2] === '--app-version') {
    const c = fs.readFileSync(path.join(thisDirName, 'package.json'));
    const o = JSON.parse(c);

    // eslint-disable-next-line no-console
    console.log(`${o.name} ${o.version}`);
    process.exit(0);
}


function getDesktopPath() {
    return path.join(process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'], 'Desktop');
}


async function main() {
    // Launch the browser.
    try {
        let startupFile = process.argv[2];

        HtmlRenderer.launchOptions = {
            executablePath: (await findChrome({})).executablePath,
        };

        const app = await carlo.launch({
            // args: ['--auto-open-devtools-for-tabs']
            paramsForReuse: {
                pid: process.pid,
                startupFile: startupFile ? Base64.encode(TextEncoding.encodeToUtf8(startupFile)) : startupFile,
            },
        });

        // Terminate Node.js process on app window closing.
        app.on('exit', () => process.exit());
        app.on('window', (win) => {
            const x = win.paramsForReuse();
            if (x && typeof x.pid === 'number' && process.pid !== x.pid) {
                // TODO: This has concurrency issue.
                startupFile = x.startupFile ?
                    // eslint-disable-next-line no-control-regex
                    TextEncoding.decodeUtf8(Base64.decode(x.startupFile)) :
                    x.startupFile;
                win.load('index.html', rpc.handle(new Backend));
            }
        });

        // Tell carlo where your web files are located.
        app.serveFolder(path.join(thisDirName, 'contents'));
        app.serveHandler(async (request) => {
            const reqUrl = request.url();
            if (reqUrl === 'https://domain/out/preview.pdf') {
                const x = await readFileAsync(path.join(thisDirName, 'contents/out/preview.pdf'));
                request.fulfill({
                    body: x,
                    status: 200,
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'inline; filename="preview.pdf"',
                    },
                });
            } else if (reqUrl === 'https://domain/out/preview.html') {
                const x = await readFileAsync(path.join(thisDirName, 'contents/out/preview.html'));
                request.fulfill({
                    body: x,
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                        // 'Content-Security-Policy': "navigate-to 'self'",
                    },
                });
            } else if (reqUrl.startsWith('https://domain/out/')) {
                // TODO: This has concurrency issue.
                const p = path.join(lastSrcDir, decodeURIComponent(reqUrl).replace('https://domain/out/', ''));
                const x = await readFileAsync(p);
                request.fulfill({
                    body: x,
                    status: 200,
                    headers: {
                        'Content-Type': getContentType(p),
                        // 'Content-Security-Policy': "navigate-to 'self'",
                    },
                });
            } else {
                request.continue();  // <-- user needs to resolve each request, otherwise it'll time out.
            }
        });

        await app.exposeFunction('renderByMenneu', async (source, data, options, srcPath, ...exportPath) => {
            if (srcPath === null || srcPath === void 0) {
                srcPath = path.join(getDesktopPath(), 'H8f5iZPgOwtZoIN4');
            }
            const srcDir = path.dirname(srcPath);
            const srcBaseName = path.basename(srcPath).slice(0, -(path.extname(srcPath).length));

            let cf = null;
            if (! cf) {
                const fileName = path.join(srcDir, srcBaseName + '.config.json');
                if (fs.existsSync(fileName)) {
                    const s = await readFileAsync(fileName, { encoding: 'utf8' });
                    cf = JSON.parse(s);
                }
            }
            if (! cf) {
                const fileName = path.join(srcDir, srcBaseName + '.config.js');
                if (fs.existsSync(fileName)) {
                    cf = requireDynamic(fileName);
                    if (typeof cf === 'function') {
                        cf = cf(getAppEnv());
                    }
                }
            }
            if (! cf) {
                const fileName = path.join(srcDir, 'menneu.config.json');
                if (fs.existsSync(fileName)) {
                    const s = await readFileAsync(fileName, { encoding: 'utf8' });
                    cf = JSON.parse(s);
                }
            }
            if (! cf) {
                const fileName = path.join(srcDir, 'menneu.config.js');
                if (fs.existsSync(fileName)) {
                    cf = requireDynamic(fileName);
                    if (typeof cf === 'function') {
                        cf = cf(getAppEnv());
                    }
                }
            }
            cf = Object.assign({}, cf || {});

            let d = data;
            if (! d) {
                const fileName = path.join(srcDir, srcBaseName + '.data.lisp');
                if (fs.existsSync(fileName)) {
                    d = await readFileAsync(fileName, { encoding: 'utf8' });
                    cf.dataFormat = 'lisp';
                }
            }
            if (! d) {
                const fileName = path.join(srcDir, srcBaseName + '.data.json');
                if (fs.existsSync(fileName)) {
                    d = await readFileAsync(fileName, { encoding: 'utf8' });
                    cf.dataFormat = 'json';
                }
            }

            cf.tempDir = srcDir;
            let buf = null;
            try {
                // TODO: This has concurrency issue.
                process.chdir(srcDir);
                lastSrcDir = srcDir;
                buf = await render(source, d || {}, Object.assign(options, cf));
            } finally {
                process.chdir(curDir);
            }

            const outPath = exportPath.length === 0 ?
                path.normalize(path.join(thisDirName, './contents/out/preview.' + options.outputFormat)) :
                path.normalize(path.join(...exportPath));
            await writeFileAsync(outPath, buf);

            return options.outputFormat.toLowerCase() === 'pdf' ?
                'embed.html' :
                'out/preview.' + options.outputFormat;
        });

        await app.exposeFunction('loadFile', (...filePath) => {
            if (typeof filePath[0] !== 'string') {
                throw new Error('File name is not specified');
            }
            return readFileAsync(path.normalize(path.join(...filePath)), { encoding: 'utf8' });
        });

        await app.exposeFunction('saveFile', async (text, ...filePath) => {
            if (typeof filePath[0] !== 'string') {
                throw new Error('File name is not specified');
            }
            const p = path.normalize(path.join(...filePath));
            await writeFileAsync(p, text, { encoding: 'utf8' });
            return {
                path: p,
                name: path.basename(p),
            };
        });

        const listDirectory = async (dir) => {
            if (typeof dir !== 'string') {
                throw new Error('directory name is not specified');
            }
            let stat = null;
            try {
                stat = await statAsync(dir);
            } catch (e) {
                // retry once
                dir = path.dirname(dir);
                stat = await statAsync(dir);
            }
            if (stat.isDirectory()) {
                const files = await readdirAsync(dir);
                const fileInfos = [];
                for (const f of files) {
                    let isDir = false;
                    let succeeded = false;
                    try {
                        const s = await statAsync(path.join(dir, f));
                        isDir = s.isDirectory();
                        succeeded = true;
                    // eslint-disable-next-line no-empty
                    } catch (e) {}
                    if (succeeded) {
                        fileInfos.push({
                            name: f,
                            path: path.join(dir, f),
                            isDirectory: isDir,
                        });
                    }
                }
                fileInfos.sort((a, b) => {
                    if (a.isDirectory && !b.isDirectory) {
                        return -1;
                    }
                    if (!a.isDirectory && b.isDirectory) {
                        return 1;
                    }
                    return a.name.localeCompare(b.name);
                });
                fileInfos.unshift({
                    name: '..',
                    isDirectory: true,
                });
                return {
                    directory: dir,
                    files: fileInfos,
                };
            } else {
                return await listDirectory(path.dirname(dir));
            }
        };

        await app.exposeFunction('listDirectory', async (...dirPath) => {
            return await listDirectory(path.normalize(path.join(...dirPath)));
        });

        await app.exposeFunction('listDesktopDirectory', async () => {
            return await listDirectory(getDesktopPath());
        });

        await app.exposeFunction('listHomeDirectory', async () => {
            return await listDirectory(
                process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']);
        });

        await app.exposeFunction('fileExists', (...filePath) => {
            if (typeof filePath[0] !== 'string') {
                throw new Error('File name is not specified');
            }
            return fs.existsSync(path.normalize(path.join(...filePath)));
        });

        await app.exposeFunction('pathJoin', (...filePath) => {
            if (typeof filePath[0] !== 'string') {
                throw new Error('File name is not specified');
            }
            return path.normalize(path.join(...filePath));
        });

        await app.exposeFunction('getDirName', (filePath) => {
            if (typeof filePath !== 'string') {
                throw new Error('File name is not specified');
            }
            return path.dirname(filePath);
        });

        await app.exposeFunction('getBaseName', (filePath) => {
            if (typeof filePath !== 'string') {
                throw new Error('File name is not specified');
            }
            return path.basename(filePath);
        });

        await app.exposeFunction('getStartupFile', async () => {
            if (startupFile) {
                const p = path.resolve(startupFile);
                startupFile = void 0;
                const text = await readFileAsync(p, { encoding: 'utf8' });
                return {
                    path: p,
                    text,
                };
            } else {
                return void 0;
            }
        });

        await app.exposeFunction('openURL', async (url) => {
            if (url.match(/^https?:\/\//)) {
                const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
                const child = child_process.exec(start + ' ' + url);
                child.unref();
            }
            return true;
        });

        // Navigate to the main page of your app.
        await app.load('index.html', rpc.handle(new Backend));
        const bounds = await (await app.mainWindow()).bounds();

        await app.exposeFunction('openNewWindow', async () => {
            const win = await app.createWindow({
                width: bounds.width, height: bounds.height,
            });
            win.load('index.html', rpc.handle(new Backend));
            return true;
        });

        app.setIcon(path.join(thisDirName, 'contents', 'favicon.png'));
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        process.exit();
    }
}

export default main;
