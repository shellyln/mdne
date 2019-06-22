// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState             from '../appstate.js';
import { getAceEditorMode } from '../modes.js';



export function getSuggests() {
    return {
        'mode md': null,
        'mode html': null,
        'mode css': null,
        'mode json': null,
        'mode lisp': null,
        'mode less': null,
        'mode sass': null,
        'mode scss': null,
        'mode js': null,
        'mode ts': null,
        'mode tsx': null,
        'mode svg': null,
        'mode xml': null,
        'mode yaml': null,
        'mode protobuf': null,
        'mode sql': null,
        'mode graphql': null,
        'mode csharp': null,
        'mode python': null,
        'mode text': null,
    };
}


export function getOperators({getCurrentAceId}) {
    return ([
        {
            name: 'mode',
            // eslint-disable-next-line no-unused-vars
            fn: (state, name) => (modeName) => {
                if (!modeName) {
                    throw new Error('Editor mode name is not specified.');
                }
                AppState.inputFormat = modeName;
                const aceMode = getAceEditorMode(modeName);
                if (aceMode) {
                    const editor = AppState.AceEditor[getCurrentAceId()];
                    editor.session.setMode(aceMode);
                    return '';
                } else {
                    throw new Error('Invalid editor mode name: ' + modeName);
                }
            },
        }
    ]);
}
