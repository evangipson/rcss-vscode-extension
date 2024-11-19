const vscode = require('vscode');

const minifyCommandId = 'rcssMinify.minify';
const minifyWatchCommandId = 'rcssMinify.watch';
const minifyStopWatchCommandId = 'rcssMinify.stopWatch';
const minifyTerminalId = 'rcss-minify';
let watchedFolder;
let watchedFolderSaveTask;

/**
 * Set the watching context for the context menu 'Watch'/'Stop Watch' option.
 * @param {boolean} isMinified 
 */
const setWatchingContext = (isMinified) => {
	vscode.commands.executeCommand('setContext', 'rcssMinify:isWatching', isMinified);
};

/**
 * Finds a terminal in VS Code by name, then
 * returns that terminal if it exists.
 * @param {String} terminalName 
 * @returns {vscode.Terminal}
 */
const findTerminal = (terminalName) => {
	return vscode.window.terminals.find(terminal => {
		if(terminal.name == terminalName) {
			return terminal;
		}
	});
};

/**
 * Runs rcss minification on hard-coded directory and path (for now).
 * @param {vscode.Terminal} terminal 
 */
const runMinification = (terminal, directory) => {
	const minifyFileName = vscode.workspace.getConfiguration('fileSettings').get('minifiedFileName');
	terminal.sendText(`cd $home/.vscode/extensions/evan-gipson.rcss-minify-0.0.1/bin`);
	terminal.sendText(`./rcss ${directory} ${minifyFileName}`);
};

/**
 * Register the `rcssMinify.minify` command.
 */
vscode.commands.registerCommand(minifyCommandId, (contextSelection) => {
	const minifyTerminal = findTerminal(minifyTerminalId);
	if(!contextSelection?.fsPath) {
		return;
	}
	runMinification(minifyTerminal, contextSelection.fsPath);
});

/**
 * Register the `rcssMinify.watch` command.
 */
vscode.commands.registerCommand(minifyWatchCommandId, (contextSelection) => {
	setWatchingContext(true);
	watchedFolder = contextSelection?.fsPath;

	watchedFolderSaveTask = vscode.workspace.onDidSaveTextDocument((document) => {
		const minifyFileName = vscode.workspace.getConfiguration('fileSettings').get('minifiedFileName');
		const shouldTriggerMinify = document.uri.scheme === "file"
			&& document.uri.fsPath.includes(watchedFolder)
			&& document.languageId === "css"
			&& !document.uri.fsPath.includes(minifyFileName);
		if (shouldTriggerMinify) {
			const minifyTerminal = findTerminal(minifyTerminalId);
			runMinification(minifyTerminal, watchedFolder);
		}
	});
});

/**
 * Register the `rcssMinify.stopWatch` command.
 */
vscode.commands.registerCommand(minifyStopWatchCommandId, (contextSelection) => {
	setWatchingContext(false);
	if(watchedFolder == contextSelection?.fsPath) {
		watchedFolder = undefined;
	}
	watchedFolderSaveTask = undefined;
});


/**
 * The main entry point for the extension.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.window.createTerminal(minifyTerminalId);

	context.subscriptions.push(minifyCommandId);
	context.subscriptions.push(minifyWatchCommandId);
	context.subscriptions.push(minifyStopWatchCommandId);
}

// eslint-disable-next-line no-undef
module.exports = {
	activate
};