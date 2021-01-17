import ('../css/gallery.css');
import ('/imgs.json');
import 'jquery';

window.addEventListener('DOMContentLoaded', function () {
    loadJSON();
})

//процедура загрузки json
function loadJSON() {
    let arr = [];
    $.getJSON('../assets/js/imgs.json', function(data) {
        for(let i=0; i<3; i++) {
            arr[i] = 0;
        }
        arr[0] = data.imgs[0];
        if (data.imgs[1] != null) {
            arr[1] = data.imgs[1];
            if (data.imgs[2] != null) {
                arr[2] = data.imgs[2];
            }
        }
        loadIMG(arr);
    });
}

//процедура загрузки картинки из json
function loadIMG(arr) {
    $("#img0").attr( {
        'src':'../assets/imgs/pictures/'+ arr[0].name,
        onclick: "window.location.href = ' ../" + arr[0].url + "/';"
    });
    $("#img1").attr( {
        'src':'../assets/imgs/pictures/'+ arr[1].name,
        onclick: "window.location.href = ' ../" + arr[1].url + "/';"
    });
    $("#img2").attr( {
        'src':'../assets/imgs/pictures/'+ arr[2].name,
        onclick: "window.location.href = ' ../" + arr[2].url + "/';"
    });
}