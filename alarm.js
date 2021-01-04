//Front-end Handles 
var selct_hr = document.getElementById("selct_hr");
var i = 0;
for (i=0; i<24; i++){
	if(i<10)
		i = "0"+i;
	selct_hr.innerHTML += "<option style='' value='"+i+"'>"+i+"</option>";
}

var selct_min = document.getElementById("selct_min");
var i = 0;
for (i=0; i<60; i++){
	if(i<10)
		i = "0"+i;
	selct_min.innerHTML += "<option style='' value='"+i+"'>"+i+"</option>";
}

var slct_timer_hr = document.getElementById("slct_timer_hr");
var i = 0;
for (i=0; i<24; i++){
	if(i<10)
		i = "0"+i;
	slct_timer_hr.innerHTML += "<option style='' value='"+i+"'>"+i+"</option>";
}

var slct_timer_min = document.getElementById("slct_timer_min");
var i = 0;
for (i=0; i<60; i++){
	if(i<10)
		i = "0"+i;
	slct_timer_min.innerHTML += "<option style='' value='"+i+"'>"+i+"</option>";
}

var slct_timer_sec = document.getElementById("slct_timer_sec");
var i = 0;
for (i=0; i<60; i++){
	if(i<10)
		i = "0"+i;
	slct_timer_sec.innerHTML += "<option style='' value='"+i+"'>"+i+"</option>";
}

var watch_body = document.getElementById("watch_body");
var alarm_body = document.getElementById("alarm_body");
var stopwatch_body = document.getElementById("stopwatch_body");
var timer_body = document.getElementById("timer_body");
var x = 1;
function switches(x){
	switch(x){
		case 1:
			watch_body.style.display ="block";
			alarm_body.style.display ="none";
			stopwatch_body.style.display ="none";
			timer_body.style.display ="none";
			break;
		case 2:
			watch_body.style.display ="none";
			alarm_body.style.display ="inline-block";
			stopwatch_body.style.display ="none";
			timer_body.style.display ="none";
			break;
		case 3:
			watch_body.style.display ="none";
			alarm_body.style.display ="none";
			stopwatch_body.style.display ="inline-block";
			timer_body.style.display ="none";
			break;
		case 4:
			watch_body.style.display ="none";
			alarm_body.style.display ="none";
			stopwatch_body.style.display ="none";
			timer_body.style.display ="inline-block";
			break;
	}
}


// function for showing the live time
	var date = new Date();
	var time = document.getElementById("time");
	var hours = date.getHours();
	//hours %=12;
	if(hours <10)
		hours = "0"+hours;
	var minutes = date.getMinutes();
	if(minutes <10)
		minutes = "0"+minutes;
	var seconds = date.getSeconds();
	if(seconds <10)
		seconds = "0"+seconds;
	
	time.innerHTML = hours+"<span class='toggle'>:</span>"+minutes+"<span class='toggle'>:</span>"+seconds;
setInterval(function(){
	var date = new Date();
	var time = document.getElementById("time");
	var hours = date.getHours();
	//hours %=12;
	if(hours <10)
		hours = "0"+hours;
	var minutes = date.getMinutes();
	if(minutes <10)
		minutes = "0"+minutes;
	var seconds = date.getSeconds();
	if(seconds <10)
		seconds = "0"+seconds;
	
	time.innerHTML = hours+"<span class='toggle'>:</span>"+minutes+"<span class='toggle'>:</span>"+seconds;
	if(alarm_hr == hours && alarm_min == minutes){
		
		alarm_tone.loop = true;
		alarm_tone.play();
		alarm_tone.volume = 1;
		alarm_hr = null;
		set_alarm_btn.disabled = false;
		set_alarm_btn.innerHTML = "STOP ALARM";
		console.log("button enabled");
	}
	if(parseInt(minutes) == parseInt(alarm_min)+1){
		stop_alarm();
	}
},1000);

//Alarm Section

var alarm_hr = null;
var alarm_min = null;
var alarm_tone = document.getElementById("alarm_tone");
var set_alarm_btn = document.getElementById("set_alarm_btn");

function set_alarm(){
	alarm_hr = selct_hr.value;
	alarm_min = selct_min.value;
	set_alarm_btn.disabled = true;
	console.log("button disabled");
}
function stop_alarm(){
	alarm_tone.pause();
	alarm_tone.load();
	set_alarm_btn.innerHTML = "SET ALARM"
	alarm_min = null;
	alarm_hr = null;
}

function alarm_onoff(){
	if(set_alarm_btn.innerHTML == "SET ALARM"){
		set_alarm();
	}
	else{
		stop_alarm();
	}
}


//stopwatch section
var timeout;
var stopwatchMSec = document.getElementById("stopwatch_msec");
var stopwatchSec = document.getElementById("stopwatch_sec");
var stopwatchMin = document.getElementById("stopwatch_min");
var stopwatchHr = document.getElementById("stopwatch_hr");

var MSec = parseInt(stopwatchMSec.innerHTML);
var Sec = parseInt(stopwatchSec.innerHTML);
var Min = parseInt(stopwatchMin.innerHTML);
var Hr = parseInt(stopwatchHr.innerHTML);

var lapMSec = 0;
var lapSec = 0;
var lapMin = 0;
var lapHr = 0;
function start_stopwatch(){
	timeout = setInterval(function(){
		
		MSec = parseInt(MSec);
		Sec = parseInt(Sec);
		Min = parseInt(Min);
		Hr = parseInt(Hr);
		
		MSec += 1;
		lapMSec += 1;
		
		if(MSec < 10)
			MSec = "0"+MSec;
		if(MSec == 100){
			MSec = "0"+0;
			Sec += 1;
			if (Sec<10)
				Sec = "0"+Sec;
			if(Sec == 60){
				Sec = 0;
				Min += 1;
				if(Min<10)
					Min = "0"+Min;
				if(Min == 60){
					Min = 0;
					Hr += 1;
					if(Hr<10)
						Hr = "0"+Hr;
					stopwatchHr.innerHTML = Hr;
				}
				stopwatchMin.innerHTML = Min;
			}
			stopwatchSec.innerHTML = Sec;
		}
		stopwatchMSec.innerHTML = MSec;
		
		
		if(lapMSec == 100){
			lapMSec = 0;
			lapSec += 1;
			if(lapSec == 60){
				lapSec = 0;
				lapMin += 1;
				if(lapMin == 60){
					lapMin = 0;
					lapHr += 1;
				}
			}
		}
		
	},10);
}	

function stopwatch_toggle(){
	var stopwatch_btn = document.getElementById("stopwatch_btn");
	var clear_btn = document.getElementById("clear_btn");
	if(stopwatch_btn.value == "Start"){
		start_stopwatch();
		stopwatch_btn.value = "Stop";
		clear_btn.value = "Laps";
	}
	else{
		stopwatch_btn.value = "Start";
		clear_btn.value = "Clear";
		clearInterval(timeout);
		clear_btn.disabled = false;
		
	}
}

function stopwatch_clear(){
	var clear_btn = document.getElementById("clear_btn");
	var stopwatch_laps = document.getElementById("stopwatch_laps");
	if(clear_btn.value =="Clear"){
		stopwatchMSec.innerHTML = "00";
		stopwatchSec.innerHTML = "00";
		stopwatchMin.innerHTML = "00";
		stopwatchHr.innerHTML = "00";
		MSec = Sec = Min = Hr = 0;
		lapMSec = lapSec = lapMin = lapHr = 0;
		stopwatch_laps.innerHTML = "";
		stopwatch_laps.style.display = "none";
	}
	else{
		stopwatch_laps.style.display = "block";
		if(lapHr<10)
			lapHr = "0"+lapHr;
		if(lapMin<10)
			lapMin = "0"+lapMin;
		if(lapSec<10)
			lapSec = "0"+lapSec;
		if(lapMSec<10)
			lapMSec = "0"+lapMSec;
		stopwatch_laps.innerHTML += "<div class='lapses'><span id='lap_hr'>"+lapHr+"</span>:<span id='lap_min'>"+lapMin+"</span>:<span id='lap_sec'>"+lapSec+"</span>:<span id='lap_msec'>"+lapMSec+"</span></div>";
		lapMSec = lapSec = lapMin = lapHr = 0;
	}
}


// Timer Section
var slct_timer_hr = document.getElementById("slct_timer_hr");
var slct_timer_min = document.getElementById("slct_timer_min");
var slct_timer_sec = document.getElementById("slct_timer_sec");

var timer_hr = null;
var timer_min = null;
var timer_sec = null;
var showtimer_hr = document.getElementById("showtimer_hr");
var showtimer_min = document.getElementById("showtimer_min");
var showtimer_sec = document.getElementById("showtimer_sec");
var set_timer = document.getElementById("set_timer");
var slct_timer = document.getElementById("slct_timer");
var timer = document.getElementById("timer");
function set_timr(){
	if(set_timer.innerHTML == "SET TIMER"){
		console.log("set_timer_time is working ");
		set_timer_time();
	}
	else{
		set_timer.innerHTML = "SET TIMER";
		set_timer.style.display = "block";
		slct_timer.style.display = "block";
		timer.style.display = "none";
		timer_tone.pause();
		timer_tone.load();
		
	}
}
function set_timer_time(){
	showtimer_hr.innerHTML = timer_hr = slct_timer_hr.value;
	showtimer_min.innerHTML = timer_min = slct_timer_min.value;
	showtimer_sec.innerHTML = timer_sec = slct_timer_sec.value;
	slct_timer.style.display = "none";
	timer.style.display = "block";
	set_timer.style.display = "none";
	start_timer();
	console.log("again working");
}

function start_timer(){
	var timer_stop = setInterval(function(){
		timer_hr = parseInt(timer_hr);
		timer_min = parseInt(timer_min);
		timer_sec = parseInt(timer_sec);
		
		if(timer_hr>0 || timer_min>0 ||timer_sec>0 ){
			var m_check = 0;
			var h_check = 0;
			if(timer_sec ==0 && (timer_min >0 || timer_hr>0)){
				timer_sec = 60;
				if(timer_min != 0){
					timer_min -= 1;
					m_check = 1;
				}
				if(timer_min == 0 && timer_hr > 0){
					timer_min = 59;
					timer_hr -= 1;
					m_check = 1;
					h_check = 1;
				}
			}
			
			timer_sec -=1;
			
			if(timer_sec < 10)
				timer_sec = "0"+timer_sec;
			showtimer_sec.innerHTML = timer_sec;
			if(m_check == 1){
				if(timer_min < 10)
					timer_min = "0"+timer_min;
				showtimer_min.innerHTML = timer_min;
			}
			if(h_check == 1){
				if(timer_hr < 10)
					timer_hr = "0"+timer_hr;
				showtimer_hr.innerHTML = timer_hr;
			}
		}
		else{
			clearInterval(timer_stop);
			var timer_tone = document.getElementById("timer_tone");
			timer_tone.loop = true;
			timer_tone.play();
			set_timer.innerHTML = "STOP";
			set_timer.style.display = "block";
			console.log("timer has stopped ");
		}
	},1000);
}