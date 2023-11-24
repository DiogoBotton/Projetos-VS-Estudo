const mapCanvas = document.getElementById('map');
const ctx = mapCanvas.getContext('2d');
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');

let zoomLevel = 1;
let offsetX = 0;
let offsetY = 0;
let scalePin = 0.08;

const minZoom = 1; // Defina o zoom mínimo desejado.
const canvasWidth = mapCanvas.width;
const canvasHeight = mapCanvas.height;

const pins = [];

// Carregue sua imagem personalizada
const image = new Image();
image.src = 'mapa.jpeg';
image.onload = drawMap;

function drawMap() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Calcule o tamanho do mapa de acordo com o zoom e dimensões do canvas.
    const mapWidth = image.width * zoomLevel;
    const mapHeight = image.height * zoomLevel;

    // Calcule o zoom mínimo com base nas dimensões do canvas.
    const minZoomX = canvasWidth / image.width;
    const minZoomY = canvasHeight / image.height;
    const minZoom = Math.max(minZoomX, minZoomY);
    const maxZoom = Math.floor(image.width / canvasWidth);

    // Verifique o zoom mínimo.
    zoomLevel = Math.max(zoomLevel, minZoom);
    zoomLevel = Math.min(zoomLevel, maxZoom);

    // Limite o deslocamento para manter o mapa dentro do canvas.
    if (mapWidth < canvasWidth) {
        offsetX = (canvasWidth - mapWidth) / 2;
    } else {
        offsetX = Math.max(offsetX, canvasWidth - mapWidth);
        offsetX = Math.min(offsetX, 0);
    }
    
    if (mapHeight < canvasHeight) {
        offsetY = (canvasHeight - mapHeight) / 2;
    } else {
        offsetY = Math.max(offsetY, canvasHeight - mapHeight);
        offsetY = Math.min(offsetY, 0);
    }

    // Desenhe a imagem do mapa.
    ctx.drawImage(image, offsetX, offsetY, mapWidth, mapHeight);

    // Desenhe todos os pins ajustando suas coordenadas.
    for (const pin of pins) {
        const path = new Path2D("M59.5395 314.99C54.9951 309.595 50.3684 304.267 45.9235 298.792C36.7374 287.476 28.815 275.314 21.8192 262.53C17.1811 254.054 13.163 245.319 9.86589 236.237C6.21636 226.184 3.77192 215.837 2.01995 205.31C-0.230244 191.791 -0.434369 178.129 0.594429 164.559C2.2459 142.776 7.73846 121.844 16.6273 101.834C23.7221 85.8628 32.6007 70.9871 44.144 57.8386C57.573 42.5422 72.9908 29.6021 90.9007 19.7594C110.52 8.97701 131.397 2.2402 153.738 0.173709C155.111 0.0467042 156.49 0.00547481 157.869 0.00547481H158.897C158.897 0.00547481 164.122 -0.0068342 164.122 0.00546086L166.251 0.00547541L176.194 0.00549746C176.162 25.5545 176.176 50.55 176.157 75.7267C176.155 77.392 176.157 80.6723 176.157 80.6723C169.709 81.4181 162.972 81.7877 156.965 82.9932C134.704 87.461 116.299 98.6032 101.899 116.132C90.8311 129.606 84.4244 145.232 82.7822 162.512C80.9114 182.198 84.7109 200.915 94.7149 218.14C100.512 228.121 107.816 236.867 116.866 244.125C124.767 250.461 133.465 255.36 143.01 259.14C143.337 259.393 143.561 259.456 143.775 259.48C143.747 259.503 143.725 259.433 143.916 259.611C144.776 259.938 145.445 260.086 146.082 260.264C146.051 260.293 146.011 260.217 146.232 260.395C148.922 261.189 151.392 261.805 154.125 262.447C154.733 262.539 155.079 262.605 155.613 262.831C156.459 263.063 157.117 263.135 158.022 263.23C158.598 263.301 158.927 263.35 159.491 263.572C165.207 264.16 170.687 264.576 176.166 265.357C176.166 330.697 176.165 395.672 176.168 460.646C176.168 462.451 176.194 466.429 176.194 466.429C173.097 466.839 170.457 465.453 168.637 463.564C166.416 461.261 164.18 458.84 162.576 456.104C159.586 451.005 156.99 445.671 154.336 440.381C151.161 434.056 148.409 427.499 144.929 421.351C132.315 399.06 116.907 378.754 99.9946 359.581C87.0424 344.899 73.8868 330.395 60.8058 315.826C60.4789 315.462 59.9658 315.265 59.5395 314.99Z M292.461 315.072C297.005 309.676 301.632 304.346 306.077 298.869C315.263 287.551 323.185 275.386 330.181 262.599C334.819 254.121 338.837 245.383 342.134 236.299C345.784 226.243 348.228 215.893 349.98 205.364C352.23 191.841 352.434 178.175 351.406 164.602C349.754 142.813 344.262 121.875 335.373 101.86C328.278 85.8851 319.399 71.0056 307.856 57.8536C294.427 42.5532 279.009 29.6099 261.099 19.7645C241.48 8.97935 220.603 2.24078 198.262 0.173754C196.889 0.046717 195.51 0.00547623 194.131 0.00547623H193.103C193.103 0.00547623 187.878 -0.00683598 187.878 0.00546228L185.749 0.00547683L175.806 0.00549889C175.838 25.5612 175.824 50.5632 175.843 75.7465C175.845 77.4122 175.843 80.6933 175.843 80.6933C182.291 81.4393 189.028 81.809 195.035 83.0148C217.296 87.4838 235.701 98.6289 250.101 116.163C261.169 129.64 267.576 145.269 269.218 162.555C271.089 182.246 267.289 200.968 257.285 218.197C251.488 228.181 244.184 236.928 235.134 244.188C227.233 250.527 218.535 255.427 208.99 259.208C208.663 259.461 208.439 259.523 208.225 259.547C208.253 259.571 208.275 259.501 208.084 259.679C207.224 260.005 206.555 260.154 205.918 260.332C205.949 260.361 205.989 260.285 205.768 260.463C203.078 261.257 200.608 261.874 197.875 262.516C197.267 262.608 196.921 262.674 196.387 262.899C195.541 263.131 194.883 263.204 193.978 263.298C193.402 263.37 193.073 263.419 192.508 263.641C186.793 264.229 181.313 264.645 175.834 265.426C175.834 330.783 175.835 395.775 175.832 460.766C175.832 462.571 175.806 466.551 175.806 466.551C178.903 466.96 181.543 465.574 183.363 463.685C185.584 461.381 187.82 458.959 189.424 456.223C192.414 451.123 195.01 445.787 197.664 440.496C200.839 434.169 203.591 427.611 207.071 421.46C219.685 399.164 235.093 378.853 252.005 359.675C264.958 344.989 278.113 330.481 291.194 315.909C291.521 315.545 292.034 315.347 292.461 315.072Z")
        const mat = new DOMMatrix();
        const path2 = new Path2D();

        const adjustedX = (pin.x * zoomLevel) + offsetX;
        const adjustedY = (pin.y * zoomLevel) + offsetY;
        
        mat.scaleSelf(scalePin, scalePin)
        mat.translateSelf(adjustedX/scalePin, adjustedY/scalePin)
        path2.addPath(path, mat)
        ctx.fillStyle = "#fff";
        ctx.fill(path2);
        //ctx.drawImage(pinImage, adjustedX, adjustedY, pinImage.width, pinImage.height);
    }
}


zoomInButton.addEventListener('click', () => {
    zoomLevel *= 1.2;
    drawMap();
});

zoomOutButton.addEventListener('click', () => {
    zoomLevel /= 1.2;
    drawMap();
});

let isDragging = false;
let startX, startY;

mapCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

mapCanvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        offsetX += dx;
        offsetY += dy;
        startX = e.clientX;
        startY = e.clientY;
        drawMap();
    }
});

mapCanvas.addEventListener('mouseup', () => {
    isDragging = false;
});

mapCanvas.addEventListener('wheel', (e) => {
    // Calcule o zoom mínimo com base nas dimensões do canvas.
    const minZoomX = canvasWidth / image.width;
    const minZoomY = canvasHeight / image.height;
    const minZoom = Math.max(minZoomX, minZoomY);
    const maxZoom = Math.floor(image.width / canvasWidth);

    // Verifique o zoom mínimo.
    zoomLevel = Math.max(zoomLevel, minZoom);
    zoomLevel = Math.min(zoomLevel, maxZoom);
    
    const mouseX = e.clientX - mapCanvas.getBoundingClientRect().left;
    const mouseY = e.clientY - mapCanvas.getBoundingClientRect().top;

    const zoomFactor = e.deltaY < 0 ? 1.2 : 1 / 1.2;

    const newZoomLevel = zoomLevel * zoomFactor;

    if (newZoomLevel >= minZoom && newZoomLevel <= maxZoom) {
        // Calcula a posição do cursor do mouse em relação ao canvas após o zoom.
        const offsetXAfterZoom = mouseX - (mouseX - offsetX) * zoomFactor;
        const offsetYAfterZoom = mouseY - (mouseY - offsetY) * zoomFactor;

        // Atualiza o zoom e a posição do canvas.
        zoomLevel = newZoomLevel;
        offsetX = offsetXAfterZoom;
        offsetY = offsetYAfterZoom;

        drawMap();
        e.preventDefault(); // Evita o comportamento padrão de zoom do navegador.
    }
});

// Inicialize o mapa para preencher o canvas.
drawMap();

// Adicionar Pins
// const pinImage = new Image();
// pinImage.src = 'pin.svg';
// pinImage.width= 40;
// pinImage.height = 40;
// pinImage.style.color = "#fff"

mapCanvas.addEventListener('dblclick', (e) => {
    const mouseX = (e.clientX - mapCanvas.getBoundingClientRect().left - offsetX) / zoomLevel;
    const mouseY = (e.clientY - mapCanvas.getBoundingClientRect().top - offsetY) / zoomLevel;

    // Armazene as coordenadas do pin na matriz.
    pins.push({ x: mouseX-(20/zoomLevel), y: mouseY-(20/zoomLevel) });

    // Redesenhe o mapa e todos os pins.
    drawMap();
});

