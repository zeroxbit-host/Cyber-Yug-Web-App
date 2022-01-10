/* Slide Show Script */
var slideIndex = [1, 1, 1];
var slideId = ["mySlides1", "mySlides2", "mySlides3"]

setInterval(plusSlides, 3000, 1, 0);
setInterval(plusSlides, 3000, 1, 1);
setInterval(plusSlides, 3000, 1, 2);


function plusSlides(n, no) {
    showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
    var i;
    var x = document.getElementsByClassName(slideId[no]);
    if (n > x.length) { slideIndex[no] = 1; }
    if (n < 1) { slideIndex[no] = x.length; }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex[no] - 1].style.display = "block";
}


/* Tab Script */

// Default language and Course Name
var lang = "hindi",
    course_name = "basicComputer";

loadCrouselLang(lang, course_name);

// Script For Language And Working Perfect    
function openLang(evt, langName) {

    // To Declare All Variable
    var i, tablink;

    console.log("On Line 40 : Course Lang : " + lang + ", Course Name : basicComputer ");

    lang = langName;

    // When User will Click on Button Then Change it's color
    tablink = document.getElementsByClassName("language_name");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" w3-red", "");
    }


    tablink = document.getElementsByClassName("course_name");
    for (i = 0; i < tablink.length; i++) {

        if (i == 0 ) {
            tablink[i].className += " tab_active";
        } else {
            tablink[i].className = tablink[i].className.replace(" tab_active", "");
        }
    }
 
    // Change The Button Color of Clicked Button
    evt.currentTarget.className += " w3-red";

    loadCrouselLang(lang, 'basicComputer');
}



// Script for Course And Not working Perfect
function openCourse(evt, courseName) {

    var i, tablink;

    console.log("On Line 74 : Course Lang : " + lang + ", Course Name : " + courseName);

    // Then Update That ID
    course_name = courseName;

    /* Now i Have To Remove Css of Previous Active Button */
    tablink = document.getElementsByClassName("course_name");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" tab_active", "");
    }

    evt.currentTarget.className += " tab_active";

    loadCrouselLang(lang, course_name);

}

// Make A Function which get 1 parameter
function loadCrouselLang(lang, course_name) {
    // To Build Crousel
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        var rec_data = this.responseText;
        var obj = JSON.parse(rec_data);

        var course_title = document.getElementById("course_list").querySelectorAll(".course_title"),
            course_lang = document.getElementById("course_list").querySelectorAll(".course_lang");

        for (var i = 0; i <= 11; i++) {
            course_title[i].innerHTML = obj.course[i].title;
            course_lang[i].innerHTML = obj.course[i].lang;
        }
    }

    xhttp.open("GET", "/crousel/" + lang + "/" + course_name);
    xhttp.send();
    // Finish Build Crousel
}