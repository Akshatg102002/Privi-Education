const fs = require('fs');
const path = require('path');

const OLD_EMAIL = /iexplaineducation\.in/g;
const NEW_EMAIL = 'privieducation.in';
const OLD_APP = /iExplain/g;
const NEW_APP = 'Privi';

function scanAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (['node_modules', '.git', 'dist'].includes(file)) continue;
            scanAndReplace(fullPath);
        } else {
            if (['.ts', '.tsx', '.html', '.json'].some(ext => file.endsWith(ext))) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let modified = false;
                
                if (content.match(OLD_EMAIL)) {
                    content = content.replace(OLD_EMAIL, NEW_EMAIL);
                    modified = true;
                }
                if (content.match(OLD_APP)) {
                    content = content.replace(OLD_APP, NEW_APP);
                    modified = true;
                }
                
                if (modified) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log('Updated', fullPath);
                }
            }
        }
    }
}

scanAndReplace(process.cwd());
console.log('Update complete');

