// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState             from '../libs/appstate.js';
import start                from '../libs/start.js';
import { getInputFormat,
         isPreviewable,
         getAceEditorMode } from '../libs/modes.js';
import { escapeHtml }       from '../libs/escape.js';
import commandRunner        from '../libs/cmdrunner.js';

import { getSuggests as getAppSuggests,
         getOperators as getAppOperators }  from '../libs/commands/app.js';
import { getSuggests as getModeSuggests,
         getOperators as getModeOperators } from '../libs/commands/mode.js';
import { getSuggests as getMdSuggests,
         getOperators as getMdOperators }   from '../libs/commands/md.js';



export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.state.stretched = true;
        this.state.syncPreview = false;
        this.state.isPdf = false;
        this.state.useScripting = false;
        this.state.currentAceId = 'editor';
        this.state.splitterMoving = false;

        this.aceFontSize = 14;
        this.scheduleRerenderPreview = false;
        this.savedEditorStyleWidth = null;
        this.savedPreviewScrollY = 0;

        window.onbeforeunload = (ev) => {
            // TODO: check all Ace editors
            const editor = AppState.AceEditor[this.state.currentAceId];
            const isClean = editor.session.getUndoManager().isClean();
            if (! isClean) {
                ev.preventDefault(); 
                return '';
            }
            return void 0;
        }

        commandRunner.install(config => {
            const getCurrentAceId = () => this.state.currentAceId;
            const operators = [
                ...getAppOperators({app: this}),
                ...getModeOperators({getCurrentAceId}),
                ...getMdOperators({getCurrentAceId}),
            ];
            config.funcs = (config.funcs || []).concat(operators);
            // config.macros = (config.macros || []).concat(macros);
            // config.symbols = (config.symbols || []).concat(symbols);
            return config;
        });
        // commandRunner.setGlobals({});
    }

    componentDidMount() {
        {
            const elems = document.querySelectorAll('.dropdown-trigger');
            const instances = M.Dropdown.init(elems, {
                constrainWidth: false,
            });
        }
        {
            const elems = document.querySelectorAll('.tooltipped');
            const instances = M.Tooltip.init(elems, {});
        }
        {
            const elems = document.querySelectorAll('select');
            const instances = M.FormSelect.init(elems, {});
        }
        {
            const elems = document.querySelectorAll('.command-box-input.autocomplete');
            const instances = M.Autocomplete.init(elems, {
                data: Object.assign(
                    getAppSuggests(),
                    getModeSuggests(),
                    getMdSuggests(),
                ),
            });
        }
        // eslint-disable-next-line no-undef
        if (window.dialogPolyfill) {
            // emulation
            const dialog = document.querySelector('dialog');
            // eslint-disable-next-line no-undef
            dialogPolyfill.registerDialog(dialog);
        }

        document.onkeyup = (ev) => {
            if (ev.ctrlKey && ev.shiftKey && ev.keyCode === 79) {
                // Ctrl+Shift+O
                this.refs.commandBox.focus();
            }
        };

        const setEditorNewFile = () => {
            AppState.inputFormat = 'md';
            AppState.fileChanged = false;

            document.title = `${AppState.AppName} - ${'(New file)'}`;

            const editor = AppState.AceEditor[this.state.currentAceId];
            editor.clearSelection();
            editor.session.setMode(getAceEditorMode(AppState.inputFormat));
            editor.setValue('');
            editor.clearSelection();
            editor.session.getUndoManager().markClean();
        };

        getStartupFile()
        .then(file => {
            if (file) {
                AppState.filePath = file.path;
                AppState.inputFormat = getInputFormat(AppState.filePath);
                AppState.fileChanged = false;
    
                document.title = `${AppState.AppName} - ${AppState.filePath}`;
    
                const editor = AppState.AceEditor[this.state.currentAceId];
                editor.clearSelection();
                editor.session.setMode(getAceEditorMode(AppState.inputFormat));
                editor.setValue(file.text);
                editor.clearSelection();
                editor.session.getUndoManager().markClean();
            } else {
                setEditorNewFile();
                this.openFileOpenDialog();
            }
        })
        .catch(e => {
            setEditorNewFile();
            this.openFileOpenDialog();
        });
    }

    afterFileOpen() {
        this.refs.root.contentWindow.location.replace('empty.html');

        this.setState({stretched: true});
        this.savedEditorStyleWidth = null;
        this.savedPreviewScrollY = 0;
        this.refs.editor.refs.outerWrap.style.width = null;
        this.refs.editorPlaceholder.style.width = null;

        document.activeElement.blur();
    }

    openFileOpenDialog() {
        this.refs.fileDropDialog.showModal({
            aceId: this.state.currentAceId,
            fileOpenDialog: this.refs.fileOpenDialog,
        }, () => this.afterFileOpen());
    }

    handleFileOpenClick(ev) {
        const editor = AppState.AceEditor[this.state.currentAceId];
        const isClean = editor.session.getUndoManager().isClean();
        if (! isClean) {
            if (! window.confirm('Changes you made may not be saved.\nAre you sure want to discard changes?')) {
                return;
            }
        }
        this.openFileOpenDialog();
    }

    handleStretchedClick(ev) {
        this.setState({stretched: !this.state.stretched});
        if (this.state.stretched) {
            // collapsed
            this.refs.editor.refs.outerWrap.style.width = this.savedEditorStyleWidth;
            this.refs.editorPlaceholder.style.width = this.savedEditorStyleWidth;
            setTimeout(() => this.refs.root.contentWindow.scrollTo(
                this.refs.root.contentWindow.scrollX,
                this.savedPreviewScrollY,
            ), 30);
        } else {
            // stretched
            try {
                this.savedEditorStyleWidth = this.refs.editor.refs.outerWrap.style.width;
                this.savedPreviewScrollY = this.refs.root.contentWindow.scrollY;
            } catch (e) {
                // emulation
            }
            this.refs.editor.refs.outerWrap.style.width = null;
            this.refs.editorPlaceholder.style.width = null;
        }
        document.activeElement.blur();
    }

    handleSyncPreviewClick(ev) {
        this.setState({syncPreview: !this.state.syncPreview});
        document.activeElement.blur();
    }

    handleIsPdfClick(ev) {
        this.setState({isPdf: !this.state.isPdf});
        document.activeElement.blur();
    }

    handleUseScriptingClick(ev) {
        this.setState({useScripting: !this.state.useScripting});
        document.activeElement.blur();
    }

    handleShowClick(ev) {
        if (this.state.stretched) {
            this.refs.editor.refs.outerWrap.style.width = this.savedEditorStyleWidth;
            this.refs.editorPlaceholder.style.width = this.savedEditorStyleWidth;
        }
        this.setState({stretched: false});
        const editor = AppState.AceEditor[this.state.currentAceId];

        if (! isPreviewable(AppState.inputFormat)) {
            console.error(`Preview of ${AppState.inputFormat} format is not supported.`);
            this.refs.root.contentWindow.location.replace('error.html');
        } else if (this.state.isPdf) {
            start(editor.getValue(), {
                inputFormat: AppState.inputFormat,
                outputFormat: 'pdf',
                rawInput:
                    (AppState.inputFormat !== 'md' &&
                     AppState.inputFormat !== 'html') ||
                        this.state.useScripting ? false : true,
            }, null, AppState.filePath)
            .then(outputUrl => {
                this.refs.root.contentWindow.location.replace(outputUrl);
            })
            .catch(async (e) => {
                console.error(e);
                this.refs.root.contentWindow.location.replace('error.html');
            });
        } else {
            start(editor.getValue(), {
                inputFormat: AppState.inputFormat,
                outputFormat: 'html',
                rawInput:
                    (AppState.inputFormat !== 'md' &&
                     AppState.inputFormat !== 'html') ||
                        this.state.useScripting ? false : true,
            }, null, AppState.filePath)
            .then(outputUrl => {
                this.refs.root.contentWindow.location.replace(outputUrl);
                setTimeout(() => this.refs.root.contentWindow.scrollTo(
                    this.refs.root.contentWindow.scrollX,
                    Math.min(
                        this.savedPreviewScrollY,
                        this.refs.root.contentWindow.document.documentElement.scrollHeight,
                    ),
                ), 30);
            })
            .catch(async (e) => {
                console.error(e);
                this.refs.root.contentWindow.location.replace('error.html');
            });
        }
        document.activeElement.blur();
    }

    handleSaveClick(ev) {
        if (AppState.filePath) {
            const editor = AppState.AceEditor[this.state.currentAceId];
            editor.execCommand('save');
        } else {
            this.handleSaveAsClick(ev);
        }
    }

    async fileSaveAs(currentDir, fileName) {
        const editor = AppState.AceEditor[this.state.currentAceId];

        const fileInfo = await saveFile(editor.getValue(), currentDir, fileName);
        AppState.filePath = fileInfo.path;
        AppState.inputFormat = getInputFormat(AppState.filePath);

        editor.session.getUndoManager().markClean();
        AppState.fileChanged = false;
        document.title = `${AppState.AppName} - ${AppState.filePath}`;
    }

    handleSaveAsClick(ev) {
        this.refs.fileSaveDialog.showModal({
            title: 'Save as',
            currentAceId: this.state.currentAceId,
            currentFilePath: AppState.filePath,
            forExport: false,
            fileTypes: [{
                value: 'md',
                text: 'Markdown (*.md, *.markdown)',
                exts: ['.md', '.markdown'],
            },{
                value: 'html',
                text: 'HTML (*.html, *.htm)',
                exts: ['.html', '.htm'],
            },{
                value: '*',
                text: 'All files (*.*)',
                exts: [],
            }],
        }, async (currentDir, fileName) => {
            try {
                await this.fileSaveAs(currentDir, fileName);
            } catch (e) {
                alert(e);
            }
        });
    }

    async fileExport(currentDir, fileName) {
        const editor = AppState.AceEditor[this.state.currentAceId];

        const ext = fileName.lastIndexOf('.') >= 0 ?
            fileName.toLowerCase().slice(fileName.lastIndexOf('.')) : '';
        await start(editor.getValue(), {
            inputFormat: AppState.inputFormat,
            outputFormat: ext === '.pdf' ? 'pdf' : 'html',
            rawInput:
                (AppState.inputFormat !== 'md' &&
                 AppState.inputFormat !== 'html') ||
                    this.state.useScripting ? false : true,
        }, null, AppState.filePath, currentDir, fileName);
    }

    getEntireText() {
        const editor = AppState.AceEditor[this.state.currentAceId];
        return editor.getValue();
    }

    getSelectedText() {
        const editor = AppState.AceEditor[this.state.currentAceId];
        return editor.getSelectedText();
    }

    insertText(text) {
        const editor = AppState.AceEditor[this.state.currentAceId];
        editor.session.insert(editor.getCursorPosition(), text);
        return text;
    }

    handleExportClick(ev) {
        if (! isPreviewable(AppState.inputFormat)) {
            alert(`Preview of ${AppState.inputFormat} format is not supported.`);
        } else {
            this.refs.fileSaveDialog.showModal({
                title: 'Export',
                currentAceId: this.state.currentAceId,
                currentFilePath: AppState.filePath,
                forExport: true,
                fileTypes: [{
                    value: 'pdf',
                    text: 'PDF (*.pdf)',
                    exts: ['.pdf'],
                },{
                    value: 'html',
                    text: 'HTML (*.html, *.htm)',
                    exts: ['.html', '.htm'],
                },{
                    value: '*',
                    text: 'All files (*.*)',
                    exts: [],
                }],
            }, async (currentDir, fileName) => {
                try {
                    await this.fileExport(currentDir, fileName);
                } catch (e) {
                    alert(e);
                }
            });
        }
    }

    handleAceEditorOnChange(o) {
        if (! AppState.fileChanged) {
            const editor = AppState.AceEditor[this.state.currentAceId];
            if (!(editor.curOp && editor.curOp.command.name)) {
                return;
            }
            AppState.fileChanged = true;
            document.title = `${AppState.AppName} - ● ${AppState.filePath || '(New file)'}`;
        }

        if (!this.state.stretched && this.state.syncPreview && !this.state.isPdf) {
            if (! isPreviewable(AppState.inputFormat)) {
                return;
            }
            if (!this.scheduleRerenderPreview) {
                this.scheduleRerenderPreview = true;
                setTimeout(() => {
                    const editor = AppState.AceEditor[this.state.currentAceId];
        
                    start(editor.getValue(), {
                        inputFormat: AppState.inputFormat,
                        outputFormat: 'html',
                        rawInput:
                            (AppState.inputFormat !== 'md' &&
                             AppState.inputFormat !== 'html') ||
                                this.state.useScripting ? false : true,
                    }, null, AppState.filePath)
                    .then(outputUrl => {
                        if (outputUrl.startsWith('data:')) {
                            // emulation
                            this.refs.root.contentWindow.location.replace(outputUrl);
                        } else {
                            // carlo
                            this.refs.root.contentWindow.location.reload(true);
                        }
                        this.scheduleRerenderPreview = false;
                    })
                    .catch(e => {
                        this.scheduleRerenderPreview = false;
                        console.error(e);
                    });
                }, 3000);
            }
        }
    }

    handleAceEditorOnChangeScrollTop(y, totalHeight) {
        if (!this.state.stretched && !this.state.isPdf) {
            try {
                const w = y / totalHeight;
                const scrollY = this.refs.root.contentWindow.document.documentElement.scrollHeight * w;
                this.refs.root.contentWindow.scrollTo(
                    this.refs.root.contentWindow.scrollX,
                    scrollY,
                );
                this.savedPreviewScrollY = scrollY;
            } catch (e) {
                // emulation
            }
        }
    }

    handleAceEditorOnChangeScrollLeft(x) {
        // if (!this.state.stretched && !this.state.isPdf) {
        //     this.refs.root.contentWindow.scrollTo(x, this.refs.root.contentWindow.scrollTop);
        // }
    }

    handleCommandBoxOnKeyDown(ev) {
        const clearBox = () => {
            this.refs.commandBox.value = '';
            const instance = M.Autocomplete.getInstance(
                document.querySelectorAll('.command-box-input.autocomplete')[0]);
            instance.close();
        };

        if (ev.keyCode === 13) {
            if (this.refs.commandBox.value.trim() === '') {
                clearBox();
            } else {
                const command = `(${this.refs.commandBox.value})`;
                commandRunner(command)
                .then(r => {
                    clearBox();
                    if (typeof r === 'string' && r.trim() === '') {
                        return;
                    }
                    if (r === null || r === void 0) {
                        return;
                    }
                    if (Array.isArray(r) && r.length === 0) {
                        return;
                    }
                    M.toast({
                        html: escapeHtml(String(r)).replace(/\r?\n/g, '<br>'),
                        classes: 'teal darken-4',
                    });
                })
                .catch(e => {
                    clearBox();
                    M.toast({
                        html: escapeHtml(String(e)),
                        classes: 'red darken-4',
                    });
                });
            }
        } else if (ev.keyCode === 27) {
            clearBox();
            document.activeElement.blur();
        }
    }

    handleCommandBoxOnBlur(ev) {
        M.Toast.dismissAll();
    }

    handleSplitterOnPointerDown(ev) {
        this.setState({splitterMoving: true});
        const moveHandler = (ev2) => {
            const maxWidth = Math.max(Math.min(ev2.clientX - 5, window.innerWidth - 440), 400);
            const width = `${Math.round(maxWidth / window.innerWidth * 100)}%`;
            this.refs.editor.refs.outerWrap.style.width = width;
            this.refs.editorPlaceholder.style.width = width;
        };
        const upHandler = (ev2) => {
            window.onpointermove = null;
            window.onpointerup = null;
            this.refs.splitter.releasePointerCapture(ev2.pointerId);
            this.setState({splitterMoving: false});
            setTimeout(() => this.refs.root.contentWindow.scrollTo(
                this.refs.root.contentWindow.scrollX,
                this.savedPreviewScrollY,
            ), 30);
        };
        window.onpointermove = moveHandler;
        window.onpointerup = upHandler;
        this.refs.splitter.setPointerCapture(ev.pointerId);
    }

    render() {
        return (lsx`
        (Template
            (div (@ (className "AppMainMenuWrap"))
                (a (@ (className "AppMainMenu dropdown-trigger btn-floating")
                      (href "#")
                      (data-target "dropdown1") )
                    (i (@ (className "AppMainMenuIcon material-icons large")) "dehaze") )
                (ul (@ (id "dropdown1")
                       (className "dropdown-content") )
                    (MenuItem (@ (icon "add_box")
                                 (caption "New window")
                                 (onClick ${(ev) => { openNewWindow() }}) ))
                    (MenuItem (@ (icon "folder_open")
                                 (caption "Open...")
                                 (onClick ${(ev) => this.handleFileOpenClick(ev)}) ))
                    (MenuItem (@ (icon "save")
                                 (caption "Save (Ctrl+S)")
                                 (onClick ${(ev) => this.handleSaveClick(ev)}) ))
                    (MenuItem (@ (icon "save")
                                 (caption "Save as...")
                                 (onClick ${(ev) => this.handleSaveAsClick(ev)}) ))
                    (MenuItem (@ (icon "publish")
                                 (caption "Export...")
                                 (onClick ${(ev) => this.handleExportClick(ev)}) ))
                    (MenuDivider)
                    (MenuItem (@ (icon "find_in_page")
                                 (caption "Find... (Ctrl+F)")
                                 (onClick ${(ev) => {
                                     const editor = AppState.AceEditor['editor'];
                                     editor.execCommand('find');
                                 }}) ))
                    (MenuDivider)
                    (MenuItem (@ (icon "settings")
                                 (caption "Settings...")
                                 (onClick ${(ev) => this.refs.settingsDialog.showModal({}, _ => {})}) ))
                    (MenuItem (@ (icon "help_outline")
                                 (caption "Help")
                                 (onClick ${(ev) => openURL('https://github.com/shellyln/mdne')}) )) )
                (Switch (@ (caption "Sync preview")
                           (offText "OFF")
                           (onText  "ON")
                           (elClass "hide-on-smallest")
                           (checked ${this.state.syncPreview})
                           (onClick ${(ev) => this.handleSyncPreviewClick(ev)}) ))
                (Switch (@ (caption "Preview format")
                           (offText "HTML")
                           (onText  "PDF")
                           (elClass "hide-on-smallest")
                           (checked ${this.state.isPdf})
                           (onClick ${(ev) => this.handleIsPdfClick(ev)}) ))
                (Switch (@ (caption "Scripting")
                           (offText "OFF")
                           (onText  "ON")
                           (elClass "hide-on-smallest")
                           (checked ${this.state.useScripting})
                           (onClick ${(ev) => this.handleUseScriptingClick(ev)}) ))
                (span (@ (style (flexGrow "2"))) " ")
                (div (@ (className "row command-box-input-outer") )
                    (div (@ (className "input-field col s9 command-box-input-inner") )
                        (input (@ (ref "commandBox")
                                  (className "CommandBoxInput command-box-input autocomplete")
                                  (type "text")
                                  (placeholder "Command palette    (Ctrl+Shift+O)")
                                  (spellcheck "false")
                                  (onBlur ${(ev) => this.handleCommandBoxOnBlur(ev)})
                                  (onKeyDown ${(ev) => this.handleCommandBoxOnKeyDown(ev)}) ))))
                (button (@ (style (textTransform "none")
                                  (margin "0 3px") )
                           (className "btn tooltipped")
                           (data-tooltip "Update preview")
                           (onClick ${(ev) => this.handleShowClick(ev)}) )
                    (i (@ (className "material-icons")) "visibility") )
                (button (@ (style (textTransform "none")
                                  (margin "0 3px") )
                           (className "btn tooltipped")
                           (data-tooltip "Toggle preview")
                           (onClick ${(ev) => this.handleStretchedClick(ev)}) )
                    (i (@ (className "material-icons")) "chrome_reader_mode") ))
            (div (@ (className "AppMainContentWrap"))
                (AceEditor (@ (ref "editor")
                              (id "editor")
                              (stretched ${this.state.stretched ? true: false})
                              (collapsed ${this.state.splitterMoving ? true: false})
                              (fontSize ${this.aceFontSize})
                              (onSaveAs ${(o) => this.handleSaveAsClick(o)})
                              (onChange ${(o) => this.handleAceEditorOnChange(o)})
                              (onChangeScrollTop ${(y, totalHeight) => this.handleAceEditorOnChangeScrollTop(y, totalHeight)})
                              (onChangeScrollLeft ${(x) => this.handleAceEditorOnChangeScrollLeft(x)}) ))
                (div (@ (ref "editorPlaceholder")
                        (className ($concat "AceEditorPlaceholder"
                                   ${this.state.splitterMoving ? "" : " collapsed"}) ) ))
                (div (@ (ref "splitter")
                        (className ($concat "Splitter"
                                   ${this.state.stretched ? " collapsed" : ""}))
                        (onPointerDown ${(ev) => this.handleSplitterOnPointerDown(ev)}) ))
                (div (@ (className ($concat "OutputIframePlaceholder"
                                   ${this.state.splitterMoving ? "" : " collapsed"}) ) ))
                (iframe (@ (ref "root")
                           (src "empty.html")
                           ; (sandbox "")
                           (className ($concat "OutputIframe"
                                      ${this.state.stretched || this.state.splitterMoving ? " collapsed" : ""}) ))))
            (FileDropDialog (@ (ref "fileDropDialog")))
            (FileOpenDialog (@ (ref "fileOpenDialog")))
            (FileSaveDialog (@ (ref "fileSaveDialog")))
            (SettingsDialog (@ (ref "settingsDialog"))) )`
        );
    }
}
