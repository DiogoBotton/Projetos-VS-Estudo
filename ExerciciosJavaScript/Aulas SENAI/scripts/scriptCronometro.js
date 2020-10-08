var hh = 0;
var mm = 0;
var ss = 0;
var cc = 0;

var tempo = 10//millésimos em 1 segundo
var cron;

var hhBool = false;

var format;
function start() {
    if(!hhBool){
        cron = setInterval(timer, tempo);
        hhBool = true;
    }
}

function pause() {
    clearInterval(cron);
    hhBool = false;
}

function reset() {
    clearInterval(cron);
    hh = 0;
    mm = 0;
    ss = 0;
    cc = 0;
    mml = 0;
    hhBool = false;
    format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss) + ':' + (cc < 10 ? '0' + cc : cc);

    document.getElementById('tempo').innerHTML = format;
}

function timer() {
    cc++;

    if(cc == 100){
        ss++;
        cc = 0;
    }
    
    if(ss == 60){
        mm++;
        ss = 0;
    }
    
    if(mm == 60){
        hh++;
        mm = 0;
    }
    
    format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss) + ':' + (cc < 10 ? '0' + cc : cc);
    document.getElementById('tempo').innerHTML = format;
}