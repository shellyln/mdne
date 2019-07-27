// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState        from './libs/appstate.js';
import { initBackend } from './libs/remote.js';
import lsx_            from './libs/lsx.js';



window.lsx = lsx_;


// NOTE: it is for electron environment.
window.notifyEditorDirty = (dirty) => {
    AppState.fileChanged = dirty;
    if (window.nativeNotifyEditorDirty) {
        nativeNotifyEditorDirty(dirty);
    }
}


// NOTE: it is for electron environment.
window.alertWrap = async (message) => {
    if (window.nativeAlert) {
        await nativeAlert(String(message));
    } else {
        alert(message);
    }
}


// NOTE: it is for electron environment.
window.confirmWrap = async (message) => {
    if (window.nativeConfirm) {
        return await nativeConfirm(String(message));
    } else {
        return confirm(message);
    }
}


(async () => {
    await initBackend();
    ReactDOM.render(lsx`(App)`, document.getElementById('app'));
})();
