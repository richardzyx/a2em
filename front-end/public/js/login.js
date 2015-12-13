/**
 * Created by nicolassempere on 11/5/15.
 */

URL = "http://localhost:3000/login?";

function submitUserPass() {

    console.log("Submitting credentials");
    var request = new XMLHttpRequest();
    var credentials =  "username=" + document.getElementById("inputLogin") +
                       "&password=" + document.getElementById("inputPassword");


    request.open('POST', URL, true);
    request.onreadystatechange = proceed;

    request.send(credentials);
}


function proceed () {

    console.log("Call returned");

    if (request.readyState == 4 && request.status == 200) {
        //render page.
        console.log(request.response);
        document.write(JSON.parse(request.response));
    }
}