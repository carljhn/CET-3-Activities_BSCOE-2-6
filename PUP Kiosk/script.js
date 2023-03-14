function displayDetails(imgUsed, structure, details) {
    let pop = document.getElementById("display");
    let pop0 = document.getElementById("body");
    pop0.style.overflow = "hidden";
    document.addEventListener("mousemove", followPointer);
    pop.style.left = event.clientX + 25 + "px";
    pop.style.top = event.clientY + -150 + "px";
    pop.innerHTML =
    "<div id = 'details-cont'> <img id='imgid' src='" + imgUsed + "'>" + 
    "<p id='structure'>" + structure +
    "</p>" + "<p id='desc'>" + details + "</p></div>";
}

function followPointer() {
    let move = document.getElementById("display");
    move.style.left = event.clientX + 25 + "px";
    move.style.top = event.clientY + -150 + "px";
}

function removeDetails() {
    let move1 = document.getElementById("display");
    let box = document.getElementById("body");
    move1.removeAttribute("style");
    box.removeAttribute("style");
    document.removeEventListener("mousemove", followPointer);
    move1.removeChild(move1.childNodes[0]);
}

