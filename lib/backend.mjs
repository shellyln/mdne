// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import commandRunner from './cmdrunner';



export default class Backend {
    setFrontend(frontend) {
        // Node world can now use frontend RPC handle.
        this.frontend_ = frontend;
        (async () => {
            // console.log('command runner result:' + await this.frontend_.runCommand('(+ 1 2 3)'));
            // console.log('script result:' + await commandRunner('(+ 11 22 33)'));
        })();
    }

    runCommand(command) {
        return commandRunner(command);
    }

    runCommandAST(ast) {
        return commandRunner.evaluateAST(ast);
    }
}
