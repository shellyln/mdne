
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');



const blacklist = [
    /^\.\/sw\//,
    /^\.\/icons\//,
    /^\.\/out\//,
    /^\.\/desktop-carlo\.html/,
    /^\.\/manifest\.json/,
    /^\.\/favicon\./,
];


function makePrecacheEntries(srcDir, options) {
    const opts = Object.assign({}, {
    }, options || {});

    if (fs.lstatSync(srcDir).isDirectory()) {
        const files = fs.readdirSync(srcDir);
        FILE_ENT: for (const entry of files) {
            const srcEntryPath = path.join(srcDir, entry);
            if (fs.lstatSync(srcEntryPath).isDirectory()) {
                makePrecacheEntries(srcEntryPath, options);
            } else {
                const entryUrl = srcEntryPath.replace(/\\/g, '/').replace(options.baseDir, '..');
                for (const pat of blacklist) {
                    if (entryUrl.match(pat)) {
                        continue FILE_ENT;
                    }
                }
                const s = fs.readFileSync(srcEntryPath, {encoding: 'utf8'});
                const hash = crypto.createHash('sha256');
                hash.update(s);
                options.entries.push({
                    revision: hash.digest('hex'),
                    url: entryUrl,
                });
            }
        }
    }
    return opts;
}


const v = makePrecacheEntries('./contents', {
    baseDir: 'contents',
    entries: [],
});

const precacheManifest = `
/* eslint-disable no-undef */
self.__precacheManifest = (self.__precacheManifest || []).concat(${
    JSON.stringify(v.entries, null, 2)
});
`;
const precacheManifestHash = (() => {
    const hash = crypto.createHash('md5');
    hash.update(precacheManifest);
    return hash.digest('hex');
})();

// eslint-disable-next-line no-console
console.log(precacheManifest);

fs.writeFileSync(
    `./contents/sw/precache-manifest.${precacheManifestHash}.js`,
    precacheManifest, {encoding: 'utf8'});
