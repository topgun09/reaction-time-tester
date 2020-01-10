// response time test, created by Jasper van Zandbeek
// e-mail: jasperz@stack.urc.tue.nl
var startTime = new Date();
var endTime = new Date();
var startPressed = false;
var bgChangeStarted = false;
var maxWait = 20;
var timerID;
function randomHexColor(){
    var hexColor=[]; //new Array()
    hexColor[0] = "#"; //first value of array needs to be hash tag for hex color val, could also prepend this later

    for (i = 1; i < 7; i++)
    {
        var x = Math.floor((Math.random()*16)); //Tricky: Hex has 16 numbers, but 0 is one of them

        if (x >=10 && x <= 15) //hex:0123456789ABCDEF, this takes care of last 6 
        {
            switch(x)
            {
                case 10: x="a" 
                break;
                case 11: x="b" 
                break;
                case 12: x="c" 
                break;
                case 13: x="d" 
                break;
                case 14: x="e" 
                break;
                case 15: x="f" 
                break;  
            }
        }
        hexColor[i] = x;
    }
    var cString = hexColor.join(""); //this argument for join method ensures there will be no separation with a comma
    return cString;
}
function startTest() {
    var c = randomHexColor();
    document.bgColor = c;
    bgChangeStarted = true;
    startTime = new Date();
}
function remark(responseTime) {
    var responseString = "";
    if (responseTime > 0 && responseTime < 0.01)
        responseString = "You are the king!"
    if (responseTime > .01 && responseTime < .05)
        responseString = "You have the reflexes of a snake";
    if (responseTime >= 0.05 && responseTime < .10)
        responseString = "Well done!";
    if (responseTime >= 0.10 && responseTime < 0.20)
        responseString = "Nice!";
    if (responseTime >= 0.20 && responseTime < 0.30)
        responseString = "Could be better ... ";
    if (responseTime >= 0.30 && responseTime < 0.60)
        responseString = "Keep practicing!";
    if (responseTime >= 0.60 && responseTime < 1)
        responseString = "Where did you go?";
    if (responseTime >= 1)
        responseString = "Did you fall asleep?";
    return responseString;
}
function stopTest() {
    if (bgChangeStarted) {
        endTime = new Date();
        var responseTime = (endTime.getTime() - startTime.getTime()) / 1000;
        document.bgColor = "white";
        alert("Your response time is: " + responseTime + " seconds " + "\n" + remark(responseTime));
        startPressed = false;
        bgChangeStarted = false;
    } else {
        if (!startPressed) {
            alert("press start first to start test");
        } else {
            clearTimeout(timerID);
            startPressed = false;
            alert("cheater! you pressed too early!");
        }
    }
}
var randMULTIPLIER = 0x015a4e35;
var randINCREMENT = 1;
var today = new Date();
var randSeed = today.getSeconds();
function randNumber() {
    randSeed = (randMULTIPLIER * randSeed + randINCREMENT) % (1 << 31);
    return ((randSeed >> 15) & 0x7fff) / 32767;
}
function startit() {
    if (startPressed) {
        alert("Already started. Press stop to stop");
        return;
    } else {
        startPressed = true;
        timerID = setTimeout('startTest()', 6000 * randNumber());
    }
}