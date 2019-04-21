// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export function getInputFormat(path) {
    switch (path.lastIndexOf('.') >= 0 ?
        path.toLowerCase().slice(path.lastIndexOf('.')) : '') {
    case '.md': case '.markdown':
        return 'md';
    case '.css':
        return 'css';
    case '.less':
        return 'less';
    case '.sass':
        return 'sass';
    case '.scss':
        return 'scss';
    case '.html': case '.htm':
        return 'html';
    case '.lisp': case '.lsx':
        return 'lisp';
    case '.json':
        return 'json';
    case '.js': case '.mjs': case '.cjs':
        return 'js';
    case '.ts':
        return 'ts';
    case '.jsx': case '.tsx':
        return 'tsx';
    case '.svg':
        return 'svg';
    case '.xml':
        return 'xml';
    case '.sh':
        return 'sh';
    case '.yaml': case '.yml':
        return 'yaml';
    case '.proto': case '.proto2': case '.proto3':
        return 'protobuf';
    case '.sql':
        return 'sql';
    case '.graphql': case '.gql':
        return 'graphql';
    case '.cs':
        return 'csharp';
    case '.py':
        return 'python';
    default:
        return 'text';
    }
}


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


export function getAceEditorMode(inputFormat) {
    switch (inputFormat) {
    case 'md':
        return 'ace/mode/markdown';
    case 'css':
        return 'ace/mode/css';
    case 'less':
        return 'ace/mode/less';
    case 'sass':
        return 'ace/mode/sass';
    case 'scss':
        return 'ace/mode/scss';
    case 'html':
        return 'ace/mode/html';
    case 'lisp':
        return 'ace/mode/lisp';
    case 'json':
        return 'ace/mode/json';
    case 'js':
        return 'ace/mode/javascript';
    case 'ts':
        return 'ace/mode/typescript';
    case 'tsx':
        return 'ace/mode/tsx';
    case 'svg':
        return 'ace/mode/svg';
    case 'xml':
        return 'ace/mode/xml';
    case 'sh':
        return 'ace/mode/sh';
    case 'yaml':
        return 'ace/mode/yaml';
    case 'protobuf':
        return 'ace/mode/protobuf';
    case 'sql':
        return 'ace/mode/sql';
    case 'graphql':
        return 'ace/mode/graphqlshema';
    case 'csharp':
        return 'ace/mode/csharp';
    case 'python':
        return 'ace/mode/python';
    case 'text':
        return 'ace/mode/text';
    default:
        return void 0;
    }
}
