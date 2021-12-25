var Version = require("node-version-assets");
var versionInstance = new Version({
    assets: [
        'dist/main.css',
        'dist/fontawesome.css',
        'dist/main.min.js',
        'dist/termynal.min.css',
        'dist/termynal.min.js',
    ],
    grepFiles: [
        './index.html'
    ]
});
versionInstance.run();
