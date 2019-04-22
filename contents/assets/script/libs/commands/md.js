// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState from '../appstate.js';



export function getSuggests() {
    return {
        'md table rows cols': null,
        'md list rows': null,
        'md o-list rows': null,
        'md checkbox rows': null,
        'md blockquote': null,
        'md link': null,
        'md image': null,
        'md toc': null,
        'md hr': null,
        'md math': null,
        'md inline-math': null,
        'md mathjax': null,
        'md code': null,
        'md inline-code': null,
        'md uml': null,
        'md emoji': null,
        'md italic': null,
        'md bold': null,
        'md strikethru': null,
        'md h1': null,
        'md h2': null,
        'md h3': null,
        'md h4': null,
        'md h5': null,
        'md h6': null,
    };
}


export function getOperators({getCurrentAceId}) {
    return ([
        {
            name: 'md',
            fn: (state, name) => (...args) => {
                switch (args[0]) {
                case 'table':
                    {
                        const rows = Math.max(1, Number(args[1] || 3));
                        const cols = Math.max(1, Number(args[2] || 3));
                        let s = `\n|${Array(cols).fill('').map((_, i) => `R_C${i}`).join('|')}|\n|${
                                    Array(cols).fill('').map((_, i) => '----'   ).join('|')}|\n`;
                        for (let r = 0; r < rows; r++) {
                            s += `|${Array(cols).fill('').map((_, i) => `R${r}C${i}`).join('|')}|\n`;
                        }
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), s);
                    }
                    return '';
                case 'list':
                    {
                        const rows = Math.max(1, Number(args[1] || 3));
                        let s = '\n';
                        for (let r = 0; r < rows; r++) {
                            s += `* item ${r}\n`;
                        }
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), s);
                    }
                    return '';
                case 'o-list':
                    {
                        const rows = Math.max(1, Number(args[1] || 3));
                        let s = '\n';
                        for (let r = 0; r < rows; r++) {
                            s += `1. item ${r}\n`;
                        }
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), s);
                    }
                    return '';
                case 'checkbox':
                    {
                        const rows = Math.max(1, Number(args[1] || 3));
                        let s = '\n';
                        for (let r = 0; r < rows; r++) {
                            s += `* [${r % 2 === 0 ? 'X' : ' '}] item ${r}\n`;
                        }
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), s);
                    }
                    return '';
                case 'blockquote': case 'quote':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n> This is blockquote.\n>> This is blockquote.\n');
                    }
                    return '';
                case 'link':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n[This is inline-style link with title](https://github.com/shellyln/mdne "mdne")\n');
                    }
                    return '';
                case 'image':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n![alt text](https://raw.githubusercontent.com/shellyln/mdne/master/contents/logo.svg?sanitize=true "Logo" =300x100)\n');
                    }
                    return '';
                case 'toc':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n[[TOC]]\n');
                    }
                    return '';
                case 'hr':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n----\n');
                    }
                    return '';
                case 'math':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n$$$\nsum_(i=1)^n i^3=((n(n+1))/2)^2\n$$$\n');
                    }
                    return '';
                case 'inline-math':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' $$sum_(i=1)^n i^3=((n(n+1))/2)^2$$ ');
                    }
                    return '';
                case 'mathjax':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"' +
                            ' crossorigin="anonymous"></script>\n');
                    }
                    return '';
                case 'code':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n```javascript\n\nconst x = 0;\n\n```\n');
                    }
                    return '';
                case 'inline-code':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' `const x = 0` ');
                    }
                    return '';
                case 'uml':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n@startuml\n' +
                            'Alice -> Bob: Authentication Request\n' +
                            'Bob --> Alice: Authentication Response\n\n' +
                            'Alice -> Bob: Another authentication Request\n' +
                            'Alice <-- Bob: Another authentication Response\n' +
                            '@enduml\n');
                    }
                    return '';
                case 'emoji':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' :wink: :crush: :cry: :tear: :laughing: :yum: ');
                    }
                    return '';
                case 'italic':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' *This is italic* ');
                    }
                    return '';
                case 'bold':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' **This is bold** ');
                    }
                    return '';
                case 'strikethrough': case 'strikethru':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' ~~This is strikethrough~~ ');
                    }
                    return '';
                case 'h1':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n# This is a header.\n');
                    }
                    return '';
                case 'h2':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n## This is a header.\n');
                    }
                    return '';
                case 'h3':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n### This is a header.\n');
                    }
                    return '';
                case 'h4':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n#### This is a header.\n');
                    }
                    return '';
                case 'h5':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n##### This is a header.\n');
                    }
                    return '';
                case 'h6':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n###### This is a header.\n');
                    }
                    return '';
                default:
                    return '';
                }
            },
        }
    ]);
}
