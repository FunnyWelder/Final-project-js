import ('../css/puzzle.css');

let piezas = document.getElementsByClassName('movil');

var tamWidh;
var tamHeight;
var origX;
var origY;
var win;

if (piezas.length === 9) {
    tamWidh = [134,192,134,
               163,134,163,
               134,192,134];
    tamHeight = [163,134,163,
                 134,192,134,
                 163,134,163];
    origX = [200,304,466,
             200,333,437,
             200,304,466];
    origY = [100,100,100,
             233,204,233,
             337,366,337];
    win = new Audio(src="../assets/sounds/oh_no.mp3");
}

if (piezas.length === 16) {
    tamWidh = [155,155,155,125,
               155,185,185,185,
               155,125,185,125,
               155,185,125,155];
    tamHeight = [155,155,155,125,
                 155,185,185,185,
                 155,125,185,125,
                 155,185,125,155];
    origX = [300,425,550,675,
             300,395,520,645,
             300,425,520,675,
             285,395,550,645];
    origY = [15,0,0,15,
             140,110,110,110,
             250,265,250,265,
             360,345,390,360];
    win = new Audio(src="../assets/sounds/nice.mp3");
}

if (piezas.length === 25) {
    tamWidh = [150,150,180,120,150,
               150,150,150,180,150,
               150,180,120,150,150,
               150,180,180,120,150,
               150,120,180,150,150];
    tamHeight = [150,150,180,120,150,
                 150,150,150,180,150,
                 150,180,120,150,150,
                 150,180,180,120,150,
                 150,120,180,150,150];
    origX = [285,390,510,660,750,
             300,420,540,645,765,
             300,405,540,630,750,
             285,390,525,660,750,
             300,420,510,645,750];
    origY = [0,-15,-15,0,0,
             120,90,120,90,120,
             225,210,240,240,225,
             330,345,330,360,330,
             450,480,450,450,450,];
    win = new Audio(src="../assets/sounds/oh_my_god.mp3");
}

for(let i=0;i<piezas.length;i++){
    piezas[i].setAttribute("width", tamWidh[i]);
    piezas[i].setAttribute("height",tamHeight[i]);
    piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
    piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
    piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");
}

var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
    elementSelect = reordenar(evt);
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentPosx = parseFloat(elementSelect.getAttribute("x"));
    currentPosy = parseFloat(elementSelect.getAttribute("y"));
    elementSelect.setAttribute("onmousemove","moverElemento(evt)");
}

function moverElemento(evt){
    let dx = evt.clientX - currentX;
    let dy = evt.clientY - currentY;
    currentPosx = currentPosx + dx;
    currentPosy = currentPosy + dy;
    elementSelect.setAttribute("x",currentPosx);
    elementSelect.setAttribute("y",currentPosy);
    currentX = evt.clientX;
    currentY = evt.clientY;
    elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
    elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
    iman();
}

function deseleccionarElemento(evt){
    testing();
    if(elementSelect !== 0){
        elementSelect.removeAttribute("onmousemove");
        elementSelect.removeAttribute("onmouseout");
        elementSelect.removeAttribute("onmouseup");
        elementSelect = 0;
    }
}

var entorno = document.getElementById('entorno');

function reordenar(evt){
    let padre = evt.target.parentNode;
    let clone = padre.cloneNode(true);
    let id = padre.getAttribute("id");
    entorno.removeChild(document.getElementById(id));
    entorno.appendChild(clone);
    return entorno.lastChild.firstChild;
}

function iman(){
    for(let i=0;i<piezas.length;i++){
        if (Math.abs(currentPosx-origX[i])<15 && Math.abs(currentPosy-origY[i])<15) {
            elementSelect.setAttribute("x",origX[i]);
            elementSelect.setAttribute("y",origY[i]);
        }
    }
}

function testing() {
    let bien_ubicada = 0;
    let padres = document.getElementsByClassName('padre');
    for(let i=0;i<piezas.length;i++){
        let posx = parseFloat(padres[i].firstChild.getAttribute("x"));
        let posy = parseFloat(padres[i].firstChild.getAttribute("y"));
        let ide = padres[i].getAttribute("id");
        if(origX[ide] === posx && origY[ide] === posy){
            bien_ubicada = bien_ubicada + 1;
        }
    }
    if(bien_ubicada === piezas.length){
        win.play();
    }
}

let reset = document.getElementById('reset');

reset.addEventListener('click', function () {
    for(let i=0;i<piezas.length;i++){
        piezas[i].setAttribute("width", tamWidh[i]);
        piezas[i].setAttribute("height",tamHeight[i]);
        piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
        piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
        piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");
    }
})
