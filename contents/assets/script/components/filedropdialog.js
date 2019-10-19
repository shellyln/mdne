// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import AppState             from '../libs/appstate.js';
import { getInputFormat,
         getAceEditorMode } from '../libs/modes.js';



export default class FileDropDialog extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    showModal(options, handler) {
        this.refs.dialog.showModal();
        document.activeElement.blur();
        this.options = options;
        this.handler = handler;
    }

    openFile(path, text) {
        AppState.filePath = path;
        AppState.inputFormat = getInputFormat(AppState.filePath);
        notifyEditorDirty(false);

        document.title = `${AppState.AppName} - ${AppState.filePath}`;
        document.getElementById('appIndicatorBar').innerText = AppState.filePath;

        const editor = AppState.AceEditor[this.options.aceId];

        editor.clearSelection();
        editor.session.setMode(getAceEditorMode(AppState.inputFormat));
        editor.setValue(text);
        editor.clearSelection();
        editor.session.getUndoManager().markClean();
    }

    openFileAndClose(path, text) {
        this.openFile(path, text);

        document.activeElement.blur();
        this.refs.dialog.close();
        this.handler();
    }

    handleOnDragOver(ev) {
        ev.stopPropagation();
        ev.preventDefault();
    }

    async handleOnDrop(ev) {
        try {
            ev.preventDefault();
            const files = [];
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                files.push(carlo.fileInfo(ev.dataTransfer.files[i]));
            }
            const paths = await Promise.all(files);
            const texts = await Promise.all(
                paths.map(x => x.fileBodyText ?
                    Promise.resolve(x.fileBodyText) : // emulation
                    loadFile(x.path)                  // carlo
                ));

            this.openFileAndClose(paths[0].path, texts[0]);
        } catch (e) {
            await alertWrap(e);
            AppState.filePath = null;
            document.title = `${AppState.AppName} - ${'(New file)'}`;
            document.getElementById('appIndicatorBar').innerText = '(New file)';
        }
    }

    async handleOnOpenDialogClick(ev) {
        this.handleCancelClick(ev);
        try {
            this.options.fileOpenDialog.showModal({
                title: 'Open',
                currentAceId: this.options.aceId,
                currentFilePath: AppState.filePath,
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
                const path = await pathJoin(currentDir, fileName);
                const text = await loadFile(path);

                this.openFileAndClose(path, text);
            });
        } catch (e) {
            await alertWrap(e);
            // eslint-disable-next-line require-atomic-updates
            AppState.filePath = null;
            document.title = `${AppState.AppName} - ${'(New file)'}`;
            document.getElementById('appIndicatorBar').innerText = '(New file)';
        }
    }

    // eslint-disable-next-line no-unused-vars
    handleCancelClick(ev) {
        document.activeElement.blur();
        this.refs.dialog.close();
    }

    render() {
        return (lsx`
        (dialog (@ (ref "dialog")
                   (style (backgroundColor "#333")
                          (color "white") ))
            (h5 "Open file")
            (div (@ (style (width "80vw")
                           (height "70vh")
                           (display "table-cell")
                           (textAlign "center")
                           (verticalAlign "middle") )
                    (onDragOver ${(ev) => {this.handleOnDragOver(ev)}})
                    (onDragLeave ${() => {  }})
                    (onDrop ${async (ev) => {await this.handleOnDrop(ev)}}) )
                (i (@ (className "material-icons large")) "insert_drive_file")(br)
                "Drop file here." (br)(br)(br)
                (a (@ (style (cursor "pointer")
                             (color "white")
                             (border-bottom "1px solid white") )
                      (onClick ${(ev) => {this.handleOnOpenDialogClick(ev)}}) )
                      "Or click here to open the file dialog." ))
            (div (@ (style (display "flex")
                           (justifyContent "center") ))
                (button (@ (style (textTransform "none")
                                  (margin "0 3px 0 3px")
                                  (width "9em") )
                           (className "btn grey darken-3")
                           (onClick ${(ev) => this.handleCancelClick(ev)}) )
                    (i (@ (className "material-icons large")) "cancel")
                    (span (@ (style (margin "0 10px 10px 10px")
                                    (display "inline-block")
                                    (vertical-align "middle") )) "Cancel") )))`
        );
    }
}
