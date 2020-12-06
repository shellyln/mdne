// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { initBackend } from './libs/remote.js';
import lsx_            from './libs/lsx.js';



window.lsx = lsx_;


(async () => {
    await initBackend();
    ReactDOM.render(lsx`(App)`, document.getElementById('app'));
})();
