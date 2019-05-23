// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



const start = (async (text, cf, data, srcPath, ...exportPath) => {
    return await renderByMenneu(text, data, Object.assign({
        inputFormat: 'md',
        dataFormat: 'object',
    }, cf || {}), srcPath, ...exportPath);
});

export default start;
