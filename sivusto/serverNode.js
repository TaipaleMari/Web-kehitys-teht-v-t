const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIRECTORY = __dirname; // Käytetään nykyistä hakemistoa

const server = http.createServer((req, res) => {
    // Ladataan "yhdessa.html" oletuksena
    let filePath = path.join(DIRECTORY, req.url === '/' ? 'yhdessa.html' : req.url);

    // Poistetaan mahdollinen kyselymerkkijono (?param=value)
    filePath = filePath.split('?')[0];

    // Tarkistetaan, että tiedosto on olemassa
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`Tiedostoa ei löytynyt: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            // Luetaan tiedosto ja lähetetään se selaimelle
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    let ext = path.extname(filePath);
                    let contentType = 'text/html';

                    switch (ext) {
                        case '.css':
                            contentType = 'text/css';
                            break;
                        case '.js':
                            contentType = 'text/javascript';
                            break;
                        case '.jpg':
                        case '.jpeg':
                            contentType = 'image/jpeg';
                            break;
                        case '.png':
                            contentType = 'image/png';
                            break;
                    }

                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Serveri käynnissä osoitteessa http://localhost:${PORT}`);
});
