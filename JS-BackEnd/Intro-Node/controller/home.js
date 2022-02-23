const { printLayout } = require('../src/util');

let homeLayout = 
`<h1>Hello World!! It\`s work!!</h1>
<p>My Home page</p>
`
module.exports = {
    home(req, res) {
        res.write(printLayout(homeLayout));
        res.end();
    }
}