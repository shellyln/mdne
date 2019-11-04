// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export default class SettingsDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.state.showFields = false;
        this.state.fontFamily = void 0;
        this.state.fontSize = 14;
        this.state.tabSize = 4;
        this.state.wrap = false;
        this.state.theme = 'monokai';
    }

    showModal(options, handler) {
        this.refs.dialog.showModal();
        document.activeElement.blur();
        this.options = options;
        this.handler = handler;
        this.setState({
            showFields: false,
            fontFamily: options.fontFamily,
            fontSize: options.fontSize > 0 ? options.fontSize : 14,
            tabSize: options.tabSize,
            wrap: options.wrap === 'off' ? false : (options.wrap === 'free'),
            theme: (options.theme || '').replace('ace/theme/', ''),
        });
        setTimeout(() => this.setState({showFields: true}), 30);
    }

    componentDidUpdate() {
        M.updateTextFields();
        const elems = document.querySelectorAll('select');
        /* const instances = */ M.FormSelect.init(elems, {});
    }

    // eslint-disable-next-line no-unused-vars
    handleFontFamilyChange(ev) {
        this.setState({
            fontFamily: (ev.target.value || '').trim() === '' ? null : ev.target.value,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleFontSizeChange(ev) {
        this.setState({
            fontSize: ev.target.value,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleTabSizeChange(ev) {
        this.setState({
            tabSize: Math.floor(Number(ev.target.value)),
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleWrapChange(ev) {
        this.setState({
            wrap: ev.target.checked,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleThemeChange(ev) {
        this.setState({
            theme: ev.target.value,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleOkClick(ev) {
        document.activeElement.blur();
        this.refs.dialog.close();

        const fontSize = Number(this.state.fontSize);
        this.handler({
            fontFamily: this.state.fontFamily,
            fontSize: fontSize > 0 ? fontSize : 14,
            tabSize: this.state.tabSize > 0 ? this.state.tabSize : 4,
            wrap: this.state.wrap,
            theme: `ace/theme/${this.state.theme}`,
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
                   (className "appSettingsDialog-root")
                   (style (backgroundColor "#333")
                          (color "white") ))
            (style (@ (dangerouslySetInnerHTML """$concat
                .appSettingsDialog-root .select-wrapper input {
                    color: white;
                }
                .appSettingsDialog-root .select-wrapper svg.caret {
                    fill: white;
                }
                """) ))
            (h5 "Settings")
            (div (@ (style (width "80vw")
                           (height "70vh")
                           (display "table-cell")
                           (textAlign "center")
                           (paddingTop "20px") ))
                ($if ${this.state.showFields} (form
                    (div (@ (className "row")
                            (style (margin "0")) )
                        (div (@ (className "input-field col s12"))
                            (input (@ (id "appSettingsDialog-fontFamily")
                                      (type "text")
                                      (className "validate")
                                      (style (color "white"))
                                      (value ${this.state.fontFamily})
                                      (onChange ${(ev) => this.handleFontFamilyChange(ev)}) ))
                            (label (@ (for "appSettingsDialog-fontFamily"))
                                "Font family (e.g. Consolas, 'Migu 1M', monospace)") ))
                    (div (@ (className "row")
                            (style (margin "0")) )
                        (div (@ (className "input-field col s2"))
                            (input (@ (id "appSettingsDialog-fontSize")
                                      (type "number")
                                      (className "validate")
                                      (style (color "white"))
                                      (value ${this.state.fontSize})
                                      (onChange ${(ev) => this.handleFontSizeChange(ev)}) ))
                            (label (@ (for "appSettingsDialog-fontSize"))
                                "Font size (in points)") ))
                    (div (@ (className "row")
                            (style (margin "0")) )
                        (div (@ (className "input-field col s2"))
                            (input (@ (id "appSettingsDialog-tabSize")
                                      (type "number")
                                      (className "validate")
                                      (style (color "white"))
                                      (value ${this.state.tabSize})
                                      (onChange ${(ev) => this.handleTabSizeChange(ev)}) ))
                            (label (@ (for "appSettingsDialog-tabSize"))
                                "Tab size") ))
                    (div (@ (className "row")
                            (style (margin "0")) )
                        (div (@ (className "input-field col s1"))
                            (label
                                (input (@ (type "checkbox")
                                          (className "filled-in")
                                          (checked ${this.state.wrap ? 'checked' : ''})
                                          (onChange ${(ev) => this.handleWrapChange(ev)}) ))
                                (span "Wrap") )))
                    (div (@ (className "row")
                            (style (margin "40px 0 0 0")
                                   (color "white") ))
                        (div (@ (className "input-field col s12"))
                            (select (@ (id "appSettingsDialog-theme")
                                       (onChange ${(ev) => this.handleThemeChange(ev)}) )
                                (option (@ (value "monokai")
                                           (selected ${this.state.theme === 'monokai' ? 'selected' : ''})) "monokai")
                                (option (@ (value "textmate")
                                           (selected ${this.state.theme === 'textmate' ? 'selected' : ''})) "textmate") )
                            (label (@ (for "appSettingsDialog-theme"))
                                "Theme") )) )))
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
