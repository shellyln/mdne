// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



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


LM_async_.setGlobals({});

export default LM_async_;
