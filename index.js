let scrollDistance = 0
let GLOBALDEBUG

let posRefs = {}

const renderNode = document.getElementById("render")
const render = renderNode.getContext("2d")
let screenData = {
    width: window.innerWidth,
    height: window.innerHeight,
    fills: {
        neatGreen: "#6eb465",
        neatGreen_highlight: "#8ab485",
        highligter: "#f8e51089"
    },
    data: {
        showCreditsBox: false
    }
}
window.onresize = () => {
    window.location = window.location
}
let img = {}
let credits = [
    { text: "Inspiration from graphic visualizations at https://pudding.cool", yRanges: [[0, 100000]] },
    { text: "Font - National Park (Google Fonts)", yRanges: [[0, 100000]] },
]

let positionRefNodes = {
    "intro": screenData.height,
    "Eorder": screenData.height * 4,
}


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

let anchors = [
    0, 2000, 2200
]

let auto = 101001

let renderData = [
    {
        type: "text",
        fontSize: 80,
        content: "Environmental Justice in the age of Big Data and Artificial Intelligence",
        fillColor: screenData.fills.neatGreen,
        leftMargin: "centerText",
        yPos: 10,
        scrollLockInterval: [0, distributeText("Environmental Justice in the age of Big Data and Artificial Intelligence").length * 80],
        height: auto
    },
    {
        type: "text",
        fontSize: 30,
        content: "Alexander Shapinsky",

        fillColor: "#19b6e5",
        leftMargin: "centerText",
        yPos: screenData.height / 2 - 15,
        height: auto,
    },
    {
        type: "text",
        fontSize: 15,
        content: "NRES 224 - Environmental and Climate Justice",
        fillColor: screenData.fills.neatGreen,
        leftMargin: "centerText",
        yPos: auto,
        height: auto,
    },
]

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
            if (autoscrollTo == anchors.length) {
                autoscrollTo--
                autoScrolling = false
            }
        }
    })

}

function init() {
    for (let i in renderDataAdditions) {
        renderData.push(renderDataAdditions[i])
    }
    img = {
        nextButton: { data: document.getElementById("progressButton"), width: 500, height: 68 },
        bob: { data: document.getElementById("bob"), width: 300, height: 300 },
        screenshot: { data: document.getElementById("screenshot"), width: 811, height: 403 },
        phone: { data: document.getElementById("phone"), width: 400, height: 680 }

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

let AutoYoffset = 0
function drawDocument() {
    // render.fillStyle = "red"
    // render.fillRect(100, 200 - scrollDistance, 50, 50)
    // Debug info!

    render.fillText(scrollDistance, 20, 20)

    // render.fillText(mouseX, 20, 30)
    // render.fillText(mouseY, 20, 40)
    maxLayer = calcMaxLayer()
    AutoYoffset = 0
    for (let i = 0; i < calcMaxLayer(); i++) {
        for (let renderItem of renderData) {
            if (renderItem.layer == i) {
                renderScrnObj(renderItem)
            }
        }
    }
    AutoYoffset = 0
    for (let renderItem of renderData) {
        if (renderItem.layer == undefined) {
            renderScrnObj(renderItem)
        }
    }
    // clearInterval(globalRenderInterval)
}
function renderScrnObj(renderItem) {
    render.fillStyle = renderItem.fillColor
    setFont(renderItem.fontSize)
    var content = ""
    let height = renderItem.height

    if (typeof renderItem.content == "function") {
        content = renderItem.content()
    }
    else {
        content = renderItem.content
    }
    let textDist = []

    if (renderItem.height == auto) {
        if (renderItem.leftMargin != "centerText") {
            textDist = distributeText(content, screenData.width - (2 * renderItem.leftMargin))
            height = (textDist.length) * renderItem.fontSize
        }
        else {
            textDist = distributeText(content, screenData.width)
            height = (textDist.length) * renderItem.fontSize
        }
    } else {
        if (renderItem.type == "text") {
            if (renderItem.leftMargin != "centerText") {
                textDist = distributeText(content, screenData.width - (2 * renderItem.leftMargin))
            }
            else {
                textDist = distributeText(content, screenData.width)
            }
        }

    }

    if (renderItem.yPos == auto) {
        // console.log("auto y pos")
    }
    if (renderItem.yPos != auto) {
        AutoYoffset = (typeof renderItem.yPos == "function") ? renderItem.yPos() : renderItem.yPos
        // console.log(AutoYoffset)
    }
    try {
        let renderYPos = ((renderItem.yPos == auto) ? AutoYoffset : ((typeof renderItem.yPos == "function") ? renderItem.yPos() : renderItem.yPos))
        let width = typeof renderItem.width === "function" ? renderItem.width() : renderItem.width
        let xPos = typeof renderItem.xEqn === 'function' ? renderItem.xEqn() : renderItem.xEqn
        let yPos = renderYPos - scrollDistance
        let scale = 1
        if (typeof renderItem.scale == "function") {
            scale = renderItem.scale()
        } else if (typeof renderItem.scale != "undefined") {
            scale = renderItem.scale
        }

        height *= scale


        AutoYoffset += height * (typeof renderItem.arrHeight != "undefined" ? renderItem.arrHeight : 1) + (typeof renderItem.arrHeight != "undefined" ? renderItem.arrHeight * renderItem.ySpacing * scale : 0)


        AutoYoffset += (typeof renderItem.bottomMargin != "undefined" ? renderItem.bottomMargin : 0)

        let scrollLockInterval = (typeof renderItem.scrollLockInterval == "function") ? renderItem.scrollLockInterval() : renderItem.scrollLockInterval

        if (scrollLockInterval != undefined) {
            if (scrollDistance >= scrollLockInterval[0] && scrollDistance <= scrollLockInterval[1]) {
                yPos = renderYPos - scrollLockInterval[0]
            } else if (scrollDistance > scrollLockInterval[1]) {
                yPos = renderYPos - (scrollDistance - (scrollLockInterval[1] - scrollLockInterval[0]))
            } else {
                yPos = renderYPos - scrollDistance
            }
        }
        if (renderItem.type == "text" && height == (textDist.length) * renderItem.fontSize) {
            yPos += renderItem.fontSize
        }
        else {
            yPos += height
        }

        if (typeof renderItem.ref != "undefined") {
            posRefs[renderItem.ref] = AutoYoffset
        }

        switch (renderItem.type) {

            case "text": {
                if (renderItem.leftMargin == "centerText") {
                    for (let i = 0; i < textDist.length; i++) {
                        render.fillText(textDist[i], (screenData.width - render.measureText(textDist[i]).width) / 2, yPos + i * renderItem.fontSize)
                    }
                    break;
                }
                for (let i = 0; i < textDist.length; i++) {
                    render.fillText(textDist[i], renderItem.leftMargin, yPos + i * renderItem.fontSize)
                }

                break;
            }
            case "animObj": {
                try {
                    render.drawImage(img[renderItem.src].data, xPos, yPos - height, img[renderItem.src].width * scale, img[renderItem.src].height * scale)
                }
                catch (e) {

                }
                break
            }
            case "obj": {
                render.fillStyle = "red"
                render.fillRect(0, 0, screenData.width, yPos)
                break
            }
            case "rect": {
                render.fillStyle = renderItem.fillColor
                render.fillRect(xPos, yPos, width, height)
                break;
            }
            case "imgArr": {
                for (let i = 0; i < renderItem.arrHeight; i++) {
                    for (let j = 0; j < renderItem.arrWidth; j++) {
                        if (yPos - height + (i * (height + (renderItem.ySpacing * scale))) > (-height) && yPos - height + (i * (height + (renderItem.ySpacing * scale))) < (screenData.height + height))
                            render.drawImage(img[renderItem.src].data, xPos + (j * (img[renderItem.src].width + renderItem.arrSpacing) * scale), yPos - height + (i * (height + (renderItem.ySpacing * scale))), img[renderItem.src].width * scale, img[renderItem.src].height * scale)
                    }
                }
            }
        }
    }
    catch (e) {
        console.log(e)
        clearInterval(globalRenderInterval)
    }
}

function renderCreditsPopup() {
    render.fillStyle = screenData.fills.neatGreen
    let CB_smallWidth = 40
    let CB_smallHeight = 40
    let CB_offsetX = 10
    let CB_offsetY = 10
    let CB_bigWidth = 140
    let CB_bigHeight = 4
    let sum = 0
    setFont(10)
    for (let i = 0; i < credits.length; i++) {
        for (let j = 0; j < credits[i].yRanges.length; j++) {
            if (scrollDistance >= credits[i].yRanges[j][0] && scrollDistance <= credits[i].yRanges[j][1]) {
                let dist = distributeText("[" + [i + 1] + "]: " + credits[i].text, CB_bigWidth - 2)
                sum++
                CB_bigHeight += 10
                for (let j = 1; j < dist.length; j++) {
                    CB_bigHeight += 10
                    sum++
                }
                break;
            }
        }
    }

    render.fillRect(screenData.width - (CB_smallWidth + CB_offsetX), screenData.height - (CB_smallHeight + CB_offsetY), CB_smallWidth, CB_smallHeight)

    let citationText = "1"
    for (let i = 1; i < credits.length; i++) {
        for (let j = 0; j < credits[i].yRanges.length; j++) {

            if (scrollDistance >= credits[i].yRanges[j][0] && scrollDistance <= credits[i].yRanges[j][1]) {
                citationText += ", " + (i + 1)
            }
        }
    }
    setFont(10)
    render.fillStyle = "black"
    let d = distributeText(citationText, CB_smallWidth - 5)

    for (let i = 0; i < d.length; i++) {
        render.fillText(d[i], screenData.width - CB_smallWidth - CB_offsetX + 5, screenData.height - CB_smallHeight + i * 10)
    }
    render.fillStyle = screenData.fills.neatGreen

    if ((mouseInRegion(screenData.width - (CB_smallWidth + CB_offsetX), screenData.height - (CB_smallHeight + CB_offsetY), CB_smallWidth, CB_smallHeight) && mouseDown) || (screenData.data.showCreditsBox && mouseInRegion(screenData.width - (CB_bigWidth + CB_offsetX), screenData.height - (CB_bigHeight + CB_offsetX), CB_bigWidth, CB_bigHeight))) {
        screenData.data.showCreditsBox = true
        render.fillRect(screenData.width - (CB_bigWidth + CB_offsetX), screenData.height - (CB_bigHeight + CB_offsetX), CB_bigWidth, CB_bigHeight)
        let sum = 0
        render.fillStyle = "black"
        for (let i = 0; i < credits.length; i++) {
            for (let j = 0; j < credits[i].yRanges.length; j++) {
                if (scrollDistance >= credits[i].yRanges[j][0] && scrollDistance <= credits[i].yRanges[j][1]) {
                    let dist = distributeText("[" + [i + 1] + "]: " + credits[i].text, CB_bigWidth - 2)
                    render.fillText(dist[0], screenData.width - CB_bigWidth - CB_offsetX + 2, screenData.height - CB_bigHeight + sum * 10)
                    sum++
                    for (let j = 1; j < dist.length; j++) {
                        render.fillText(dist[j], screenData.width - CB_bigWidth + 10, screenData.height - CB_bigHeight + sum * 10)
                        sum++
                    }
                    break;
                }
            }
        }
    }
    else {
        screenData.data.showCreditsBox = false
    }
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

function distributeText(text, lineWidth) {
    /*
    TO DO HERE - ADD WRAPPING FOR SUPER LONG WORDS (LIKE URLS!)
    */
    let textArray = []
    let arr = text.split(" ")
    let WARN = 0
    let i = 0
    while ((i < arr.length) && WARN < 1000) {
        textArray.push("")

        while (WARN < 1000 && render.measureText(arr[i] + " ").width + render.measureText(textArray[textArray.length - 1]).width < lineWidth && i < arr.length) {
            textArray[textArray.length - 1] += arr[i] + " "
            i++
            WARN++
        }
        WARN++
    }
    for (let i = 0; i < textArray.length; i++) {
        textArray[i] = textArray[i].substring(0, textArray[i].length - 1)
    }

    if (WARN >= 998) {
        // console.log(textArray)
        // console.log(arr)
        return [""]
    }
    // console.log(WARN)
    return textArray
}