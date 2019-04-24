
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

> NOTE: To run on `node 12` or leter, you need to fix lacking of the node CLI option
> `--es-module-specifier-resolution=node` after installed.
>> If you are using Windows and only use the app from the desktop or "send-to"
>> shortcuts described below, there is no need to fix it.


* `%AppData%\npm\mdne.cmd` (Windows; cmd.exe)
    ```cmd
    @IF EXIST "%~dp0\node.exe" (
      "%~dp0\node.exe"  --experimental-modules --es-module-specifier-resolution=node --no-warnings "%~dp0\node_modules\mdne\index.mjs" %*
    ) ELSE (
      @SETLOCAL
      @SET PATHEXT=%PATHEXT:;.JS;=;%
      node  --experimental-modules --es-module-specifier-resolution=node --no-warnings "%~dp0\node_modules\mdne\index.mjs" %*
    )
    ```
* `%AppData%\npm\mdne` (Windows; MinGW64, cygwin, ...)
    ```sh
    #!/bin/sh
    basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

    case `uname` in
        *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
    esac

    if [ -x "$basedir/node" ]; then
      "$basedir/node"  --experimental-modules --es-module-specifier-resolution=node --no-warnings "$basedir/node_modules/mdne/index.mjs" "$@"
      ret=$?
    else 
      node  --experimental-modules --es-module-specifier-resolution=node --no-warnings "$basedir/node_modules/mdne/index.mjs" "$@"
      ret=$?
    fi
    exit $ret
    ```
* `$(which mdne)` (Linux)
    ```js
    #!/usr/bin/env node --experimental-modules --es-module-specifier-resolution=node --no-warnings

    // Copyright (c) 2019 Shellyl_N and Authors
    // license: ISC
    // https://github.com/shellyln

    import './lib/extension';

    ...
    ```



### Create desktop and 'send to' menu shoorcuts (Windows)
* Download source zip archive from [here](https://github.com/shellyln/mdne/archive/master.zip).
* Extract zip archive and run `make-shortcut.cmd`.
  > NOTE: To run on `node 12` or leter, run `make-shortcut-node12.cmd` instead.


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
* [Materialize](https://materializecss.com/): [license](https://github.com/Dogfalo/materialize/blob/v1-dev/LICENSE)
* [Normalize.css](https://necolas.github.io/normalize.css/): [license](https://github.com/necolas/normalize.css/blob/master/LICENSE.md)
* [React](https://reactjs.org/): [license](https://github.com/facebook/react/blob/master/LICENSE)
