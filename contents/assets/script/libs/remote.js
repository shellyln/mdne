// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import commandRunner from './cmdrunner.js';



class Frontend {
    runCommand(command) {
        return commandRunner(command);
    }
}


export const frontend_ = new Frontend;
let backend_ = null;


export async function initBackend() {
    if (backend_) {
        return backend_;
    }
    backend_ = (await carlo.loadParams())[0];
    await backend_.setFrontend(rpc.handle(frontend_));
}


export function frontend() {
    return frontend_;
}


export function backend() {
    return backend_;
}
