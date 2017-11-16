let closeCourses;
let currentCourse;
let local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};

function loadMe(){
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data, status){
        closeCourses = JSON.parse(data);
        for(let p in closeCourses.courses){
            console.log(closeCourses.courses[p].name);
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
    $.get("https://golf-courses-api.herokuapp.com/courses/"+ courseId, function(data,status){
        currentCourse = JSON.parse(data);
        console.log(currentCourse);
    });
};
