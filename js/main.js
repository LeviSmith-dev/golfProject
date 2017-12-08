let closeCourses;
let currentCourse;
let local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};
let numHoles;
let numPlayers = 4;
let map;


function initMap(holeId, myTee){
    let tee = currentCourse.course.holes[holeId].tee_boxes[myTee].location;
    let green = currentCourse.course.holes[holeId].green_location;

    map = new google.maps.Map(document.getElementById('map'),{
        center: tee,
        mapTypeId: 'satellite',
        zoom:16
    });
    let marker = new google.maps.Marker({
        position: green,
        label: 'Green',

        map:map
    });
    let marker2 = new google.maps.Marker({
        position: tee,
        label: 'Tee',
        map:map
    });

    $('#map').addClass('shadow');

}

function loadMe(){
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data, status){
        closeCourses = JSON.parse(data);
        for(let p in closeCourses.courses){
            // console.log(closeCourses.courses[p].name);
        };
    });
};



function courses(){
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data, status){
        closeCourses = JSON.parse(data);
        for(let c in closeCourses.courses){
            $('.courses').append("<option value=" + closeCourses.courses[c].id + ">"+ closeCourses.courses[c].name + "</option>");
        }
    });
};

function getCourse(courseId){
    $('#teeSelect').html('');
    $.get("https://golf-courses-api.herokuapp.com/courses/"+ courseId, function(data,status){
        currentCourse = JSON.parse(data);
        console.log(currentCourse);
        for(let t in currentCourse.course.tee_types){
            let teeName = currentCourse.course.tee_types[t].tee_type;
            $('#teeSelect').append("<option value='" + t +"'>" + teeName +"</option>");
        };
        $('.top').append("<h1 class='name'>" + currentCourse.course.name + "</h1>")
    });
};

function buildCard(myTee){
    numHoles = currentCourse.course.holes;
    for(let c in numHoles){
        let holePar = currentCourse.course.holes[c].tee_boxes[myTee].par;
        $('.scoreColumn').append("<div id='columns" + (Number(c) + 1) +"' class='columns'><span class='holes' onclick='initMap(" + c + ',' + myTee +")'>hole: " + (Number(c)+ 1) + "<br> par: " + holePar+ "</span></div>");
    }
    let yards = currentCourse.course.tee_types[myTee].yards;
    $(".scoreColumn").append("<div class='totalC columns'><span class='holes'>Score</span></div>");
    $(".scoreColumn").append("<div class='yards columns'>Total course Yards " + yards + "</div>");
    fillCard();
    $('.card').addClass('shadow');
}

function fillCard(){
    for(let p = 1; p <= numPlayers; p++){
        // console.log(p);
        $(".player").append("<div id='pl"+ p +"' class='fa fa-minus-circle players red' onclick='deletePlayer(" + p + ")'><span contenteditable='true' >Player" + p + " </span></div");
        $(".totalC").append("<input type='text' class='holeInput' id='totalHole" + p +"'>");
        for(let h = 1; h <= numHoles.length; h++){
            // console.log(h);
            $('#columns' + h).append("<input id='player"+ p +"hole" + h + "'type='text' class='holeInput' onkeyup='updateScore(" + p + ")'/>");
        }
    }

}

function deletePlayer(playerId){
    $('#pl' + playerId).remove();
    for(let h = 1; h <= numHoles.length; h++){
        $("#player" + playerId + "hole" + h).remove();
    }
}

function updateScore(playerId){
    let playerTotal = 0;
    for(let h = 1; h <= numHoles.length; h++){
        playerTotal += Number($("#player" + playerId + "hole" + h).val());
    }
    $("#totalHole" + playerId).val(playerTotal);
}

function displayImage(holeId){
    let img = currentCourse.course.thumbnail;
    $('.currentHole').append("<img src='"+ img +"' alt='current hole'>");
}

// currentCourse.course.holes.tee_boxes[0].id


// function getWeather(cityName){
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (xhttp.readyState == 4 && xhttp.status == 200){
//             var obj = JSON.parse(xhttp.responseText);
//             weatherstuff = obj;
//             document.getElementById("currentConditions").innerHTML = obj.weather[0].description;
//             document.getElementById("currentTemp").innerHTML = tempConverter(Number(obj.main.temp));
//             document.getElementById("weatherImg").src = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
//         }
//     }
//
//     xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=cb2ca26a92769e0365c06b8b12256611", true);
//     xhttp.send();
// }
//
// function tempConverter(kelvin){
//     let k = +kelvin - 273.15;
//     let f = k * 9/5 +32;
//     return Math.round(f);
//
// }