// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



const isWebpack = typeof __webpack_require__ === 'function';

if (!isWebpack) {
    const fs = require('fs');

    require.extensions['.css'] = function (module, filename) {
        module.exports = fs.readFileSync(filename, 'utf8');
    };
}
