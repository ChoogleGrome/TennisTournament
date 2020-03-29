function goTo(num) {
    switch(num) {
        case 1: window.open("new_tournament/new_tournament.html", "blank_"); break; 
        case 2: window.open("existing_tournament/existing_tournament.html", "blank_"); break;
        case 3: window.open("view_results/view_results.html", "blank_"); break;
        default: throw new Error("case not working, check file locations");
        
    }; 
    //Used to laod othe html files from main page
    //Case/Switch was used to minimise usage if staments, reducing number of lines
}
