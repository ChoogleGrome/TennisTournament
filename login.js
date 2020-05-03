function main() {
    var username = prompt("Username") // Gets Username
    var password = prompt("Password") // Gets password
    var date = new Date // Initialises date class
    // date = date.getTime()

    var login = check(username, password, date.getTime()) // Runs chekcing function, returns error message or true bool

    if (login != true) {
        alert(login)
    } // Prints error message if login is false

    else {
        alert("Sucess") //Indicates Success
    }
}

function check(username, password, logon_time) {
    var date = new Date // Initialises date class
    date = date.getTime // gets time (ms)
    if (username == right_username) { // Checks if username matches
        if (password == right_password) { // Checks if password matches
            if (date < (logon_time + 120000)) { // Checks time since last logon
                return true
            }
            else {
                return "Timeout"  
            }
        }
        else {
            return "Wrong Password"
        }
    }
    else {
        return "Wrong Username"
    }
}