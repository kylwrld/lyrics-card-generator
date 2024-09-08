const title = document.getElementById("title")
const author = document.getElementById("author")
const lyrics = document.getElementById("lyrics")
const card = document.getElementById("card")
const cover = document.getElementById("song-cover")
const BLACK_LOGO = "images\\black_logo.png"
const WHITE_LOGO = "images\\white_logo.png"

let logo_color = BLACK_LOGO
window.devicePixelRatio = 3

const load_image = (event) => {
    var image = document.getElementById('song-cover');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.hidden = false
};

cover.addEventListener("click", (e) => { document.getElementById("choose-file").click() })

document.getElementById("download-image").addEventListener("click", () => {
    html2canvas(card, { backgroundColor: null },  { scale: window.devicePixelRatio }).then(canvas => {
        canvas.toBlob(function (blob) {
            window.saveAs(blob);
        });
    });
});

document.getElementById("card-color").addEventListener("input", (e) => {
    card.style.backgroundColor = e.target.value;
})

document.getElementById("text-color").addEventListener("input", (e) => {
    title.style.color = e.target.value;
    title.style.color = e.target.value;
    lyrics.style.color = e.target.value;
})

document.getElementById("logo-color").addEventListener("click", (e) => {
    logo_color = logo_color == BLACK_LOGO ? WHITE_LOGO : BLACK_LOGO
    document.getElementById("logo").src = logo_color
})

document.getElementById("quality").addEventListener("input", (e) => {
    window.devicePixelRatio = e.target.value
})

const addEvent = (object) => object.addEventListener("paste", (e) => {
    e.preventDefault();
    object.innerText = e.clipboardData.getData("text/plain")
});

const paste = arr => arr.map(addEvent)

paste([title, author, lyrics])
