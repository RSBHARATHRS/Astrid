const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const projectName = process.argv.slice(2)[0];
    const version = process.argv.slice(2)[1] || '';
    const env = process.argv.slice(2)[2] ? process.argv.slice(2)[2] : "";
    if (!projectName) {
        console.log('\x1b[31m%s\x1b[0m', 'project name required as argument');
    } else {
        const files = [
            './dist/' + projectName + '/runtime.js',
            './dist/' + projectName + '/polyfills.js',
            './dist/' + projectName + '/main.js'        ]
        await fs.ensureDir('./dist/' + projectName + '/element');
        if (env) {
            await concat(files, './dist/' + projectName + '/element/' + env + '-' + projectName + (version ? '-' : '') + version + '.js');
            console.log('\x1b[32m%s\x1b[0m', 'Done generating bundle for ' + env + '-' + projectName + '-' + version);
        } else {
            await concat(files, './dist/' + projectName + '/element/' + projectName + (version ? '-' : '') + version + '.js');
            console.log('\x1b[32m%s\x1b[0m', 'Done generating bundle for ' + projectName + '-' + version);
        }
    }
})()
