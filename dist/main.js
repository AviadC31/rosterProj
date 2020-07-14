const renderer = new Renderer()

const arr = [
    {team: "wizards", id: "1610612764"},
    {team: "raptors", id: "1610612761"},
    {team: "spurs", id: "1610612759"},
    {team: "rockets", id: "1610612745"}
]

const fetchTeamName = function () {
    let input = $("#teamNameInput").val()
    $.get(`/teams/${input}`, function (players) {
        renderer.render(players, 'players')
    })
}

const fetchDreamTeam = function () {
    $.get(`/dreamTeam`, function (dream) {
        renderer.render(dream, 'dream')
    })
}

const makeDreamer = function (el) {
    let data = {obj: $(el).parent().html()}
    $.post(`/roster`, data , function (dream) {
        console.log("POST complete")
    })
}

const playerStats = function (el) {

    let firstNameStats = $(el).siblings(".firstNameText").text()
    let lastNameStats = $(el).siblings(".lastNameText").text()
    let name = JSON.stringify(firstNameStats + lastNameStats)

    $.get(`/playerStats/${name}`, (stats) => {
        const source = $('#statsTemplate').html()
        const template = Handlebars.compile(source)
        let statsHTML = template(stats)
        $(el).parent().empty().append(statsHTML)
    })
}

const updateTeams = function (team) {
    $.ajax({
        url: '/team',
        data: team,
        method: "PUT",
        success: function (response) {
            console.log("PUT complete")
        }
    })
}

arr.forEach(t => {updateTeams({ teamName: t.team, teamId: t.id })})




