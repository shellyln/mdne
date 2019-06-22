// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import * as liyad    from 'liyad/modules';
import child_process from 'child_process';



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
                child_process.exec(command.join(' '), {encoding: 'utf8'}, (err, stdout) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }
                });
            });
        },
    }];
    config.funcs = (config.funcs || []).concat(operators);
    // config.macros = (config.macros || []).concat(macros);
    // config.symbols = (config.symbols || []).concat(symbols);
    return config;
});

export default LM_async_;
