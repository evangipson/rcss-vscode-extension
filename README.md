# RCSS Minify
RCSS Minify is an extension that leverages an open source minification tool written in Rust that can minify a folder of assets, or watch a folder and minify them on save.

## Features
- **Customizable Minified File Name**: Customize the name of the generated file in `Settings > File Settings > Minified File Name`.
- **Minify Folder**: Right click on any folder containing CSS assets and use the `RCSS: Minify` option in the context menu to minify all the files down into one file.
- **Watch Folder**: Right click on any folder containing CSS assets and use the `RCSS: Watch` option in the context menu to automatically generate a minified file upon saving any file within that folder.

## Source Code
The source code for the RCSS VS Code extension lives in the [rcss-vscode-extension repo on GitHub](https://github.com/evangipson/rcss-vscode-extension). If there are any issues related to the extension, feel free to [create an issue on the Issues page](https://github.com/evangipson/rcss-vscode-extension/issues/new)!

The source code for RCSS lives in the [RCSS repo on GitHub](https://github.com/evangipson/rcss). If you notice a bug while using RCSS Minify, feel free to [create an issue on the Issues page](https://github.com/evangipson/rcss/issues/new)!

## File types supported
Currently, only CSS files are supported in RCSS. JavaScript is also planned to be supported in the future.
||CSS|JavaScript|
|:-|:-:|:-:|
|Supported|&check;|&cross;|
|Planned|-|&check;|