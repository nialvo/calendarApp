//get elements on html page
var cont = $('.container');
var day =$('#currentDay')

//var to create timeslots
var time;
var TIME;

//check for and retrieve local storage

var stored;

if (localStorage.thingsIHaveToDoToday997==null){
    stored = new Array(17);//17 hour work days why not
}else{
    stored = JSON.parse(localStorage.thingsIHaveToDoToday997);
}

//display day and date
var DAY = moment().format('dddd, MMMM Do YYYY')
day.text(DAY)

//Create all the timeslots
for (let i=6; i<22; i++){

    //define time (in maybe not the simplest way)
    time = i%12+1;
    TIME
    if (i<12){
        TIME = time + ":00 AM"
    }else{
        TIME = time + ":00 PM"
    }

    //create text id and button name attribute strings
    var tID=i+1;
    
    
    
    //create and append row
    var row = $('<div>');
    row.addClass('input-group');
    cont.append(row);
    //create and append time label container
    var timeC = $('<div>');
    timeC.addClass('hour mr-3 col-1');
    row.append(timeC);
    //create and append time label
    var timeL = $('<label>');
    timeL.addClass('col-form-label');
    timeL.text(TIME);
    timeC.append(timeL);
    //create and append input
    var todo = $('<input>');
    todo.addClass('form-control row col-8');
    todo.attr('id',tID);
    todo.attr('autocomplete','off');
    todo.attr('type','text');
    todo.attr('placeholder','To do..');
    todo.val(stored[i-6])//in retrospect I could have called the first slot 0 and worked backwards to get the time
    row.append(todo);
    //create and append button
    var but = $('<button>');
    but.addClass('saveBtn col-1');
    but.attr('type','button');
    but.attr('name',tID);
    row.append(but);
    //create and append button icon
    var icon = $('<i>');
    icon.addClass('fas fa-save saveBtn');
    icon.attr('name',tID);
    but.append(icon);
}


//declare time variables, get time, start counter
var h = moment().hours();
var m = moment().minutes();
var s = moment().seconds();

var delay = 1000*(60*(60-m)-s);//milliseconds till next hour 
const fullDelay = 60*60*1000;//milliseconds in 1 hour 

setColors();//adjust colors
setTimeout(moveAlong,delay);//set to repeat color adjustment at the next hour


//save to localStorage
cont.on('click', '.saveBtn', function (e) {
    let slotID=e.target.getAttribute('name');//get row # (id of text input and name of button on each row are the same)
    let slotText=$('#'+slotID).val();//get text input
    let storedIndex=Number(slotID)-7;//get array index corresponding to time slot
    stored[storedIndex]=slotText;//add to array
    localStorage.thingsIHaveToDoToday997=JSON.stringify(stored);//create or replace localStorage item
});

function moveAlong(){
    h++;//increment the hour
    setTimeout(moveAlong,fullDelay);//set to repeat in 1 h
    setColors();//adjust colors 
}

function setColors(){
    //set rows before this hour
    for(let k = 7; k<h; k++){
        $('#'+k).addClass('past')
        $('#'+k).removeClass('present')
        $('#'+k).removeClass('future')
    }
    //set row this hour
    $('#'+h).addClass('present')
    $('#'+h).removeClass('past')
    $('#'+h).removeClass('future')

    //set rows after this hour
    for(let r = h+1; r<23;r++){
        $('#'+r).addClass('future')
        $('#'+r).removeClass('present')
        $('#'+r).removeClass('past')
    }
}

