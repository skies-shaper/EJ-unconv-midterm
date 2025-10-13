const renderNode = document.getElementById("render")
const render = renderNode.getContext("2d")

let img = {}

let renderDataItemTemplates = {

    textNode: {
        type: "text",
        fontSize: 0,
        content: "words!",
        leftMargin: 0,
        fillColor: "white"

    }

}
let scrollFrom = -1
let screenData = {
    width: window.innerWidth,
    height: window.innerHeight,
    fills: {
        neatGreen: "#6eb465",
        neatGreen_highlight: "#8ab485"
    },
    data: {
        showCreditsBox: false
    }
}
let anchors = [
    0, 2000, 2200
]

let renderData = [
    {
        type: "text",
        fontSize: 80,
        content: "Environmental Justice in XXX",
        fillColor: screenData.fills.neatGreen,
        leftMargin: "centerText",
        yPos: 10,
        scrollLockInterval: [0, 300],
        height: 80,
    },
    {
        type: "text",
        fontSize: 20,
        content: "Alexander Shapinsky",

        fillColor: "#19b6e5",
        leftMargin: "centerText",
        yPos: 100,
        height: 15,
    },
    {
        type: "text",
        fontSize: 10,
        content: "NRES 224 - Environmental and Climate Justice",
        fillColor: screenData.fills.neatGreen,
        leftMargin: "centerText",
        yPos: 120,
        height: 10,
    },
    {
        type: "text",
        fontSize: 10,
        content: "words",
        fillColor: screenData.fills.neatGreen,
        leftMargin: "centerText",
        yPos: 1500,
        height: 10,
    },
    {
        type: "text",
        fontSize: 80,
        content: "Title Numero 2",
        fillColor: screenData.fills.neatGreen,
        leftMargin: "centerText",
        yPos: 2000,
        height: 85,
    },
    {
        type: "animObj",
        src: "bob",
        xEqn: () => {
            return Math.sin(scrollDistance / 50) * 50 + 60
        },
        yPos: 200,
        scrollLockInterval: [0, 300],
        height: 300
    },
    {
        type: "obj",
        yPos: 200,
        layer: 0
    },
    {
        type: "animObj",
        src: "bob",
        yPos: 500,
        xEqn: 300,
        height: 300
    }
]

let scrollDistance = 0
let ticks = 0
let mouseX = 0
let mouseY = 0
let mouseDown = false
let maxLayer
let autoscrollTo = -1
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

// window.addEventListener("keydown", (e) => {
//     if (e.key == "ArrowDown") {
//         scrollDistance++
//     }
// })
let currentAnchor = 0
let autoScrolling = false
window.addEventListener("wheel", (e) => {
    if (autoScrolling) {
        return
    }
    scrollDistance += e.deltaY / 2
    if (scrollDistance < 0) {
        scrollDistance = 0
    }
    for (let i = 0; i < anchors.length; i++) {
        if (scrollDistance > anchors[i]) {
            currentAnchor = i
            return
        }
    }
})

let globalRenderInterval
let autoscrollAcc

function screenUpdate() {
    ticks++
    if (autoScrolling) {
        let s = (anchors[autoscrollTo] - scrollFrom) //distance to travel //target time = 1 second, 100 fps
        scrollDistance += s / 100 + autoscrollAcc
        console.log((anchors[autoscrollTo] - scrollDistance) / s)
        if ((anchors[autoscrollTo] - scrollDistance) / s > .5) {
            autoscrollAcc += s / 200
        }
        else {
            autoscrollAcc -= s / 200
        }
        autoscrollAcc = Math.max(autoscrollAcc, 0)
    }
    if ((scrollDistance >= anchors[autoscrollTo] - 1) && autoScrolling) {
        autoScrolling = false
        currentAnchor++
        scrollDistance = anchors[autoscrollTo]
    }
    setFont(10)
    render.clearRect(0, 0, screenData.width, screenData.height)
    drawDocument()
    renderNextButton()
    renderCreditsPopup()
}

function renderNextButton() {
    if (mouseInRegion((screenData.width / 2) - img.nextButton.width / 4, screenData.height - img.nextButton.height / 2 - 10 + 5 * Math.sin(ticks * Math.PI / 50), img.nextButton.width / 2, img.nextButton.height / 2)) {
        render.filter = "brightness(120%)"
    }
    render.drawImage(img.nextButton.data, (screenData.width / 2) - img.nextButton.width / 4, screenData.height - img.nextButton.height / 2 - 10 + 5 * Math.sin(ticks * Math.PI / 50), img.nextButton.width / 2, img.nextButton.height / 2)
    render.filter = "none"
    renderNode.addEventListener("mouseup", () => {
        if (mouseInRegion((screenData.width / 2) - img.nextButton.width / 4, screenData.height - img.nextButton.height / 2 - 10 + 5 * Math.sin(ticks * Math.PI / 50), img.nextButton.width / 2, img.nextButton.height / 2)) {
            autoScrolling = true
            autoscrollAcc = 0
            scrollFrom = scrollDistance
            autoscrollTo = currentAnchor + 1
        }
    })

}

function init() {
    img = {
        nextButton: { data: document.getElementById("progressButton"), width: 500, height: 68 },
        bob: { data: document.getElementById("bob"), width: 300, height: 300 }
    }

    //method for making look better on retina displays, see https://coderwall.com/p/vmkk6a/how-to-make-the-canvas-not-look-like-crap-on-retina
    renderNode.width = window.innerWidth * window.devicePixelRatio
    renderNode.height = window.innerHeight * window.devicePixelRatio
    render.scale(window.devicePixelRatio, window.devicePixelRatio)

    renderNode.style.width = "100vw"
    renderNode.style.height = "100vh"


    globalRenderInterval = setInterval(screenUpdate, 10)

}

function calculateMaxDocumentHeight() {
    return 1000
}

window.onload = init

function calcMaxLayer() {
    let maxLayer = 0
    for (let i of renderData) {
        if (i.layer != undefined && i.layer > maxLayer) {
            maxLayer == i.layer
        }
    }
    return maxLayer + 1
}

function drawDocument() {
    // render.fillStyle = "red"
    // render.fillRect(100, 200 - scrollDistance, 50, 50)
    // Debug info!
    render.fillText(scrollDistance, 20, 20)
    // render.fillText(mouseX, 20, 30)
    // render.fillText(mouseY, 20, 40)
    maxLayer = calcMaxLayer()
    for (let i = 0; i < calcMaxLayer(); i++) {
        for (let renderItem of renderData) {
            if (renderItem.layer == i) {
                renderScrnObj(renderItem)
            }
        }
    }
    for (let renderItem of renderData) {
        if (renderItem.layer == undefined) {
            renderScrnObj(renderItem)

        }
    }
    // clearInterval(globalRenderInterval)
}

function renderScrnObj(renderItem) {
    // if (renderItem.yPos + renderItem.height < scrollDistance || renderItem.yPos > scrollDistance + screenData.height) {
    //     return
    // }
    render.fillStyle = renderItem.fillColor
    try {
        let yPos = renderItem.yPos - scrollDistance + renderItem.height
        if (renderItem.scrollLockInterval != undefined) {
            if (scrollDistance >= renderItem.scrollLockInterval[0] && scrollDistance <= renderItem.scrollLockInterval[1]) {
                yPos = renderItem.yPos - renderItem.scrollLockInterval[0] + renderItem.height
            } else {
                yPos = renderItem.scrollLockInterval[1] + renderItem.yPos - scrollDistance + renderItem.height
            }

        }

        switch (renderItem.type) {
            case "text": {
                setFont(renderItem.fontSize)
                if (renderItem.leftMargin = "centerText") {
                    render.fillText(renderItem.content, (screenData.width - render.measureText(renderItem.content).width) / 2, yPos)
                }
                break;
            }
            case "animObj": {
                render.drawImage(img[renderItem.src].data, typeof renderItem.xEqn === 'function' ? renderItem.xEqn() : renderItem.xEqn, yPos)
                break
            }
            case "obj": {
                render.fillStyle = "red"
                render.fillRect(0, 0, screenData.width, yPos)
                break
            }
        }
    }
    catch (e) {
        console.log(e)
        clearInterval(globalRenderInterval)
    }
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

    let credits = ["Inspiration from graphic visualizations at https://pudding.cool", "Font - National Park (Google Fonts)"]

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
    return (mouseX > x && mouseX < (x + w) && mouseY > y && mouseY < (y + h))
}

function setFont(pxSize) {
    render.font = pxSize + "px " + "National Park"
}

function calculateTextHeight(text, pixelwidth) {
    let textArray = []
    let charWidth = screen.measureText("1").width / screenData.scale
    let maxCharWidth = Math.floor(pixelwidth / charWidth)
    let EOLL = 0
    for (let i = 0; i < text.length; i++) {
        if (i - EOLL >= maxCharWidth) {
            if (text.charAt(i) == " ") {
                textArray.push(text.substring(EOLL, i))
                i++
            }
            else {
                while (text.charAt(i) != " ") {
                    i--
                    if (i < 0) {
                        i = text.length
                        break;
                    }
                }
                textArray.push(text.substring(EOLL, i))
                i++
            }
            EOLL = i
        }
    }
    textArray.push(text.substring(EOLL))
    return textArray
}