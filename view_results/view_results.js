function main() {  
    text_box("ID:", null, {"id": "ID_text"}, null, false)
    button("Retrieve", "retrive()", null, null, false)

    if (localStorage.getItem("last_id") != null) {
        document.getElementById("ID_text").value = localStorage.getItem("last_id") 
    }
    
    return
}

function retrive() {  
    var req = new XMLHttpRequest()

    req.onreadystatechange = function () {  
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText)

            var data = JSON.parse(req.responseText)

            leaderboard(data)
        }
    }

    var url = "https://api.jsonbin.io/b/" + document.getElementById("ID_text").value
    
    req.open("GET", url, true)
    req.setRequestHeader("secret-key", "$2b$10$ZXvywFevtgaPMWHxYpcYCeFJxyfmyscDslndTeQLaOzcYodKXoTpC")
    req.send()

    return
}

function leaderboard(data) {  
    console.log(data)
    var team_totals = []
    for (var x = 0; x < data[2].team_num; x = x + 1) {
        team_totals[x] = []
        team_totals[x][0] = data[6].teams[x][0].name
        team_totals[x][1] = 0
        for (var y = 0; y < data[3].player_num; y = y + 1) {
            team_totals[x][1] = team_totals[x][1] + data[6].teams[x][2][y]
        }
    }

    console.log(team_totals)

    team_totals.sort(function(a, b) {
        return b[1] - a[1]
    })

    text("LEADERBOARD", {"class": "bold-underline"}, null, false)
    
    for (var z = 0; z < team_totals.length; z = z + 1) {
        text("Position " + (z + 1) + " | Team: " + team_totals[z][0] + " | Total Games: " + team_totals[z][1], null, null, false)
    }

    text("PLAYER STATS", {"class": "bold-underline"}, null, false)

    for (var a = 0; a < data[2].team_num; a = a + 1) {
        text("Team " + data[6].teams[a][0].name, {"text-decoration": "underline"}, null, false)
        for (var b = 0; b < data[3].player_num; b = b + 1) {
            text("Player: " + data[6].teams[a][1][b] + " | Total Score: " + data[6].teams[a][2][b], null, null, false)
        }
    }

    text("MATCHES", {"class": "bold-underline"}, null, false)

    for (var b = 0; b < data[4].match_num; b = b + 1) {
        text("MATCH " + (b + 1), {"class": "underline"}, null, false)
        text("Team 1: " + data[7].matches[b][0].team_1, null, null, false)
        text("Team 2: " + data[7].matches[b][1].team_2, null, null, false)
        for (var c = 0; c < data[5].game_num; c = c + 1) {
            text("GAME " + (c + 1), null, null, false)
            text("Doubles: " + data[7].matches[b][2].games[c][0].doubles, null, null, false)
            if (data[7].matches[b][2].games[c][0].doubles == true) {
                text("Team 1 | Players: " + data[6].teams[data[7].matches[b][0].team_1][1][data[7].matches[b][2].games[c][1].team_1[0][0]] + " and " + data[6].teams[data[7].matches[b][0].team_1][1][data[7].matches[b][2].games[c][1].team_1[0][1]] + " | Score: " + data[7].matches[b][2].games[c][1].team_1[1], null, null, false)
                text("Team 1 | Players: " + data[6].teams[data[7].matches[b][1].team_2][1][data[7].matches[b][2].games[c][2].team_2[0][0]] + " and " + data[6].teams[data[7].matches[b][1].team_2][1][data[7].matches[b][2].games[c][2].team_2[0][1]] + " | Score: " + data[7].matches[b][2].games[c][2].team_2[1], null, null, false)
            }

            else if (data[7].matches[b][2].games[c][0].doubles == false) {
                text("Team 1 | Player: " + data[6].teams[data[7].matches[b][0].team_1][1][data[7].matches[b][2].games[c][1].team_1[0][0]] + " | Score: " + data[7].matches[b][2].games[c][1].team_1[1], null, null, false)
                text("Team 2 | Player: " + data[6].teams[data[7].matches[b][1].team_2][1][data[7].matches[b][2].games[c][2].team_2[0][0]] + " | Score: " + data[7].matches[b][2].games[c][1].team_2[1], null, null, false)
            }

            else {
                throw new Error("Doubles Error")
            }
        }
    }
}

function text(text, text_attributes, append, no_br) {
    var a = document.createElement("a") // Creates new text element
    var a_text = document.createTextNode(text) // Creates new text node with text sent through
    a.appendChild(a_text) // 

    if (obj_check(text_attributes) != true) {
        console.log("obj error, text")
    }

    if (text_attributes != null) {
        setAttribute(a, text_attributes)
    }

    if (append != null) {
        append.appendChild(a)
    }

    else {
        document.body.appendChild(a)
    }

    if (!no_br) {
        if (append != null) {
            append.appendChild(document.createElement("br"))
        }

        else {
            document.body.appendChild(document.createElement("br"))
        }
    }

}

function text_box(text, text_attributes, input_attributes, append, no_br) {
    var a = document.createElement("a")
    var a_text = document.createTextNode(text)
    a.appendChild(a_text)

    if (obj_check(text_attributes)!= true || obj_check(input_attributes) != true) {
        console.log("obj error, text_box")
        return
    }

    if (text_attributes != null) {
        setAttribute(a, text_attributes)
    }

    var input = document.createElement("input")
    setAttribute(input, {"type": "text"})

    if (input_attributes != null) {
        setAttribute(input, input_attributes)
    }

    var br = document.createElement("br")

    if (append != null) {
        append.appendChild(a)
        append.appendChild(input)
        return
    }

    else {
        document.body.appendChild(a)
        document.body.appendChild(input)        
    }

    if (!no_br) {
        if (append != null) {
            append.appendChild(br)
        }

        else {
            document.body.appendChild(br)
        }
    }

    return
}

function button(text, onclick, attributes, append, no_br) {
    var button = document.createElement("button")

    button.innerHTML = text

    var obj_attr = obj_check(attributes)

    if (obj_attr != true) {
        console.log("obj error, button")
        return
    }

    setAttribute(button, {"onclick": onclick})

    if (attributes != null) {
        setAttribute(button, attributes)
    }

    if (append != null) {
        append.appendChild(button)
    }

    else {
        document.body.appendChild(button)
    }

    if (!no_br) {
        if (append != null) {
            append.appendChild(document.createElement("br"))
        }

        else {
            document.body.appendChild(document.createElement("br"))
        }
    }

    return
}

function setAttribute(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    return
}

function obj_check(obj) {
    if (typeof obj !='object') {
        return false
    } 
    return true
}