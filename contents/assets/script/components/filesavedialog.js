// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export default class FileSaveDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.state.title = '';
        this.state.currentFilePath = '';
        this.state.fileTypes = [];
        this.state.selectedFileType = '*';

        this.state.currentDir = '';
        this.state.currentDirFiles = [];
        this.state.inputFileName = '';
    }

    showModal(options, handler) {
        this.setState({title: options.title});
        this.setState({currentFilePath: options.currentFilePath});
        this.setState({fileTypes: options.fileTypes});

        const ext = options.currentFilePath ?
            (options.currentFilePath.lastIndexOf('.') >= 0 ?
                options.currentFilePath.toLowerCase()
                .slice(options.currentFilePath.lastIndexOf('.')) : '') : '';
        let selectedType = options.fileTypes.filter(x => x.exts.filter(z => z === ext)[0])[0];
        let allFilesType = options.fileTypes.filter(x => x.value === '*')[0];
        this.setState({selectedFileType:
            options.forExport ? options.fileTypes[0].value :
                (selectedType ? selectedType.value :
                    (ext !== '' ? allFilesType.value : options.fileTypes[0].value))});

        this.setState({currentDir: ''});
        this.setState({currentDirFiles: []});
        this.setState({inputFileName: ''});

        this.refs.dialog.showModal();
        document.activeElement.blur();
        this.options = options;
        this.handler = handler;

        listDirectory(options.currentFilePath)
        .then(info => {
            this.setState({currentDir: info.directory});
            this.setState({currentDirFiles: info.files});
        })
        // eslint-disable-next-line no-unused-vars
        .catch(e => {
            listDesktopDirectory()
            .then(info => {
                this.setState({currentDir: info.directory});
                this.setState({currentDirFiles: info.files});
            })
            // eslint-disable-next-line no-unused-vars
            .catch(e2 => {
                listHomeDirectory()
                .then(info => {
                    this.setState({currentDir: info.directory});
                    this.setState({currentDirFiles: info.files});
                })
                .catch(e3 => {
                    alert(e3);
                });
            });
        });

        getBaseName(options.currentFilePath)
        .then(name => {
            this.refs.fileName.focus();
            this.setState({inputFileName: name});
        })
        // eslint-disable-next-line no-unused-vars
        .catch(e => {
            // ignore error
            // alert(e);
        });
    }

    handleFileListItemClick(ev, name, isDir) {
        if (isDir) {
            this.refs.fileName.focus();

            listDirectory(this.state.currentDir, name)
            .then(info => {
                this.setState({currentDir: info.directory});
                this.setState({currentDirFiles: info.files});
            })
            .catch(e => {
                alert(e);
            });
        } else {
            this.refs.fileName.focus();
            this.setState({inputFileName: name});
        }
    }

    // eslint-disable-next-line no-unused-vars
    async handleOkClick(ev) {
        try {
            if (this.state.inputFileName.trim() === '') {
                return;
            }

            let fileName = this.state.inputFileName;
            const ext = fileName.lastIndexOf('.') >= 0 ?
                fileName.toLowerCase().slice(fileName.lastIndexOf('.')) : '';
            let selectedType = this.options.fileTypes.filter(x => x.value === this.state.selectedFileType)[0];
            if (ext === '' && selectedType) {
                fileName += selectedType.exts[0] || '';
            } else if (! selectedType.exts.filter(x => x === ext)[0]) {
                fileName += selectedType.exts[0] || '';
            }

            if (await fileExists(this.state.currentDir, fileName)) {
                if (! confirm('Are you sure want to overwrite the existing file?')) {
                    return;
                }
            }

            this.handler(this.state.currentDir, fileName);

            document.activeElement.blur();
            this.refs.dialog.close();
        } catch (e) {
            alert(e);
        }
    }

    getFilteredCurrentDirFiles() {
        return this.state.currentDirFiles.filter(x => {
            if (x.isDirectory) {
                return true;
            }
            let fileName = x.name;
            const ext = fileName.lastIndexOf('.') >= 0 ?
                fileName.toLowerCase().slice(fileName.lastIndexOf('.')) : '';
            let selectedType = this.options.fileTypes.filter(x => x.value === this.state.selectedFileType)[0];
            if (!selectedType || !selectedType.exts || selectedType.exts.length === 0) {
                return true;
            }
            return (selectedType.exts.filter(z => z === ext)[0]);
        });
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
            (h5 ${this.state.title})
            (div ${this.state.currentDir})
            (div (@ (style (width "80vw")
                           (height "70vh")
                           (display "table-cell")
                           (textAlign "center") ))
                (div (@ (style (color "black")
                               (text-align "left")
                               (height "calc(100% - 100px)")
                               (overflow-x "auto")
                               (overflow-y "scroll") ))
                    (ul (@ (className "collection")
                           (style (margin "0")) )
                        ($=for ${this.getFilteredCurrentDirFiles()}
                            (li (@ (key $index)
                                   (className "collection-item"))
                                (a (@ (href "javascript:void 0")
                                      (onClick (|-> (ev) use ($data)
                                          (${(ev, name, isDir) => this.handleFileListItemClick(ev, name, isDir)}
                                              ev ::$data:name ::$data:isDirectory )))
                                      (style (color "inherit")
                                             (text-decoration "none") ))
                                    (i (@ (className "material-icons tiny")
                                          (style (margin "0 10px 10px 10px")) )
                                        ($if ::$data:isDirectory "folder" "insert_drive_file") )
                                    ::$data:name )) )))
                (div (@ (className "row"))
                    (div (@ (className "input-field col s10"))
                        (label "File name")
                        (input (@ (ref "fileName")
                                  (style (color "white"))
                                  (type "text")
                                  (spellcheck "false")
                                  (onChange ${() => this.setState({inputFileName: this.refs.fileName.value})})
                                  (value ${this.state.inputFileName}) )))
                    (div (@ (className "input-field col s2"))
                        (select (@ (ref "fileType")
                                   (className "browser-default")
                                   (onChange ${() => this.setState({selectedFileType: this.refs.fileType.value})}) )
                            ($=for ${this.state.fileTypes}
                                (option (@ (key   ::$data:value)
                                           (value ::$data:value)
                                           (($if (== ${this.state.selectedFileType} ::$data:value)
                                               "selected" "data-x-no-selected" )))
                                    ::$data:text ))))))
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
                                    (vertical-align "middle") )) "Cancel") )
                (button (@ (style (textTransform "none")
                                  (margin "0 3px 0 3px")
                                  (width "9em") )
                           (className "btn blue darken-2")
                           (onClick ${(ev) => this.handleOkClick(ev)}) )
                    (i (@ (className "material-icons large")) "check")
                    (span (@ (style (margin "0 10px 10px 10px")
                                    (display "inline-block")
                                    (vertical-align "middle") )) "OK") ) ))`
        );
    }
}
