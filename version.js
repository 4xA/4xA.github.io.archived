var Version = require("node-version-assets");
var versionInstance = new Version({
    assets: [
        'dist/main.css'
    ],
    grepFiles: [
        './index.html'
    ]
});
versionInstance.run();
