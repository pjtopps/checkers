const express = require('express');
const next = require('next');
const server = require('./server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    server.get('*', handle);

    server.listen(1200, () => {
        console.log('listening on 1200');
        console.log('dev:', dev)
    });
});
