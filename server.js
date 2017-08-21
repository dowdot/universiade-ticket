const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const {getAllTicketStatus } = require('./ticket');
const app = express()

app.get('/api/ticketstatus', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'ticketStatus.json'))
})

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('app running on port', port);
})
console.log(`app listen on ${port}`)

setInterval(async () => {
    console.time('[Scheduler] getAllTicketStatus');
    await getAllTicketStatus()
    console.timeEnd('[Scheduler] getAllTicketStatus');
}, 3600000)