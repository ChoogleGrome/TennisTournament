var data = []
// document.body.style.border = null

function main() {
    text_box("Tournament Name: ", null, {"id": "tournament_name"}) // Creates Textbox to input tournament name
    // text_box("Password: ", null, {"type": "password", "id": "password"}) // Creates Textbox to input password
    text_box("Number of Teams :", null, {"id": "team_num"}) // Creates textbox to input number of teams 
    text_box("Number of Players in Teams :", null, {"id": "player_num"}) // Creates textbox to input number of teams 
    text_box("Number of Matches: ", null, {"id": "match_num"}) // Creates textbox to input number of matches
    text_box("Number of Games per Match: ", null, {"id": "game_num"}) // Creates textbox to input number of games per match
    button("Next", "team_setup()", {"id": "submit", "class": "button_removal"}) // Submit button, calls next module
    return
}

function team_setup() {
    // console.log("called") // Check

    $(".button_removal").remove()

    data = [
        {"tournament_name": document.getElementById("tournament_name").value},
        {"password": null},    
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

    // document.body.appendChild(document.createElement("br"))

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

    button("Next", "match_show()", {"class": "button_removal"}, null, false)

    team_show(0)

    // game_setup()

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

    // game_show_team(0)

    
    return
}

function match_show() {
    $(".error_2").remove()

    if (data[6].teams.length != data[2].team_num) {
        text("Please fill in all team names and players before continuing", {"class": "error_2"}, null, true)
        return
    }

    else {
        for (var x = 0; x < data[6].teams.length; x = x + 1) {
            if (data[6].teams[x][1].length != data[3].player_num) {
                text("Please fill in all team names and players before continuing", {"class": "error_2"}, null, true)
                return
            }
        }
    }

    $(".button_removal").remove()

    for (var y = 0; y < data[4].match_num; y = y + 1) {
        text("Match " + (y + 1), null, null, false)
        dv({"id": "match_div_" + y, "class": "container"})
        for (var z = 0; z < 2; z = z + 1) {
            switch (z) {
                case 0: dv({"class": "left-float", "id": "left_match_" + y}, document.getElementById("match_div_" + y), true); break;
                case 1: dv({"class": "right-float", "id": "right_match_" + y}, document.getElementById("match_div_" + y), true); break;
            }
    
            // dv({"class": "left-float", "id": name}, document.getElementById("match_div_" + y), true)
        }

        // button("Team Select", "team_select(" + y + ")", null, document.getElementById("left_match_" + y), false)

        for (var z = 0; z < data[5].game_num; z = z + 1) {
            button("Game " + (z + 1), "doubles_select(" + y + "," + z + ")", null, document.getElementById("left_match_" + y), true)
        }

        match_team_select(y)
    }

    return
}

function match_team_select(match_num) {
    var val_arr = []
    var opt_arr = []

    for (var y = 0; y < data[2].team_num; y = y + 1) {
        opt_arr[y] = data[6].teams[y][0].name
        val_arr[y] = y
    }

    for (var x = 0; x < 2; x = x + 1) {
        // text_box("Team " + (x + 1), {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num, "onchange": "match_team_input(" + match_num + ", " + x + ")"}, document.getElementById("right_match_" + match_num), false)
        text("Team " + (x + 1), {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("match_" + match_num + "_team_" + x, val_arr, opt_arr, {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
    }

    button("Next", "match_team_input(" + match_num + ")", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)

    // var left = document.getElementById("left_match_" + match_num).clientHeight
    // var right = document.getElementById("right_match_" + match_num).clientHeight

    // if (left > right) {
    //     document.getElementById("left_match_" + match_num).setAttribute("style", "height: " + left + "px")
    // }

    // else {
    //     document.getElementById("right_match" + match_num).setAttribute("style", "height: " + right + "px")
    // }

    document.getElementById("right_match_" + match_num).setAttribute("style", "height: " + document.getElementById("left_match_" + match_num + "px"))

    return
}

function match_team_input(match_num) {
    if (data[7] == null) {
        data[7] = {"matches": []}
    }

    if (data[7].matches[match_num] == null) {
        data[7].matches[match_num] = [
            {"team_1": parseInt(document.getElementById("match_" + match_num + "_team_0").value)},
            {"team_2": parseInt(document.getElementById("match_" + match_num + "_team_1").value)},
            {"games": []}
        ]
    }

    console.log(data)

    doubles_select(match_num, 0)

    return
} 

class Game {
    constructor(team_1, team_2) {
        this.team_1 = team_1
        this.team_2 = team_2
    }
}

class Singles extends Game {
    constructor(team_1, team_2, doubles, player_1_team_1, player_1_team_2) {
        super(team_1)
        super(team_2)
        this.doubles = doubles
        this.player_1_team_1 = player_1_team_1
        this.player_1_team_2 = player_1_team_2
    }
}

class Doubles extends Game {
    constructor(team_1, team_2, doubles, player_1_team_1, player_2_team_1, player_1_team_2, player_2_team_2) {
        super(team_1)
        super(team_2)
        this.doubles = doubles
        this.player_1_team_1 = player_1_team_1
        this.player_2_team_1 = player_2_team_1
        this.player_1_team_2 = player_1_team_2
        this.player_2_team_2 = player_2_team_2
    }
}

function doubles_select (match_num, game_num) {
    if (data[7].matches[match_num] == null) {
        throw new Error("NO TEAM")
    }

    $(".team_remove_match_" + match_num).remove()

    text("Game " + (game_num + 1), {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
    text("Doubles: ", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)

    var doubles_checkbox = document.createElement("input")
    setAttribute(doubles_checkbox, {"id": "doubles_check_match_" + match_num + "_game_" + game_num, "type": "checkbox", "class": "team_remove_match_" + match_num})
    document.getElementById("right_match_" + match_num).appendChild(doubles_checkbox)

    button("Next", "game_select(" + match_num + ", "  + game_num + ", $('#doubles_check_match_" + match_num + "_game_" + game_num +"').is(':checked'))", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)

    return
}

function game_select(match_num, game_num, doubles) {
    $(".team_remove_match_" + match_num).remove()

    var score_arr = [0, 1, 2, 3, 4, 5, 6]
    var team_opt_arr = [[], []]
    var team_val_arr = [[], []]
    var team

    for (var x = 0; x < 2; x = x + 1) {
        switch(x) {
            case 0: team = data[7].matches[match_num][0].team_1; break;
            case 1: team = data[7].matches[match_num][1].team_2; break;
            default: throw new Error("team switch error");
        }

        console.log(team)

        for (var y = 0; y < data[6].teams[team][1].length; y = y + 1) {
            switch(x) {
                case 0: team_opt_arr[0][y] = data[6].teams[team][1][y]; team_val_arr[0][y] = y; break; 
                case 1: team_opt_arr[1][y] = data[6].teams[team][1][y]; team_val_arr[1][y] = y; break;
            }
        }
    }

    console.log(team_opt_arr)
    console.log(team_val_arr)

    data[7].matches[match_num][2].games[game_num] = []
    data[7].matches[match_num][2].games[game_num][0] = {"doubles": doubles}

    console.log(data)

    text("Game " + (game_num + 1), {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
    
    if (doubles == true) {
        text("Player 1 of Team 1", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("player_1_team_1_match_" + match_num + "_game_" + game_num, team_val_arr[0], team_opt_arr[0], {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))

        text("Player 2 of Team 1", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("player_2_team_1_match_" + match_num + "_game_" + game_num, team_val_arr[0], team_opt_arr[0], {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
        
        text("Score of Team 1", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("score_team_1_match_" + match_num + "_game_" + game_num, score_arr, score_arr, {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
        
        text("Player 1 of Team 2", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("player_1_team_2_match_" + match_num + "_game_" + game_num, team_val_arr[0], team_opt_arr[0], {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))

        text("Player 2 of Team 2", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("player_2_team_2_match_" + match_num + "_game_" + game_num, team_val_arr[0], team_opt_arr[0], {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
        
        text("Score of Team 2", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("score_team_2_match_" + match_num + "_game_" + game_num, score_arr, score_arr, {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
    }

    else if (doubles == false) {
        text("Player 1 of Team 1", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("player_1_team_1_match_" + match_num + "_game_" + game_num, team_val_arr[0], team_opt_arr[0], {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
        
        text("Score of Player 1 of Team 1", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("score_team_1_match_" + match_num + "_game_" + game_num, score_arr, score_arr, {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
        
        text("Player 1 of Team 2", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("player_1_team_2_match_" + match_num + "_game_" + game_num, team_val_arr[1], team_opt_arr[1], {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
    
        text("Score of Player 1 of Team 2", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)
        dropdown("score_team_2_match_" + match_num + "_game_" + game_num, score_arr, score_arr, {"class": "team_remove_match_" + match_num}, {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num))
    }

    else {
        throw new Error("Game Show Error")
    }

    button("Next", "game_submit(" + match_num + ", " + game_num + "," + doubles + ")", {"class": "team_remove_match_" + match_num}, document.getElementById("right_match_" + match_num), true)

    return
}

function game_submit(match_num, game_num, doubles) {
    data[7].matches[match_num][2].games[1] = {"team_1": [[], parseInt(document.getElementById("score_team_1_match_" + match_num + "_game_" + game_num).value)]}
    data[7].matches[match_num][2].games[2] = {"team_2": [[], parseInt(document.getElementById("score_team_2_match_" + match_num + "_game_" + game_num).value)]}

    if (doubles == true) {
        data[7].matches[match_num][2].games[1].team_1[0][0] = parseInt(document.getElementById("player_1_team_1_match_" + match_num + "_game_" + game_num).value)
        data[7].matches[match_num][2].games[1].team_1[0][1] = parseInt(document.getElementById("player_2_team_1_match_" + match_num + "_game_" + game_num).value)
        
        data[6].teams[data[7].matches[match_num][0].team_1][2][data[7].matches[match_num][2].games[1].team_1[0][0]] = data[6].teams[data[7].matches[match_num][0].team_1][2][data[7].matches[match_num][2].games[1].team_1[0][0]] + parseInt(data[7].matches[match_num][2].games[1].team_1[1])
        data[6].teams[data[7].matches[match_num][0].team_1][2][data[7].matches[match_num][2].games[1].team_1[0][1]] = data[6].teams[data[7].matches[match_num][0].team_1][2][data[7].matches[match_num][2].games[1].team_1[0][1]] + parseInt(data[7].matches[match_num][2].games[1].team_1[1])

        data[7].matches[match_num][2].games[2].team_2[0][0] = parseInt(document.getElementById("player_1_team_2_match_" + match_num + "_game_" + game_num).value)
        data[7].matches[match_num][2].games[2].team_2[0][1] = parseInt(document.getElementById("player_2_team_2_match_" + match_num + "_game_" + game_num).value)

        data[6].teams[data[7].matches[match_num][1].team_2][2][data[7].matches[match_num][2].games[2].team_2[0][0]] = data[6].teams[data[7].matches[match_num][1].team_2][2][data[7].matches[match_num][2].games[2].team_2[0][0]] + parseInt(data[7].matches[match_num][2].games[2].team_2[1])
        data[6].teams[data[7].matches[match_num][1].team_2][2][data[7].matches[match_num][2].games[2].team_2[0][1]] = data[6].teams[data[7].matches[match_num][1].team_2][2][data[7].matches[match_num][2].games[2].team_2[0][1]] + parseInt(data[7].matches[match_num][2].games[2].team_2[1])
    }

    else if (doubles == false) {
        data[7].matches[match_num][2].games[1].team_1[0][0] = parseInt(document.getElementById("player_1_team_1_match_" + match_num + "_game_" + game_num).value)

        data[6].teams[data[7].matches[match_num][0].team_1][2][data[7].matches[match_num][2].games[1].team_1[0][0]] = data[6].teams[data[7].matches[match_num][0].team_1][2][data[7].matches[match_num][2].games[1].team_1[0][0]] + parseInt(data[7].matches[match_num][2].games[1].team_1[1])

        data[7].matches[match_num][2].games[2].team_2[0][0] = parseInt(document.getElementById("player_1_team_2_match_" + match_num + "_game_" + game_num).value)

        data[6].teams[data[7].matches[match_num][1].team_2][2][data[7].matches[match_num][2].games[2].team_2[0][0]] = data[6].teams[data[7].matches[match_num][1].team_2][2][data[7].matches[match_num][2].games[2].team_2[0][0]] + parseInt(data[7].matches[match_num][2].games[2].team_2[1])
    }

    else {
        throw new Error("Doubles Submit Error")
    }

    console.log(data)

    if (document.getElementById("final") == null) {
        button("Finish (MAKE SURE ALL DATA ENTERED)", "final()", {"id": "final"}, null, false)
    }

    if (game_num < (data[5].game_num - 1)) {
        doubles_select(match_num, (game_num + 1))
    }
    
    return
}

function final() {  
    var req = new XMLHttpRequest() 

    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText)

            var response = req.responseText
            response = JSON.parse(response)

            text("Successfully Posted, Acced ID: " + response.id, null, null, true)
            localStorage.setItem("last_id", response.id)
        }
    }

    req.open("POST", "https://api.jsonbin.io/b", true)
    req.setRequestHeader("Content-Type", "application/json")
    req.setRequestHeader("secret-key", "$2b$10$ZXvywFevtgaPMWHxYpcYCeFJxyfmyscDslndTeQLaOzcYodKXoTpC")
    req.send(JSON.stringify(data))
    return
}

function dv(attributes, append) {
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