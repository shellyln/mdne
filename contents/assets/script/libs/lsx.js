// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AceEditor       from '../components/aceeditor.js';
import FileDropDialog  from '../components/filedropdialog.js';
import FileOpenDialog  from '../components/fileopendialog.js';
import FileSaveDialog  from '../components/filesavedialog.js';
import SettingsDialog  from '../components/settingsdialog.js';
import { MenuItem,
         MenuDivider,
         Switch }      from '../components/ui.js';
import App             from '../components/app.js';



const lsx_ = liyad.LSX({
    jsx: React.createElement,
    jsxFlagment: React.Fragment,
    components: {
        AceEditor,
        FileDropDialog,
        FileOpenDialog,
        FileSaveDialog,
        SettingsDialog,
        MenuItem,
        MenuDivider,
        Switch,
        App,
    },
});

export default lsx_;
