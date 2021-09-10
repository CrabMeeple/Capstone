'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let fs = require('fs')

let app = express()
app.use(bodyParser.json())

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// enable CORS
// Since we're not serving pages from Node, you'll get the following error if CORS isn't "enabled"
// Error:  Failed to load http://localhost:3000/login/:
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
// Origin 'null' is therefore not allowed access.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
    )
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

// ------ Debugging support ------------------

function logArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
}

// ------ Get next ID helper ------------------

function getNextId(counterType) {
    // use 'group' or 'member' or 'user' as counterType
    // read the counter file
    let data = fs.readFileSync(__dirname + '/data/counters.json', 'utf8')
    data = JSON.parse(data)

    // find the next id from the counters file and then increment the
    // counter in the file to indicate that id was used
    let id = -1
    switch (counterType.toLowerCase()) {
        case 'group':
            id = data.nextGroup
            data.nextGroup++
            break
        case 'member':
            id = data.nextMember
            data.nextMember++
            break
        case 'user':
            id = data.nextUser
            data.nextUser++
            break
    }

    // save the updated counter
    fs.writeFileSync(__dirname + '/data/counters.json', JSON.stringify(data))

    return id
}

// ------ Validation helpers ------------------

function isValidGroup(team) {
    if (team.SponsorName == undefined || team.SponsorName.trim() == '') return 1
    if (team.SponsorPhone == undefined || team.SponsorPhone.trim() == '')
        return 2
    if (team.SponsorEmail == undefined || team.SponsorEmail.trim() == '')
        return 3
    if (team.TrackName == undefined || team.TrackName.trim() == '') return 4
    if (team.MaxGroupSize == undefined || isNaN(team.MaxGroupSize)) return 5

    return -1
}

function isValidMember(member) {
    if (member.MemberEmail == undefined || member.MemberEmail.trim() == '')
        return 1
    if (member.HorseName == undefined || member.HorseName.trim() == '') return 2
    if (member.MemberPhone == undefined || member.MemberPhone.trim() == '')
        return 3
    if (member.JockeyName == undefined || member.JockeyName.trim() == '')
        return 4
    if (member.Odds == undefined || member.Odds.trim() == '') return 5
    if (member.HorseColor == undefined || member.HorseColor.trim() == '')
        return 6

    return -1
}

// ------------------------------------------------------------------------------

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'index.html')
})

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'index.html')
})

// ------------------------------------------------------------------------------
// THIS CODE ALLOWS REQUESTS FOR THE API THROUGH

/* ************************************************************************* */
// NOTE:  To make debugging easy, these methods echo their processing through
//        to the terminal window.  This means there may be some unnecessary
//        parsing and stringifying.  But it is worth it as you debug your code.
/* ************************************************************************* */

// GET TRACKS
app.get('/api/organizations', function (req, res) {
    console.log('Received a GET request for all organizations')

    let data = fs.readFileSync(__dirname + '/data/organizations.json', 'utf8')
    data = JSON.parse(data)

    console.log('Returned data is: ')
    console.log(data)
    res.end(JSON.stringify(data))
})

// GET ALL RACES
app.get('/api/groups', function (req, res) {
    console.log('Received a GET request for all groups')

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    console.log('Returned data is: ')
    console.log(data)
    res.end(JSON.stringify(data))
})

// GET ONE RACE BY ID
app.get('/api/groups/:id', function (req, res) {
    let id = req.params.id
    console.log('Received a GET request for group ' + id)

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    let match = data.find((element) => element.RaceId == id)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(match)
    res.end(JSON.stringify(match))
})

// GET MANY RACES BY TRACK
app.get('/api/groups/byorganization/:id', function (req, res) {
    let id = req.params.id
    console.log('Received a GET request for groups in organization ' + id)

    let orgData = fs.readFileSync(
        __dirname + '/data/organizations.json',
        'utf8'
    )
    orgData = JSON.parse(orgData)

    let organization = orgData.find(
        (element) => element.TrackId.toLowerCase() == id.toLowerCase()
    )
    if (organization == null) {
        res.status(404).send('Organization Not Found')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the matching groups for a specific organization
    let matches = data.filter(
        (element) => element.TrackName == organization.TrackName
    )

    console.log('Returned data is: ')
    console.log(matches)
    res.end(JSON.stringify(matches))
})

// GET A SPECIFIC HORSE IN A SPECIFIC RACE
app.get('/api/groups/:raceid/members/:memberid', function (req, res) {
    let raceid = req.params.raceid
    let memberId = req.params.memberid
    console.log(
        'Received a GET request for member ' + memberId + ' in group ' + raceid
    )

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let matchingGroup = data.find((element) => element.RaceId == raceid)
    if (matchingGroup == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // find the member
    let match = matchingGroup.Members.find((m) => m.MemberId == memberId)
    if (match == null) {
        res.status(404).send('Member Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(match)
    res.end(JSON.stringify(match))
})

// ADD A RACE
app.post('/api/groups', urlencodedParser, function (req, res) {
    console.log('Received a POST request to add a group')
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble group information so we can validate it
    let group = {
        RaceId: getNextId('group'), // assign id to group
        TrackName: req.body.TrackName,
        SponsorEmail: req.body.SponsorEmail,
        SponsorName: req.body.SponsorName,
        SponsorPhone: req.body.SponsorPhone,
        MaxGroupSize: Number(req.body.MaxGroupSize),
        Members: [],
    }

    console.log('Performing validation...')
    let errorCode = isValidGroup(group)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // add the group
    data.push(group)

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('Group added: ')
    console.log(group)

    //res.status(201).send();
    res.end(JSON.stringify(group)) // return the new group w it's GroupId
})

// EDIT A RACE
app.put('/api/groups', urlencodedParser, function (req, res) {
    console.log('Received a PUT request to group a team')
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble group information so we can validate it
    let group = {
        SponsorName: req.body.SponsorName,
        SponsorPhone: req.body.SponsorEmail,
        SponsorEmail: req.body.SponsorPhone,
        RaceId: req.body.RaceId,
        TrackName: req.body.TrackName,
        MaxGroupSize: Number(req.body.MaxGroupSize),
    }

    console.log('Performing validation...')
    let errorCode = isValidGroup(group)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let match = data.find((element) => element.RaceId == req.body.RaceId)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // update the group
    match.TrackName = req.body.TrackName
    match.SponsorPhone = req.body.SponsorPhone
    match.SponsorEmail = req.body.SponsorEmail
    match.SponsorName = req.body.SponsorName

    // make sure new values for MaxGroupSize doesn't invalidate grooup
    if (Number(req.body.MaxGroupSize) < match.Members.length) {
        res.status(409).send(
            'New group size too small based on current number of members'
        )
        return
    }
    match.MaxGroupSize = Number(req.body.MaxGroupSize)

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('Update successful!  New values: ')
    console.log(match)
    res.status(200).send()
})

// DELETE A RACE
app.delete('/api/groups/:id', function (req, res) {
    let id = req.params.id
    console.log('Received a DELETE request for group ' + id)

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the index number of the group in the array
    let foundAt = data.findIndex((element) => element.RaceId == id)

    // delete the group if found
    if (foundAt != -1) {
        data.splice(foundAt, 1)
    }

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('Delete request processed')
    // Note:  even if we didn't find the group, send a 200 because they are gone
    res.status(200).send()
})

// ADD A HORSE TO A RACE
app.post('/api/groups/:id/members', urlencodedParser, function (req, res) {
    let id = req.params.id
    console.log('Received a POST request to add a member to group ' + id)
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble member information so we can validate it
    let member = {
        MemberId: getNextId('member'), // assign new id
        MemberEmail: req.body.MemberEmail,
        HorseName: req.body.HorseName,
        JockeyName: req.body.JockeyName,
        Odds: req.body.Odds,
        HorseColor: req.body.HorseColor,
        MemberPhone: req.body.MemberPhone,
    }

    console.log('Performing member validation...')
    let errorCode = isValidMember(member)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let match = data.find((element) => element.RaceId == id)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    if (match.Members.length == match.MaxGroupSize) {
        res.status(409).send('Member not added - group at capacity')
        console.log('Member not added - group at capacity')
        return
    }

    // add the member
    match.Members.push(member)

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('New member added!')
    res.status(200).send()
})

// EDIT A HORSE IN A RACE
app.put('/api/groups/:id/members', urlencodedParser, function (req, res) {
    let id = req.params.id
    console.log('Received a PUT request to edit a member in group ' + id)
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble member information so we can validate it
    let member = {
        MemberId: req.body.MemberId,
        MemberEmail: req.body.MemberEmail,
        HorseName: req.body.HorseName,
        JockeyName: req.body.JockeyName,
        Odds: req.body.Odds,
        HorseColor: req.body.HorseColor,
        MemberPhone: req.body.MemberPhone,
    }

    console.log('Performing member validation...')
    let errorCode = isValidMember(member)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    // find the group
    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let matchingGroup = data.find((element) => element.RaceId == id)
    if (matchingGroup == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // find the member
    let match = matchingGroup.Members.find(
        (m) => m.MemberId == req.body.MemberId
    )
    if (match == null) {
        res.status(404).send('Member Not Found')
        return
    }

    // update the member
    match.MemberEmail = req.body.MemberEmail
    match.HorseName = req.body.HorseName
    match.JockeyName = req.body.JockeyName
    match.Odds = req.body.Odds
    match.HorseColor = req.body.HorseColor
    match.MemberPhone = req.body.MemberPhone

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('Member updated!')
    res.status(200).send()
})

// DELETE A HORSE IN A RACE
app.delete(
    '/api/groups/:raceid/members/:memberid',
    urlencodedParser,
    function (req, res) {
        let raceid = req.params.raceid
        let memberId = req.params.memberid
        console.log(
            'Received a DELETE request for member ' +
                memberId +
                ' in group ' +
                raceid
        )

        // find the group
        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        let matchingGroup = data.find((element) => element.RaceId == raceid)
        if (matchingGroup == null) {
            res.status(404).send('Group Not Found')
            return
        }

        // find the member
        let foundAt = matchingGroup.Members.findIndex(
            (m) => m.MemberId == memberId
        )

        // delete the member if found
        if (foundAt != -1) {
            matchingGroup.Members.splice(foundAt, 1)
        }

        fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

        console.log('Delete request processed')
        // Note:  even if we didn't find them, send a 200 back because they are gone
        res.status(200).send()
    }
)

// ----------------------------------------------------------------------------
// USER MANAGEMENT

// GET request to check if user name is available
app.get('/api/username_available/:username', function (req, res) {
    let username = req.params.username
    console.log(
        'Checking to see if this username ' + username + ' is available'
    )

    let data = fs.readFileSync(__dirname + '/data/users.json', 'utf8')
    data = JSON.parse(data)

    let matchingUser = data.find(
        (user) => user.username.toLowerCase() == username.toLowerCase()
    )

    let message
    if (matchingUser == null) {
        message = 'YES'
    } else {
        message = 'NO'
    }

    console.log('Is user name available? ' + message)
    res.end(message)
})

// POST request to add a user
app.post('/api/users', urlencodedParser, function (req, res) {
    console.log('Got a POST request to add a user')
    console.log('BODY -------->' + JSON.stringify(req.body))

    let data = fs.readFileSync(__dirname + '/data/users.json', 'utf8')
    data = JSON.parse(data)

    // check for duplicate username
    let matchingUser = data.find(
        (user) => user.username.toLowerCase() == req.body.username.toLowerCase()
    )
    if (matchingUser != null) {
        // username already exists
        console.log('ERROR: username already exists!')
        res.status(403).send() // forbidden
        return
    }

    let user = {
        id: getNextId('user'), // assign new id
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    }

    data.push(user)

    fs.writeFileSync(__dirname + '/data/users.json', JSON.stringify(data))

    console.log('New user added!')
    console.log(user)
    res.status(200).send()
})

// POST request to login -- sent username and password in request body
app.post('/api/login', urlencodedParser, function (req, res) {
    console.log('Got a POST request for a user to login')
    console.log('BODY -------->' + JSON.stringify(req.body))

    let data = fs.readFileSync(__dirname + '/data/users.json', 'utf8')
    data = JSON.parse(data)

    // check to see if credentials match a user
    let match = data.find(
        (user) =>
            user.username.toLowerCase() == req.body.username.toLowerCase() &&
            user.password == req.body.password
    )

    if (match == null) {
        // credentials don't match any user
        console.log("Error:  credentials don't match known user")
        res.status(403).send() // forbidden
        return
    }

    let user = {
        id: match.id,
        name: match.name,
        username: match.username,
    }

    // login successful - return user w/o password
    console.log('Login successful for: ')
    console.log(user)
    res.end(JSON.stringify(user))
})

// ------------------------------------------------------------------------------
// SITE SET-UP

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

let server = app.listen(8082, function () {
    let port = server.address().port

    console.log('App listening at port %s', port)
})
