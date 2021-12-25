window.onload = function () {
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
                { type: 'input', value: 'cd ./4xA.github.io && xdg-open ./index.html &' },
                { typeDelay: 500, value: '' },
            ],
            callback: () => {
                let hiddenBody = document.getElementsByClassName('body--state-hidden');
                if (hiddenBody.length >= 1) {
                    hiddenBody.item(0).classList.remove('body--state-hidden');
                }
                let visibleBody = document.getElementsByClassName('body--state-visible');
                if (visibleBody.length >= 1) {
                    visibleBody.item(0).classList.add('body--state-hidden');
                }
            }
        }
    )
}
