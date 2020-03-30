var data = []

function main() {
    text_box("Tournament Name: ", null, {"id": "tournament_name"}) // Creates Textbox to input tournament name
    text_box("Password: ", null, {"type": "password", "id": "password"}) // Creates Textbox to input password
    text_box("Number of Teams :", null, {"id": "team_num"}) // Creates textbox to input number of teams 
    text_box("Number of Players in Teams :", null, {"id": "player_num"}) // Creates textbox to input number of teams 
    text_box("Number of Matches: ", null, {"id": "match_num"}) // Creates textbox to input number of matches
    text_box("Number of Games per Match: ", null, {"id": "game_num"}) // Creates textbox to input number of games per match
    button("Next", "team_setup()", {"id": "submit"}) // Submit button, calls next module
    return
}

function team_setup() {
    // console.log("called") // Check

    data = [
        {"tournament_name": document.getElementById("tournament_name").value},
        {"password": document.getElementById("password").value},    
        {"team_num": parseInt(document.getElementById("team_num").value)},
        {"player_num": parseInt(document.getElementById("player_num").value)},
        {"match_num": parseInt(document.getElementById("match_num").value)},
        {"game_num": parseInt(document.getElementById("game_num").value)},
    ] // Inputs data into main array

    for (var i of data) { // Loops through elements of array
        // console.log("loop")
        for (var element in i) { //Loops through objects in position 'i' of array
            // console.log(i[element])
            if (isNaN(i[element]) == true && typeof i[element] == "number") { // Checks if value of object is a not a number
                if (document.getElementById("error_1") == null) { // Checks if element exists before showing error
                    text("ERROR: Make sure all fields have a value and the last three fields are numbers", {"id": "error_1"}) // Shows error nessage
                }
                throw new Error("Stop") // Stops program with error message "STOP"
            }

            else if (i[element] == null || i[element] == "") { // Checks if value is empty
                if (document.getElementById("error_1") == null) {
                    text("ERROR: Make sure all fields have a value and the last three fields are numbers", {"id": "error_1"})
                }
                throw new Error("Stop")
            }
        }
    }

    data[6] = {"teams": []}

    // console.log("working")

    console.log(data) // main variable check

    if (document.getElementById("error_1") != null) {
        remove("error_1") // Remove error message if exist
    }

    if (document.getElementById("team_div") != null) {
        remove_all("team_div") // Resets team_div if it exists
    } 
    
    dv({"id": "team_div", "class": "container"})

    var name = ""

    document.body.appendChild(document.createElement("br"))

    for (var x = 0; x < 2; x = x + 1) {
        switch (x) {
            case 0: name = "left_team"; break;
            case 1: name = "right_team"; break;
        }

        dv({"class": "left-float", "id": name}, document.getElementById("team_div"), true)
    }

    name = ""
    var name_num = 0

    for (var y = 0; y < data[2].team_num; y = y + 1) {
        name_num = y + 1
        name = "Team " + name_num
        button(name, "team_show("+ y +")" , null ,document.getElementById("left_team"), true)
    }

    team_show(0)

    game_setup()

    return
}

function team_show(team_num) {
    remove_all("right_team")

    text("Team " + (team_num + 1), null, document.getElementById("right_team"), true)

    text_box("Team Name: ", null, {"id": "team_" + team_num + "_name", "onchange": "team_input(null, " + team_num + ")"}, document.getElementById("right_team"), true)
    
    for (var x = 0; x < data[3].player_num; x = x + 1) {
        text_box("Player " + parseInt(x + 1) + " Name :", null, {"id": "player_" + x + "_team_" + team_num, "onchange": "team_input(" + x + ", " + team_num + ")"}, document.getElementById("right_team"), true)
    }

    // button("Submit", "team_submit(" + team_num + ")", null, document.getElementById("right_team"), true)

    var left = document.getElementById("left_team").clientHeight
    var right = document.getElementById("right_team").clientHeight

    if (left > right) {
        document.getElementById("right_team").setAttribute("style", "height: " + left + "px")
    }

    else {
        document.getElementById("left_team").setAttribute("style", "height: " + right + "px")
    }

    return
}

function team_input (player_num, team_num) {
    console.log("Working: " + player_num + " | " + team_num)
    if (data[6].teams[team_num] == undefined) {
        data[6].teams[team_num] = []
        // console.log(data)
    }

    if (data[6].teams[team_num][1] == undefined) {
        data[6].teams[team_num][1] = []
        // console.log(data)
    }

    if (data[6].teams[team_num][2] == undefined) {
        data[6].teams[team_num][2] = []
        // console.log(data)
    } // Checks if array exists in values, if false then places array in value

    if (player_num == null) {
        data[6].teams[team_num][0] = {"name": document.getElementById("team_" + team_num + "_name").value}
        return
    } // Appends name to team_arr

    data[6].teams[team_num][1][player_num] = document.getElementById("player_" + player_num + "_team_" + team_num).value // Adds plyaer_name to team
    data[6].teams[team_num][2][player_num] = 0 // Inits player_total_score
    console.log(data)

    game_show_team()

    return
}

function game_setup () {
    dv({"id": "game_div", "class": "container"})

    var name = ""

    document.body.appendChild(document.createElement("br"))

    for (var x = 0; x < 2; x = x + 1) {
        switch (x) {
            case 0: name = "left_game"; break;
            case 1: name = "right_game"; break;
        }

        dv({"class": "left-float", "id": name}, document.getElementById("game_div"), true)
    }

    name = ""
    var name_num = 0

    for (var y = 0; y < data[4].match_num; y = y + 1) {
        name_num = y + 1
        name = "Match " + name_num
        button(name, "game_dropdown_show("+ y +")" , null ,document.getElementById("left_game"), true)
    }

    game_dropdown_show(0)

    return
}

function game_dropdown_show (match) {
    $(".removal").remove()

    var nameArr = [[], []]

    nameArr[0][0] = "team_select"
    nameArr[1][0] = "Team Select"

    for (var x = 0; x < data[5].game_num; x = x + 1) {
        nameArr[0][x + 1] = "game_" + x
        nameArr[1][x + 1] = "Game " + (x + 1)
    }

    console.log(nameArr)
    dropdown("game_select", nameArr[0], nameArr[1], null, null, document.getElementById("right_game"))
    button("Next", "game_show_players(null, false, "+ match +", document.getElementById('game_select').value)", null, document.getElementById("right_game"), true)

    game_show_team(0)

    var left = document.getElementById("left_game").clientHeight
    var right = document.getElementById("right_game").clientHeight

    if (left > right) {
        document.getElementById("right_game").setAttribute("style", "height: " + left + "px")
    }

    else {
        document.getElementById("left_game").setAttribute("style", "height: " + right + "px")
    }

    return
}

function game_show_team (match) {
    $(".removal").remove()

    var valueArr = []
    var nameArr = []

    for (var i = 0; i < data[6].teams.length; i = i + 1) {
        nameArr[i] = data[6].teams[i][0].name
        valueArr[i] = "team_" + i
    }
    
    console.log(valueArr)
    console.log(nameArr)

    for (var x = 0; x < 2; x = x + 1) {
        text("Team " + (x + 1) + ": ", {"id": "team_" + x + "_game", "class": "removal"}, document.getElementById("right_game"), true)

        dropdown("team_" + x + "_select", valueArr, nameArr, {"class": "removal"}, {"class": "removal"}, document.getElementById("right_game"))
    }

    button("Next", "game_show_players([document.getElementById('team_0_select').value, document.getElementById('team_1_select').value], false, "+ match +", document.getElementById('game_select').value)", {"id": "team_button", "class": "removal"}, document.getElementById("right_game"), true )

    return
}

function game_show_players (team_num, doubles, match, game_num) {
    console.log(team_num)

    console.log(match)

    if (team_num == "team_select") {
        game_show_team()
        return
    }
    
    for (var i = 0; i < team_num.length; i = i + 1) {
        if (typeof team_num[i] == "string") {
            team_num[i] = parseInt(team_num[i].replace(/\D/g, "")) // Finds pattern (first /) of \D (all non-numerical values), with a global (g) modeifier (second /), replaces with nothing ("")        
        }
    }

    if (data[7] == undefined) {
        data[7] = {"matches":[]}
    }

    if (data[7].matches[match] == undefined) {
        data[7].matches[match] = []
    }

    if (data[7].matches[match][0] == undefined || data[7].matches[match][1] == undefined) {
        data[7].matches[match][0] = {"team_1_name": data[6].teams[team_num[0]][0].name}
        data[7].matches[match][1] = {"team_2_name": data[6].teams[team_num[1]][0].name}
    }

    console.log(data)

    // var removalArr = document.getElementsByClassName("removal")

    // for (var r = 0; r < removalArr.length; r = r + 1) {
    //     removalArr[r].parentNode.removeChild(removalArr[r])
    // }

    $(".removal").remove()
    
    var checkbox = document.createElement("input")
    text("Doubles?", {"id": "doubles_check_text", "class": "removal"}, document.getElementById("right_game"), true)
    setAttribute(checkbox, {"type": "checkbox", "onclick": "game_show_players([" + team_num + "] , true)", "id": "doubles_check", "class": "removal"})
    document.getElementById("right_game").appendChild(checkbox)

    var team_index = [[], []]
    var scoreArr = [1, 2, 3, 4, 5, 6]

    if (team_num != "team_select") {
        for (var e = 0; e < 2; e = e + 1) {
            for (var r = 0; r < data[6].teams[team_num[e]][1].length; r = r + 1) {
                team_index[0][r] = data[6].teams[team_num[e]][1][r]
                team_index[1][r] = "player_" + r + "_team_" + e
            }
        }

        if (!doubles) {
            for (var y = 0; y < 2; y = y + 1) {
                text("Player 1 of Team " + (y + 1) + ": ", {"id": "player_1_team_" + y + "_text", "class": "removal"}, document.getElementById("right_game"), true)
                dropdown("player_1_team_" + y + "_dropdown", team_index[1], team_index[0], {"class": "removal"}, {"class": "removal"}, document.getElementById("right_game"))
                text("Player 1 of Team " + (y + 1) + " Score: ", {"class": "removal"}, document.getElementById("right_game"), true)
                dropdown("player_1_team_" + y + "_score_dropdown", scoreArr, scoreArr, {"class": "removal"}, {"class": "removal"}, document.getElementById("right_game"))
            }
        }   
        
        else {
            $("#doubles_check").prop("checked", true)
            for (var q = 0; q < 2; q = q + 1) {
                text("Player " + (q + 1) + " of Team 1: ", {"id": "player_" + q + "_team_0_text","class": "removal"}, document.getElementById("right_game"), true)
                dropdown("player_" + q + "_team_0_dropdown", team_index[1], team_index[0], {"class": "removal"}, {"class": "removal"}, document.getElementById("right_game"))
            }

            text("Team 1 Score: ", {"class": "removal"}, document.getElementById("right_game"), true)
            dropdown("team_0_score_dropdown", scoreArr, scoreArr, {"class": "removal"}, {"class": "removal"}, document.getElementById("right_game"))

            for (var p = 0; p < 2; p = p + 1) {
                text("Player " + (p + 1) + " of Team 2: ", {"id": "player_" + p + "_team_1_text","class": "removal"}, document.getElementById("right_game"), true)
                dropdown("player_" + p + "_team_1_dropdown", team_index[1], team_index[0], {"class": "removal"}, {"class": "removal"}, document.getElementById("right_game"))
            }

            text("Team 2 Score: ", {"class": "removal"}, document.getElementById("right_game"), true)
            dropdown("team_1_score_dropdown", scoreArr, scoreArr, {"class": "removal"}, {"class": "removal"}, document.getElementById("right_game"))
        }

        button("Submit Game", "game_submit("+match+"," + game_num + ", "+ doubles +")", {"class": "removal"}, document.getElementById("right_game"), true)
    }

    return
}

function game_submit (match, game, doubles) {
    if (data[7].matches[match][3] == undefined) {
        data[7].matches[match][3] = {"games": []}
    }

    data[7].matches[match][3].games[game][0] = {"doubles": doubles}

    if (doubles == true) {
        data[7].matches[match][3].games[game][1] = {"team_1": [
            [document.getElementById("player_0_team_0_dropdown").value, document.getElementById("player_1_team_0_dropdown").value],
            document.getElementById("team_0_score_dropdown").value,
        ]}

        data[7].matches[match][3].games[game][2] = {"team_2": [
            [document.getElementById("player_0_team_1_dropdown").value, document.getElementById("player_1_team_1_dropdown").value],
            document.getElementById("team_1_score_dropdown").value,
        ]}
    }

    else if (doubles == false) {
        data[7].matches[match][3].games[game][1] = {"team_1": [
            document.getElementById("player_1_team_0_dropdown").value, 
            document.getElementById("player_1_team_0_score_dropdown").value
        ]}

        data[7].matches[match][3].games[game][2] = {"team_2": [
            [document.getElementById("player_1_team_1_dropdown").value, document.getElementById("player_1_team_1_score_dropdown").value],
        ]}
    }

    else {
        throw new Error("Doubles Error")
    }

    console.log(data)
    
    return
}

function dv (attributes, append) {
    var div = document.createElement("div")

    if (obj_check(attributes) != true) {
        console.log("obj error, div")
    }
    
    setAttribute(div, attributes)

    if (append != null) {
        append.appendChild(div)
    }

    else {
        document.body.appendChild(div)
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

function dropdown (selectId, valueArr, optionArr, selectAttr, optionAttr, append) {
    var select = document.createElement("select")
    setAttribute(select, {"id": selectId})

    if (obj_check(selectAttr) != true || obj_check(optionAttr) != true) {
        console.log("obj error, dropdown")
        return
    }

    if (selectAttr != null) {
        setAttribute(select, selectAttr)
    }

    if (append != null) {
        append.appendChild(select)
    }

    else {
        document.body.appendChild(select)
    }

    var option
    
    for (var x = 0; x < optionArr.length; x = x + 1) {
        option = document.createElement("option")
        if (optionAttr != null) {
            setAttribute(option, optionAttr)
        }
        
        option.innerHTML = optionArr[x]

        setAttribute(option, {"value": valueArr[x]})

        document.getElementById(selectId).appendChild(option)
    }

    return

}

function remove (id) {
    var rem = document.getElementById(id) // Gets element with id of 'id'
    rem.parentNode.removeChild(rem) // Removes node from element
    return // returns
}

function remove_all(parentId) {
    while (document.getElementById(parentId).firstChild) {
        document.getElementById(parentId).removeChild(document.getElementById(parentId).lastChild)
    }
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