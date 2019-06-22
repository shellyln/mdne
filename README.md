
# mdne - Markdown Neo Edit
<img src="https://raw.githubusercontent.com/shellyln/mdne/master/contents/logo.svg?sanitize=true" title="logo" style="width: 200px">

### A simple markdown and code editor powered by [Markdown-it](https://github.com/markdown-it/markdown-it), [Ace](https://ace.c9.io/) and [Carlo](https://github.com/GoogleChromeLabs/carlo).

[![npm](https://img.shields.io/npm/v/mdne.svg)](https://www.npmjs.com/package/mdne)
[![GitHub release](https://img.shields.io/github/release/shellyln/mdne.svg)](https://github.com/shellyln/mdne/releases)
[![Travis](https://img.shields.io/travis/shellyln/mdne/master.svg)](https://travis-ci.org/shellyln/mdne)
[![GitHub forks](https://img.shields.io/github/forks/shellyln/mdne.svg?style=social&label=Fork)](https://github.com/shellyln/mdne/fork)
[![GitHub stars](https://img.shields.io/github/stars/shellyln/mdne.svg?style=social&label=Star)](https://github.com/shellyln/mdne)


<img src="https://raw.githubusercontent.com/shellyln/mdne/master/docs/images/scr-01.png" title="screenshot" style="width: 400px">


## Note
As of 2019-06-22, PDF preview and output functions are broken in the latest versions of
Google Chrome, Carlo, Puppeteer and mdne.  
The same issue is occured for revisions that have worked correctly in the past (<= @0.1.33).  
To output as PDF, please use [Ménneu](https://github.com/shellyln/menneu#use-cli) CLI.


## Features
* Live preview of Markdown, HTML, [LSX](https://github.com/shellyln/liyad#what-is-lsx) formats.
* Export Markdown, HTML, LSX into PDF or HTML.
* Code highlighting.
  * C#
  * CSS
  * GraphQL
  * HTML
  * JavaScript
  * JSON
  * Less
  * Lisp
  * Markdown
  * Protobuf
  * Python
  * Sass
  * Scss
  * shell script
  * SQL
  * SVG
  * TSX
  * TypeScript
  * XML
  * YAML
* Markdown extended syntax
  * Many markdown-it plugins are enabled. See [here](https://github.com/shellyln/menneu#features).
* Scripting and value expansion
  * See [here](https://github.com/shellyln/menneu#lisp-block-expansion).



## Install

### Prerequirements
* Google Chrome
* Node>=10

### Install from NPM

#### Linux
```sh
env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=TRUE npm install -g mdne
```

#### Windows
```cmd
set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=TRUE
npm install -g mdne
```



### Create desktop and 'send to' menu shoorcuts (Windows)
* Download source zip archive from [here](https://github.com/shellyln/mdne/archive/master.zip).
* Extract zip archive and run `make-shortcut.cmd`.
  > NOTE: To run on `node>=12`, run `make-shortcut-node12.cmd` instead.


## Run

Open blank editor:
```sh
mdne

## To run on node>=12, use `mdne12` instead.
## TO run on Windows, use `mdnew` or `mdnew12` instead.
```

Open file:
```sh
mdne README.md

## To run on node>=12, use `mdne12` instead.
## TO run on Windows, use `mdnew` or `mdnew12` instead.
```


## Integrations

* [mdne-for-kintone](https://github.com/shellyln/mdne-for-kintone)
  * Edit kintone record's field. (browser app)


## CLI
Please use [Ménneu](https://github.com/shellyln/menneu#use-cli) CLI.


## Live demo

[https://shellyln.github.io/mdne/online.html](https://shellyln.github.io/mdne/online.html)

#### Open external files from live demo
* Drop a local file into FileDropOpenDialog.
* Set the target URL to a location hash.
  * example: [react-dom.development.js](https://shellyln.github.io/mdne/online.html#open.url=https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Freact-dom%2F16.7.0%2Fumd%2Freact-dom.development.js)
    * Fetching files is restricted by the Same-Origin Policy.
* Set zipped data to a location hash.
  * example: [hello.md](https://shellyln.github.io/mdne/online.html#filename=hello.md&open.d=eJwtyjEOgCAMBdCdU3zjit6BuLh4CKQdiIWSSkK8vYnxzW_GziLqUajy5FzAnUsTRol2kY6KWAlJicGUuxqaDjYmnA-O_yy5e4TE392iia7uBTWXHe8)
    * location hash is generated when `Save` or `SaveAs` commands are done.

#### Live demo browser requirements
* Google Chrome: latest
* Firefox: latest

#### Live demo restrictions
* Rendering / exporting to PDF is not available.
* Save and SaveAs commands download the file being edited.



## Security warning

Exposing of Node side functions by RPC is enabled in preview iframe.  
**DON'T OPEN links to untrusted sites from the preview.**  
Exposed functions have the ability to list / read / write local files.

## License
[ISC](https://github.com/shellyln/mdne/blob/master/LICENSE.md)  
Copyright (c) 2019 Shellyl_N and Authors.

----
## Bundled softwares' license

* [Ace](https://github.com/ajaxorg/ace): [license](https://github.com/ajaxorg/ace/blob/master/LICENSE) (BSD-3-Clause)
* [Materialize](https://materializecss.com/): [license](https://github.com/Dogfalo/materialize/blob/v1-dev/LICENSE) (MIT)
* [Normalize.css](https://necolas.github.io/normalize.css/): [license](https://github.com/necolas/normalize.css/blob/master/LICENSE.md) (MIT)
* [React](https://reactjs.org/): [license](https://github.com/facebook/react/blob/master/LICENSE) (MIT)
* [pako](https://github.com/nodeca/pako): [license](https://github.com/nodeca/pako/blob/master/LICENSE) (MIT + ZLIB)
* [dialog-polyfill](https://github.com/GoogleChrome/dialog-polyfill): [license](https://github.com/GoogleChrome/dialog-polyfill/blob/master/LICENSE) (BSD-3-Clause)
