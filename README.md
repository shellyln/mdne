
# mdne - Markdown Neo Edit
<img src="https://raw.githubusercontent.com/shellyln/mdne/master/contents/logo.svg?sanitize=true" title="logo" style="width: 200px">

### A simple markdown and code editor powered by [Markdown-it](https://github.com/markdown-it/markdown-it), [Ace](https://ace.c9.io/) and [Carlo](https://github.com/GoogleChromeLabs/carlo).

[![npm](https://img.shields.io/npm/v/mdne.svg)](https://www.npmjs.com/package/mdne)
[![GitHub release](https://img.shields.io/github/release/shellyln/mdne.svg)](https://github.com/shellyln/mdne/releases)
[![Travis](https://img.shields.io/travis/shellyln/mdne/master.svg)](https://travis-ci.org/shellyln/mdne)
[![GitHub forks](https://img.shields.io/github/forks/shellyln/mdne.svg?style=social&label=Fork)](https://github.com/shellyln/mdne/fork)
[![GitHub stars](https://img.shields.io/github/stars/shellyln/mdne.svg?style=social&label=Star)](https://github.com/shellyln/mdne)


<img src="https://raw.githubusercontent.com/shellyln/mdne/master/docs/images/scr-01.png" title="screenshot" style="width: 400px">


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
```sh
npm install -g mdne
```

### Create a desktop and 'send to' menu shoorcuts (Windows)
* Download source zip archive from [here](https://github.com/shellyln/mdne/archive/master.zip).
* Extract zip archive and run `make-shortcut.cmd`.



## Run

Open blank editor:
```sh
mdne
```

Open file:
```sh
mdne README.md
```


## Security warning

Exposing of Node side functions by RPC is enabled in preview iframe.  
**DON'T OPEN links to untrusted sites from the preview.**  
Exposed functions have the ability to list / read / write local files.

## License
[ISC](https://github.com/shellyln/mdne/blob/master/LICENSE.md)  
Copyright (c) 2019 Shellyl_N and Authors.

----
## Bundled softwares' license

* [Ace](https://github.com/ajaxorg/ace): [license](https://github.com/ajaxorg/ace/blob/master/LICENSE)
* [Parinfer](https://github.com/shaunlebron/parinfer): [license](https://github.com/shaunlebron/parinfer/blob/master/LICENSE.md)
* [Materialize](https://materializecss.com/): [license](https://github.com/Dogfalo/materialize/blob/v1-dev/LICENSE)
* [Normalize.css](https://necolas.github.io/normalize.css/): [license](https://github.com/necolas/normalize.css/blob/master/LICENSE.md)
* [React](https://reactjs.org/): [license](https://github.com/facebook/react/blob/master/LICENSE)
