// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState from '../libs/appstate.js';



export default class AceEditor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.editor = null;
    }

    componentDidMount() {
        this.editor = ace.edit(this.props.id);
        this.editor.setFontSize(this.props.fontSize);
        this.editor.setTheme('ace/theme/monokai');
        this.editor.session.setMode('ace/mode/markdown');
        this.editor.commands.addCommand({
            name: 'save',
            bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
            exec: async (editor) => {
                if (AppState.filePath) {
                    try {
                        await saveFile(editor.getValue(), AppState.filePath);
                        editor.session.getUndoManager().markClean();
                        AppState.fileChanged = false;
                        document.title = `${AppState.AppName} - ${AppState.filePath}`;
                    } catch (e) {
                        alert(e);
                    }
                } else {
                    this.props.onSaveAs({});
                }
            }
        })

        this.editor.on('change', (o) => {
            if (this.props.onChange) {
                this.props.onChange(o);
            }
        });
        this.editor.session.on('changeScrollTop', (y) => {
            if (this.props.onChangeScrollTop) {
                this.props.onChangeScrollTop(y, this.editor.session.getScreenLength() * this.editor.renderer.lineHeight);
            }
        });
        this.editor.session.on('changeScrollLeft', (x) => {
            if (this.props.onChangeScrollLeft) {
                this.props.onChangeScrollLeft(x);
            }
        });

        AppState.AceEditor = AppState.AceEditor || {};
        AppState.AceEditor[this.props.id] = this.editor;
    }

    render() {
        return (lsx`
        (div (@ (ref "outerWrap")
                (className
                    ($concat "AceEditorOuterWrap"
                             ${this.props.stretched ? " stretched" : ""}
                             ${this.props.collapsed ? " collapsed" : ""} )))
            (div (@ (id ${this.props.id})
                    (className "AceEditorDiv") )))`
        );
    }
}
