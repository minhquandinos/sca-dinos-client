const { join } = require('path');
const sharedTailwindConfig = require('../../libs/tailwind-preset/tailwind.config');

const fs = require('fs');

let angular = fs.readFileSync('angular.json');
let angularJson = JSON.parse(angular);

const arr = [];

const ignoreLibs = ['common', 'data-access'];

const masterPattern = new RegExp(ignoreLibs.join('|'));

Object.keys(angularJson?.projects).forEach((key) => {
    if (!masterPattern.test(key)) {
        const root = angularJson?.projects?.[key]?.['sourceRoot'];
        if (root) {
            arr.push(join(root, '/**/!(*.stories|*.spec).{ts,html}'));
        }
    }
});

module.exports = {
    enabled: true,
    presets: [sharedTailwindConfig],
    content: [...arr],
    theme: {
        extend: {}
    },
    plugins: []
};
