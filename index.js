const renderNode = document.getElementById("render")
const render = renderNode.getContext("2d")
let scrollDistance = 0
let screenData = {
    width: window.innerWidth,
    height: window.innerHeight,
    fills: {
        neatGreen: "#6eb465",
        neatGreen_highlight: "8ab485"
    },
    data: {
        showCreditsBox: false
    }
}

let mouseX = 0
let mouseY = 0
let mouseDown = false

renderNode.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

renderNode.addEventListener("mousedown", () => {
    mouseDown = true
})
renderNode.addEventListener("mouseup", () => {
    mouseDown = false
})


renderNode.addEventListener("wheel", (e) => {
    scrollDistance += e.deltaY / 2
    if (scrollDistance < 0) {
        scrollDistance = 0
    }
})

init()
setInterval(screenUpdate, 10)

function screenUpdate() {
    render.clearRect(0, 0, screenData.width, screenData.height)
    drawDocument()
    renderCreditsPopup()
}

function init() {
    renderNode.width = window.innerWidth
    renderNode.height = window.innerHeight
}

function calculateMaxDocumentHeight() {
    return 1000
}

function drawDocument() {
    render.fillStyle = "red"
    render.fillRect(100, 200 - scrollDistance, 50, 50)
    render.fillText(scrollDistance, 20, 20)
    render.fillText(mouseX, 20, 30)
    render.fillText(mouseY, 20, 40)

}

function renderCreditsPopup() {
    let CB_smallWidth = 40
    let CB_smallHeight = 40
    let CB_offsetX = 10
    let CB_offsetY = 10
    let CB_bigWidth = 140
    let CB_bigHeight = 140

    render.fillStyle = screenData.fills.neatGreen
    render.fillRect(screenData.width - (CB_smallWidth + CB_offsetX), screenData.height - (CB_smallHeight + CB_offsetY), CB_smallWidth, CB_smallHeight)

    if ((mouseInRegion(screenData.width - (CB_smallWidth + CB_offsetX), screenData.height - (CB_smallHeight + CB_offsetY), CB_smallWidth, CB_smallHeight) && mouseDown) || (screenData.data.showCreditsBox && mouseInRegion(screenData.width - (CB_bigWidth + CB_offsetX), screenData.height - (CB_bigHeight + CB_offsetX), CB_bigWidth, CB_bigHeight))) {
        screenData.data.showCreditsBox = true
        render.fillRect(screenData.width - (CB_bigWidth + CB_offsetX), screenData.height - (CB_bigHeight + CB_offsetX), CB_bigWidth, CB_bigHeight)
    }
    else {
        screenData.data.showCreditsBox = false
    }

    let credits = ["Inspiration from graphic visualizations at https://pudding.cool"]

}


function addButton(x, y, width, height, yIsRelative, fillColor, highlightColor) {
    if (yIsRelative) {
        // do stuff (buttons that scroll)
        return
    }
    render.fillStyle = fillColor
    if (mouseInRegion(x, y, x + width, x + height)) {
        render.fillStyle = highlightColor
    }

}

function mouseInRegion(x, y, w, h) {
    // console.log(mouseX + ", " + x)
    // console.log(mouseX + ", " + x + w)
    // console.log(mouseY + ", " + y)
    // console.log(mouseY + ", " + y + h)
    return (mouseX > x && mouseX < (x + w) && mouseY > y && mouseY < (y + h))
}