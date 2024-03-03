const canvas = document.getElementById("magnifyCanvas")
const context = canvas.getContext('2d')
const magnifyRadius = 50
const userImage = new Image()

canvas.addEventListener('mousemove', handleMouseMove)

function handleMouseMove(event) {
    const { left, top } = canvas.getBoundingClientRect()
    const mouseX = event.clientX - left
    const mouseY = event.clientY - top

    draw(mouseX, mouseY)
}

function draw(x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (userImage.src) {
        context.drawImage(userImage, 0, 0, canvas.width, canvas.height)
        drawMagnifyingCircle(x, y)
    }
}

function drawMagnifyingCircle(x, y) {
    const magnificationFactor = 10
    const magnifiedWidth = canvas.width / magnificationFactor
    const magnifiedHeight = canvas.height / magnificationFactor

    const sourceX = x / canvas.width * userImage.width - magnifiedWidth / 2
    const sourceY = y / canvas.height * userImage.height - magnifiedHeight / 2

    context.drawImage(
        userImage,
        sourceX,
        sourceY,
        magnifiedWidth,
        magnifiedHeight,
        x - magnifyRadius,
        y - magnifyRadius,
        magnifyRadius * 2,
        magnifyRadius * 2
    )
}

function handleImageUpload() {
    const fileInput = document.getElementById("imageInput")
    const file = fileInput.files[0]

    if (file) {
        const reader = new FileReader()
        reader.onload = (readerEvent) => {
            userImage.src = readerEvent.target.result
            userImage.onload = () => draw(0, 0)
        }
        reader.readAsDataURL(file)
    }
}
