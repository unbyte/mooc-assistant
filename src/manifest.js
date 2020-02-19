const pkg = require('../package.json');

const manifestInput = {
    manifest_version: 2,
    name: 'Mooc Assistant',
    version: pkg.version,

    icons: {
        '16': 'assets/icons/icon_16x16.png',
        '48': 'assets/icons/icon_48x48.png',
        '64': 'assets/icons/icon_64x64.png',
        '128': 'assets/icons/icon_128x128.png',
    },

    description: '简单的慕课助手',
    homepage_url: 'https://github.com/unbyte/mooc-assistant',
    short_name: '慕课助手',

    "permissions": [
        "storage",
        "*://www.icourse163.org/*",
    ],
    content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",

    '__chrome|firefox__author': 'helios',
    __opera__developer: {
        name: 'helios',
    },

    __firefox__applications: {
        // gecko: { id: '{}' },
    },

    __chrome__minimum_chrome_version: '49',
    __opera__minimum_opera_version: '36',

    '__chrome|opera__options_page': 'options.html',

    options_ui: {
        page: 'options.html',
        open_in_tab: true,
        __chrome__chrome_style: false,
    },

    background: {
        scripts: ['js/background.bundle.js'],
        '__chrome|opera__persistent': false,
    },


    content_scripts: [
        {
            matches: ['*://www.icourse163.org/*'],
            js: ['js/content_netease.bundle.js'],
            css:['css/content_netease.css']
        },
    ],
};

module.exports = manifestInput;
