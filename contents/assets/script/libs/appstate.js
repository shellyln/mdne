// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



const AppState = {
    AppName: 'Markdown Editor',
    AceEditor: null,
    filePath: null,
    inputFormat: 'md',
    fileChanged: false,
};


export function updateAppIndicatorBar() {
    document.title = `${AppState.AppName} - ${
        AppState.fileChanged ? '● ' : ''}${
        AppState.filePath || '(New file)'}`;
    document.getElementById('appIndicatorBar').innerText = `${
        AppState.fileChanged ? '● ' : ''}${
        AppState.filePath || '(New file)'} | mode: ${
        AppState.inputFormat}`;
}

export default AppState;
