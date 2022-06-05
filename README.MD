# NW.js Vite Boilerplate
Boilerplate for NW.js using Vite, React, and TailwindCSS

## Setup
```bash
git clone https://github.com/yummy05/nwjs-vite-template
yarn install
yarn dev
```

## Building
```bash
yarn build
```

## Things to keep in mind
To import node packages (`window.nw.require`), you need to import the file require.js. This file wraps the function window.nw.require to prevent/trick vite from trying to polyfill it.