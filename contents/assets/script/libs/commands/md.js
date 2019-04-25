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
        'md italic-alt': null,
        'md bold': null,
        'md bold-alt': null,
        'md strikethru': null,
        'md mark': null,
        'md ins': null,
        'md footnote': null,
        'md inline-footnote': null,
        'md deflist': null,
        'md lazy-deflist': null,
        'md abbr': null,
        'md pagebreak': null,
        'md h1': null,
        'md h1-no-toc': null,
        'md h2': null,
        'md h2-no-toc': null,
        'md h3': null,
        'md h4': null,
        'md h5': null,
        'md h6': null,
        'md style': null,
        'md comment': null,
        'md char-entity-ref': null,
        'md escape': null,
        'md embedded-image': null,
        'md embedded-uml': null,
        'md embedded-style': null,
        'md svg': null,
        'md canvas': null,
        'md qr': null,
        'md code128': null,
        'md code39': null,
        'md gtin13': null,
        'md gtin8': null,
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
                            '\n![alt text](https://shellyln.github.io/assets/image/mdne-logo.svg "Logo" =300x100)\n');
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
                        editor.session.insert(editor.getCursorPosition(),
                            ' :wink: :crush: :cry: :tear: :laughing: :yum: ');
                    }
                    return '';
                case 'italic':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' *This is italic* ');
                    }
                    return '';
                case 'italic-alt':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' _This is italic_ ');
                    }
                    return '';
                case 'bold':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' **This is bold** ');
                    }
                    return '';
                case 'bold-alt':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' __This is bold__ ');
                    }
                    return '';
                case 'strikethrough': case 'strikethru':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' ~~This is strikethrough~~ ');
                    }
                    return '';
                case 'mark':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' ==This is mark== ');
                    }
                    return '';
                case 'ins':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), ' ++This is ins++ ');
                    }
                    return '';
                case 'footnote':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\nThis is footnote 1 link[^first].\n[^first]: Footnote text.\n');
                    }
                    return '';
                case 'inline-footnote':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\nThis is inline footnote^[Text of inline footnote.].\n');
                    }
                    return '';
                case 'deflist':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\nTerm 1\n    ~ Definition 1a\n    ~ Definition 1b\n');
                    }
                    return '';
                case 'lazy-deflist':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\nTerm 1\n:   Definition 1a\nwith lazy continuation.\n\n' +
                            '    paragraph 1\n\n        { code block }\n    paragraph 3\n' +
                            ':   Definition 1b\n\n');
                    }
                    return '';
                case 'abbr':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\nThis is HTML abbreviation example.\n*[HTML]: Hyper Text Markup Language\n');
                    }
                    return '';
                case 'pagebreak':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n<div style="page-break-before:always"></div>\n');
                    }
                    return '';
                case 'h1':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n# This is a header.\n');
                    }
                    return '';
                case 'h1-no-toc':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n<p style="font-size: 2em; font-weight: bold; ' +
                            'border-bottom: 1px solid #eaecef; padding-bottom: .3em;">' +
                            'This is a header.</p>\n');
                    }
                    return '';
                case 'h2':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n## This is a header.\n');
                    }
                    return '';
                case 'h2-no-toc':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n<p style="font-size: 1.5em; font-weight: bold; ' +
                            'border-bottom: 1px solid #eaecef; padding-bottom: .3em;">' +
                            'This is a header.</p>\n');
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
                case 'style':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n<style>h4 { background-color: cyan; }</style>\n');
                    }
                    return '';
                case 'comment':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(), '\n<!-- This is a comment. -->\n');
                    }
                    return '';
                case 'char-entity-ref':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n&amp;&lt;&gt;&quot;&apos;&nbsp;\n' +
                            '&sup3;&frac34;&plusmn;&times;&divide;&para;&sect;&middot;&laquo;&raquo;\n' +
                            '&copy;&reg;&trade;&yen;&euro;$&curren;&pound;&cent;\n');
                    }
                    return '';
                case 'escape':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n\\\\<style>h5 { background-color: cyan; }\\\\</style>\n');
                    }
                    return '';
                case 'embedded-image':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n%%%(Image(@(src"https://shellyln.github.io/assets/image/mdne-logo.svg")(width 300)(height 100)(unit "px")(alt "Logo")))\n');
                    }
                    return '';
                case 'embedded-uml':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n%%%(PlantUml """\n' +
                            'Alice -> Bob: Authentication Request\n' +
                            'Bob --> Alice: Authentication Response\n\n' +
                            'Alice -> Bob: Another authentication Request\n' +
                            'Alice <-- Bob: Another authentication Response\n' +
                            '""")\n');
                    }
                    return '';
                case 'embedded-style':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n%%%(Style(@(src"https://shellyln.github.io/menneu/assets/style/playground.css")))\n');
                    }
                    return '';
                case 'svg':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n%%%(Svg (@ (width 100)(height 100)(unit "mm"))\n\n)\n');
                    }
                    return '';
                case 'canvas':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n' +
                            '(Canvas (-> (ctx) (::ctx@moveTo  10  10)\n' +
                            '                  (::ctx@lineTo 190 190)\n' +
                            '                  (::ctx:strokeStyle="rgba(255,128,0,0.2)")\n' +
                            '                  (::ctx@stroke)\n' +
                            '                  (::ctx@beginPath) ))\n');
                    }
                    return '';
                case 'qr':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                        '\n(Qr (@ (x 5)(y 7)(cellSize 0.8)(fill)(fillColor "darkblue")(data "Hello")))\n');
                    }
                    return '';
                case 'code128':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n' +
                            '(Code128 (@ (x 5)(y 7)(elementWidth 0.66)(height 15)(quietHeight 0)(textHeight 7)\n' +
                            '            (font "7px \'OCRB\'")(fill)(fillColor "darkblue")(data "Hello") ))\n');
                    }
                    return '';
                case 'code39':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n' +
                            '(Code39 (@ (x 5)(y 7)(narrowWidth 0.66)(wideWidth 1.32)(height 15)(quietHeight 0)(textHeight 7)\n' +
                            '           (font "7px \'OCRB\'")(fill)(fillColor "darkblue")(data "HELLO") ))\n');
                    }
                    return '';
                case 'gtin13':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n' +
                            '(Gtin13 (@ (x 5)(y 7)(elementWidth 0.66)(height 15)(quietHeight 0)(textHeight 7)\n' +
                            '           (font "7px \'OCRB\'")(fill)(fillColor "darkblue")(data "123456789012") ))\n');
                    }
                    return '';
                case 'gtin8':
                    {
                        const editor = AppState.AceEditor[getCurrentAceId()];
                        editor.session.insert(editor.getCursorPosition(),
                            '\n' +
                            '(Gtin8 (@ (x 5)(y 7)(elementWidth 0.66)(height 15)(quietHeight 0)(textHeight 7)\n' +
                            '          (font "7px \'OCRB\'")(fill)(fillColor "darkblue")(data "1234567") ))\n');
                    }
                    return '';
                default:
                    return '';
                }
            },
        }
    ]);
}
