const express = require('express');
const html_to_pdf = require('html-pdf-node');
const options = { format: 'A4' };
const path = require('path');
const fs = require('fs')
const { PORT, host } = require('./config.js');
const app = express(); 

function pdf() {
    try {
        let file = [{ url: 'http://localhost:4000/', name: 'resume.pdf' }]
        html_to_pdf.generatePdfs(file, options).then(output => {
            console.log(output);
            for(let item of output) {
                fs.writeFile(path.resolve(__dirname, 'uploads', item.name), item.buffer, (err) => {
                    if(err) throw err
                    console.log('Succsefully created')
                });
            };
        });
    } catch(err) {
        console.log(err)
    }
}

pdf()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => console.log(`http://${host}:${PORT}`));