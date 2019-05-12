// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import path from 'path';


export default function getContentType(x) {
    switch (path.extname(x.toLowerCase())) {
    case '.png':
        return 'image/png';
    case '.svg':
        return 'image/svg+xml';
    case '.jpeg': case '.jpg':
        return 'image/jpeg';
    case '.tiff': case '.tif':
        return 'image/tiff';
    case '.gif':
        return 'image/gif';
    case '.css':
        return 'text/css';
    case '.woff':
        return 'font/woff';
    case '.woff2':
        return 'font/woff2';
    case '.ttf':
        return 'font/ttf';
    case '.otf':
        return 'font/otf';
    case '.svgf':
        return 'image/svg+xml';
    case '.eot':
        return 'application/vnd.ms-fontobject';
    case '.html': case '.htm':
        return 'text/html';
    case '.xhtml':
        return 'application/xhtml+xml';
    case '.pdf':
        return 'application/pdf';
    case '.xml':
        return 'text/xml';
    case '.js':
        return 'application/javascript';
    case '.json':
        return 'application/json';
    case '.txt':
        return 'text/plain';
    default:
        return 'application/octet-stream';
    }
}
