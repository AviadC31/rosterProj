const express = require('express')
const urllib = require('urllib')
const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

let dreamTeam = []

router.get('/teams/:teamName', function (request, response) {

    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, data) {
        if (err) { response.send('no available data to serve') }
        let { teamName } = request.params
        let result = JSON.parse(data).league.standard
        let filterd = result.filter(t => ((teamToIDs[teamName] === t.teamId) && (t.isActive)))
                            .map(m => {
                                return {
                                    firstName: m.firstName,
                                    lastName: m.lastName,
                                    jersey: m.jersey,
                                    pic: `https://nba-players.herokuapp.com/players/${m.lastName}/${m.firstName}`,
                                    pos: m.pos
                                }
                            })
    response.send(filterd)
    })
})

router.get('/playerStats/:player', function (request, response) {
    let  { player } = request.params
    let splitedName = player.match(/[A-Z][a-z]+/g)
    urllib.request(`https://nba-players.herokuapp.com/players-stats/${splitedName[1]}/${splitedName[0]}`, function (err, data) {
        if (err) { response.send('no available data to serve') }
        response.send(JSON.parse(data))
    })
})

router.put('/team', function (req, res) {
    let teamNam = JSON.parse(JSON.stringify(req.body)).teamName
    let teamId = JSON.parse(JSON.stringify(req.body)).teamId
    teamToIDs[teamNam] = teamId
    res.end()
})

router.get('/dreamTeam', function (request, response) {
    response.send(dreamTeam)
})

router.post('/roster', function (req, res) {
    let dreamPlayer = (JSON.parse(JSON.stringify(req.body)))

        if(dreamTeam.length >= 5) {
            res.send("dream team is full")
        } else if(dreamTeam.includes(dreamPlayer.obj)){
            res.send("this player is already a dreamer ")
            } else{
                dreamTeam.push(dreamPlayer.obj)
                 res.end()
        }
})
module.exports = router