#!/bin/sh
":" //# comment; exec /usr/bin/env node --experimental-modules --es-module-specifier-resolution=node --no-warnings "$0" "$@" # do not pass CR

// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln

import main from './main';



main();
