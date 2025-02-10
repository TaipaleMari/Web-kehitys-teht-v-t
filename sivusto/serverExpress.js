const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Määritetään staattinen hakemisto, josta palvellaan CSS, JS ja kuvatiedostot
app.use(express.static(__dirname));

// Palautetaan erikseen.html oletussivuna
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'erikseen.html'));
});

// Käynnistetään palvelin
app.listen(PORT, () => {
    console.log(`Serveri käynnissä osoitteessa http://localhost:${PORT}`);
});
