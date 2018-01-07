function doOnce(callback) {
    if (
        !document.cookie.split('; ').find(row => row.startsWith('isTerminalVisible'))
        || window.location.search.includes('showTerminal=true')
    ) {
        document.cookie = "isTerminalVisible=false; max-age=86400; SameSite=None;";
        callback();
        return;
    }
    showMainContent();
}

function hideMainContent() {
    let content = document.getElementsByClassName('content');
    if (content.length >= 1) {
        content.item(0).classList.add('body--state-hidden');
    }
}

function showMainContent() {
    let content = document.getElementsByClassName('content');
    if (content.length >= 1) {
        content.item(0).classList.remove('body--state-hidden');
    }
}

function hideTerminal() {
    let terminal = document.getElementsByClassName('terminal');
    if (terminal.length >= 1) {
        terminal.item(0).classList.add('body--state-hidden');
    }
}

function showTerminal() {
    let terminal = document.getElementsByClassName('terminal');
    if (terminal.length >= 1) {
        terminal.item(0).classList.remove('body--state-hidden');
    }
}

window.onload = function () {
    doOnce(() => {
        hideMainContent();
        showTerminal();
        let termynal = new Termynal('#termynal',
            {
                typeDelay: 30,
                lineDelay: 200,
                progressLength: 20,
                lineData: [
                    { type: 'input', value: 'git clone https://github.com/4xA/4xA.github.io.git' },
                    { value: 'Cloning into \'4xA.github.io\'...' },
                    { type: 'progress' },
                    { value: 'Successfully cloned repository 4xA.github.io' },
                    { value: '' },
                    { type: 'input', value: 'cd ./4xA.github.io && xdg-open ./index.html &' }
                ],
                callback: () => {
                    setTimeout(() => {
                        hideTerminal();
                        showMainContent();
                    }, 1000);
                }
            }
        )
    });
}
