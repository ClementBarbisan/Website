content = parent.iframe.parentElement;
iframe = parent.iframe;
init();
function init()
{
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        var element = document.createElement("button");
        element.id ="close";
        element.type = "button";
        element.value = "X";
        element.setAttribute("style", "position:absolute; left:90%; top:2%;transform:scale(3,3)")
        element.name = "close";
        element.innerText = "X";
        element.onclick = closeFrame;
        //var div = iframe.createElement("div");
        //div.appendChild(element);
        iframe.contentWindow.document.getElementById("data").appendChild(element);
        for (var i in iframe.contentWindow.document.getElementsByClassName("text")) {
            iframe.contentWindow.document.getElementsByClassName("text")[i].setAttribute("style", "float:left");
        }

    }
}

function closeFrame()
{
    if (parent.scale <= 0.0001) {
        iframe.src = "";
        return;
    }
    else
        requestAnimationFrame(closeFrame);
    parent.scale /= 1.1;
    content.style.zoom = parent.scale;
    content.style.transform = ("scale(" + parent.scale + ")");
}