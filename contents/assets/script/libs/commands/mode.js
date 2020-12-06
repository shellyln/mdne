// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState,
       { updateAppIndicatorBar } from '../appstate.js';
import { getAceEditorMode }      from '../modes.js';



/**
 * @return {string}
 */
export function getSuggests() {
    return {
        'mode md': null,
        'mode html': null,
        'mode lisp': null,
        'mode tex': null,
        'mode latex': null,
        'mode css': null,
        'mode less': null,
        'mode sass': null,
        'mode scss': null,
        'mode json': null,
        'mode json5': null,
        'mode js': null,
        'mode jsx': null,
        'mode ts': null,
        'mode tsx': null,
        'mode svg': null,
        'mode xml': null,
        'mode yaml': null,
        'mode graphql': null,
        'mode protobuf': null,
        'mode sql': null,
        'mode csharp': null,
        'mode golang': null,
        'mode ruby': null,
        'mode rust': null,
        'mode python': null,
        'mode r': null,
        'mode sh': null,
        'mode dockerfile': null,
        'mode makefile': null,
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

                    updateAppIndicatorBar();
                    AppState.invalidate();

                    return '';
                } else {
                    throw new Error('Invalid editor mode name: ' + modeName);
                }
            },
        }
    ]);
}
