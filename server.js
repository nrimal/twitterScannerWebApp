

const express = require('express');
const app = express();

app.get('/api/getUserInfo', (req, res) => {
    var customers = [
        {
            id: 1,
            firstName: 'Nishant',
            lastName: 'Rim'
        },
        {
            id: 2,
            firstName: 'Meg',
            lastName: 'Rim'
        },
        {
            id: 3,
            firstName: 'Mil',
            lastName: 'Rim'
        },
        {
            id: 4,
            firstName: 'Basant',
            lastName: 'Rim'
        }
    ]
    res.json(customers);
})

app.get('/', (req, res) => res.send('Running now'));
app.listen(8000, () => console.log('Example app listening on port 8000!'))