// TODO:
// Correct padding, width and height
// Correct resolution to not become blurry on Twitter (1.2 ~ 1.7)

const title = document.getElementById("title")
const author = document.getElementById("author")
const lyrics = document.getElementById("lyrics")
const card = document.getElementById("card")
const cover = document.getElementById("song-cover")
const quality = document.getElementById("quality")
const qualityValue = document.getElementById("quality-value")
qualityValue.innerText = `Current: ${quality.value}`
const BLACK_LOGO = "images\\black_logo.png"
const WHITE_LOGO = "images\\white_logo.png"


let logo_color = BLACK_LOGO
window.devicePixelRatio = quality.value

const load_image = (event) => {
    var image = document.getElementById('song-cover');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.hidden = false
};

cover.addEventListener("click", (e) => { document.getElementById("choose-file").click() })

document.getElementById("download-image").addEventListener("click", () => {
    if (title.clientHeight > 35) {
        const text = title.innerText.slice(0, -4)
        title.innerText = text + "..."
    }

    html2canvas(card, {
        backgroundColor: null, scale: window.devicePixelRatio,
        // scrollX: -window.scrollX,
        // scrollY: -window.scrollY,
        // windowWidth: card.scrollWidth,
        // windowHeight: card.scrollHeight
        width: card.clientWidth-1,
        height: card.clientHeight-1,
    }).then(canvas => {
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

document.getElementById("ellipsis-button").addEventListener("click", (e) => {
    if (title.clientHeight > 35) {
        const text = title.innerText.slice(0, -3)
        title.innerText = text + "..."
    }
})

quality.addEventListener("input", (e) => {
    window.devicePixelRatio = e.target.value
    qualityValue.innerText = `Current: ${e.target.value}`
})

// quality.addEventListener("change", (e) => {
//     qualityValue.innerText = `Current: ${e.target.value}`
// })

title.addEventListener("change", (e) => {
})

const addEvent = (object) => object.addEventListener("paste", (e) => {
    e.preventDefault();

    const lines = e.clipboardData.getData("text/plain").split("\r\n")
    for (let line of lines) {
        const div = document.createElement("div")
        div.innerText = line
        object.appendChild(div)
    }
    // object.innerText = e.clipboardData.getData("text/plain")
});

const paste = arr => arr.map(addEvent)

paste([title, author, lyrics])

// setInterval(() => {
//     console.log(document.getElementsByClassName("info")[0].clientWidth - 20 - document.getElementById("song-cover").clientWidth)
//     console.log(document.getElementById("title").clientWidth)

// }, 1000)

// title.addEventListener("keyup", (e) => {
//     console.log((title.clientWidth + 1) + "px")
//     if (title.clientWidth + 1 > 400) {
//         for (let i=0; i<title.innerText.length; i++) {
//             title.innerText = title.innerText.slice(0, -1)
//             if (title.clientWidth + 1 <= 400) {
//                 title.innerText = title.innerText.slice(0, -1) + "..."
//                 return
//             }
//         }
//     }
// })
