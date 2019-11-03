// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export default class SettingsDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.state.fontFamily = void 0;
        this.state.fontSize = 14;
        this.state.tabSize = 4;
        this.state.wrap = false;
    }

    showModal(options, handler) {
        this.refs.dialog.showModal();
        document.activeElement.blur();
        this.options = options;
        this.handler = handler;
        this.setState({
            fontFamily: options.fontFamily,
            fontSize: options.fontSize,
            tabSize: options.tabSize,
            wrap: options.wrap,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleFontFamilyChange(ev) {
        this.setState({
            fontFamily: (ev.target.value || '').trim() === '' ? void 0 : ev.target.value,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleFontSizeChange(ev) {
        this.setState({
            fontSize: Number(ev.target.value),
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleTabSizeChange(ev) {
        this.setState({
            tabSize: Number(ev.target.value),
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleWrapChange(ev) {
        this.setState({
            wrap: ev.target.checked,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleOkClick(ev) {
        document.activeElement.blur();
        this.refs.dialog.close();
        this.handler({
            fontFamily: this.state.fontFamily,
            fontSize: this.state.fontSize,
            tabSize: this.state.tabSize,
            wrap: this.state.wrap,
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
            (h5 "Settings")
            (div (@ (style (width "80vw")
                           (height "70vh")
                           (display "table-cell")
                           (textAlign "center")
                           (paddingTop "20px") ))
                (form
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
                                "Font family") ))
                    (div (@ (className "row")
                            (style (margin "0")) )
                        (div (@ (className "input-field col s1"))
                            (input (@ (id "appSettingsDialog-fontSize")
                                      (type "text")
                                      (className "validate")
                                      (style (color "white"))
                                      (value ${this.state.fontSize})
                                      (onChange ${(ev) => this.handleFontSizeChange(ev)}) ))
                            (label (@ (for "appSettingsDialog-fontSize"))
                                "Font size") ))
                    (div (@ (className "row")
                            (style (margin "0")) )
                        (div (@ (className "input-field col s1"))
                            (input (@ (id "appSettingsDialog-tabSize")
                                      (type "text")
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
                                          (checked ${this.state.wrap ? "checked" : ""})
                                          (onChange ${(ev) => this.handleWrapChange(ev)}) ))
                                (span "Wrap") )) )))
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
