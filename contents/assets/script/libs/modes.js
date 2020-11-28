// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



/**
 * @param {string} path
 * @return {string}
 */
export function getInputFormat(path) {
    switch (path.lastIndexOf('.') >= 0 ?
        path.toLowerCase().slice(path.lastIndexOf('.')) : '') {
    case '.md': case '.markdown':
        return 'md';
    case '.html': case '.htm':
        return 'html';
    case '.lisp': case '.lsx':
        return 'lisp';
    case '.tex':
        return 'tex';
    case '.latex':
        return 'latex';
    case '.css':
        return 'css';
    case '.less':
        return 'less';
    case '.sass':
        return 'sass';
    case '.scss':
        return 'scss';
    case '.json':
        return 'json';
    case '.json5':
        return 'json5';
    case '.js': case '.mjs': case '.cjs':
        return 'js';
    case '.jsx':
        return 'jsx';
    case '.ts':
        return 'ts';
    case '.tsx':
        return 'tsx';
    case '.svg':
        return 'svg';
    case '.xml':
        return 'xml';
    case '.yaml': case '.yml':
        return 'yaml';
    case '.graphql': case '.gql':
        return 'graphql';
    case '.proto': case '.proto2': case '.proto3':
        return 'protobuf';
    case '.sql':
        return 'sql';
    case '.cs':
        return 'csharp';
    case '.go':
        return 'golang';
    case '.rb':
        return 'ruby';
    case '.rs':
        return 'rust';
    case '.py':
        return 'python';
    case '.r':
        return 'r';
    case '.sh':
        return 'sh';
    case '.dockerfile':
        return 'dockerfile';
    case '.makefile':
        return 'makefile';
    default:
        if (path.toLowerCase().endsWith('dockerfile')) {
            return 'dockerfile';
        }
        if (path.toLowerCase().endsWith('makefile')) {
            return 'makefile';
        }
        return 'text';
    }
}


/**
 * @param {string} inputFormat
 * @return {boolean}
 */
export function isPreviewable(inputFormat) {
    switch (inputFormat) {
    case 'md':
        return true;
    case 'html':
        return true;
    case 'lisp':
        return true;
    default:
        return false;
    }
}


/**
 * @param {string} inputFormat
 * @return {string | undefined}
 */
export function getAceEditorMode(inputFormat) {
    switch (inputFormat) {
    case 'md':
        return 'ace/mode/markdown';
    case 'html':
        return 'ace/mode/html';
    case 'lisp':
        return 'ace/mode/lisp';
    case 'tex':
        return 'ace/mode/tex';
    case 'latex':
        return 'ace/mode/latex';
    case 'css':
        return 'ace/mode/css';
    case 'less':
        return 'ace/mode/less';
    case 'sass':
        return 'ace/mode/sass';
    case 'scss':
        return 'ace/mode/scss';
    case 'json':
        return 'ace/mode/json';
    case 'json5':
        return 'ace/mode/json5';
    case 'js':
        return 'ace/mode/javascript';
    case 'jsx':
        return 'ace/mode/jsx';
    case 'ts':
        return 'ace/mode/typescript';
    case 'tsx':
        return 'ace/mode/tsx';
    case 'svg':
        return 'ace/mode/svg';
    case 'xml':
        return 'ace/mode/xml';
    case 'yaml':
        return 'ace/mode/yaml';
    case 'graphql':
        return 'ace/mode/graphqlshema';
    case 'protobuf':
        return 'ace/mode/protobuf';
    case 'sql':
        return 'ace/mode/sql';
    case 'csharp':
        return 'ace/mode/csharp';
    case 'golang':
        return 'ace/mode/golang';
    case 'ruby':
        return 'ace/mode/ruby';
    case 'rust':
        return 'ace/mode/rust';
    case 'python':
        return 'ace/mode/python';
    case 'r':
        return 'ace/mode/r';
    case 'sh':
        return 'ace/mode/sh';
    case 'dockerfile':
        return 'ace/mode/dockerfile';
    case 'makefile':
        return 'ace/mode/makefile';
    case 'text':
        return 'ace/mode/text';
    default:
        return void 0;
    }
}
