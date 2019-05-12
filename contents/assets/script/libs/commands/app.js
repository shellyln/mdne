// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState          from '../appstate.js';
import { isPreviewable } from '../modes.js';
import { backend }       from '../remote.js';



export function getSuggests() {
    return {
        'new-window': null,
        'open': null,
        'open "path/to/file/opening"': null,
        'save': null,
        'saveas': null,
        'saveas "path/to/file/to/save/as"': null,
        'export': null,
        'export "path/to/file/to/export"': null,
        'preview': null,
        'sync on': null,
        'sync off': null,
        'preview-format pdf': null,
        'preview-format html': null,
        'scripting on': null,
        'scripting off': null,
        'entire-text': null,
        'selected-text': null,
        'insert "text"': null,
        '$resolve-pipe ($> ls -al) (<- insert) (-> () nil)': null,
        '$> some-shell-cmd cmd-options': null,
        'help': null,
        'help topic-name': null,
    };
}


export function getOperators({app}) {
    return ([
        {
            name: 'new-window',
            fn: (state, name) => (...args) => {
                openNewWindow();
                return '';
            },
        }, {
            name: 'open',
            fn: (state, name) => async (filePath) => {
                if (filePath) {
                    const dirName = AppState.filePath ? await getDirName(AppState.filePath) : null;
                    const fullPath = await pathJoin(dirName, filePath);
                    const text = await loadFile(fullPath);
                    app.refs.fileDropDialog.openFile(fullPath, text);

                    app.afterFileOpen();
                    return '';
                } else {
                    app.handleFileOpenClick({});
                    return '';
                }
            },
        }, {
            name: 'save',
            fn: (state, name) => (...args) => {
                app.handleSaveClick({});
                return 'Saving...';
            },
        }, {
            name: 'saveas',
            fn: (state, name) => async (filePath) => {
                if (filePath) {
                    const dirName = AppState.filePath ? await getDirName(AppState.filePath) : null;
                    await app.fileSaveAs(dirName, filePath);
                    return 'Saved.';
                } else {
                    app.handleSaveAsClick({});
                    return '';
                }
            },
        }, {
            name: 'export',
            fn: (state, name) => async (filePath) => {
                if (! isPreviewable(AppState.inputFormat)) {
                    throw new Error(`Exporting of ${AppState.inputFormat} format is not supported.`);
                }
                if (filePath) {
                    const dirName = AppState.filePath ? await getDirName(AppState.filePath) : null;
                    await app.fileExport(dirName, filePath);
                    return 'Exported.';
                } else {
                    app.handleExportClick({});
                    return '';
                }
            },
        }, {
            name: 'preview',
            fn: (state, name) => (...args) => {
                app.handleShowClick({});
                return '';
            },
        }, {
            name: 'sync',
            fn: (state, name) => (onoff) => {
                app.setState({syncPreview: onoff === 'on' || onoff === true});
                return '';
            },
        }, {
            name: 'preview-format',
            fn: (state, name) => (format) => {
                app.setState({isPdf: format === 'pdf'});
                return '';
            },
        }, {
            name: 'scripting',
            fn: (state, name) => (onoff) => {
                app.setState({useScripting: onoff === 'on' || onoff === true});
                return '';
            },
        }, {
            name: 'entire-text',
            fn: (state, name) => (text) => {
                return app.getEntireText(text);
            },
        }, {
            name: 'selected-text',
            fn: (state, name) => (text) => {
                return app.getSelectedText(text);
            },
        }, {
            name: 'insert',
            fn: (state, name) => (text) => {
                return app.insertText(text);
            },
        }, {
            name: '$>',
            fn: (state, name) => (...commands) => {
                return backend().runCommandAST([[{'symbol': '$>'}, commands.join(' ')]]);
            },
        }, {
            name: 'help',
            fn: (state, name) => (topic) => {
                openURL('https://github.com/shellyln/mdne');
                return '';
            },
        }
    ]);
}
