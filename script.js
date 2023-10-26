const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const brushSizeInput = document.getElementById('brushSize');

let brushPattern = null;

imageUpload.addEventListener('change', (e) => {
    const imageFiles = e.target.files;
    if (imageFiles.length > 10) {
        alert('Only 10 images allowed.');
        return;
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 100; // Or any size you want for the brush pattern
    tempCanvas.height = 100;

    const tempCtx = tempCanvas.getContext('2d');

    let loadedImages = 0;

    [...imageFiles].forEach((file, index) => {
        const img = new Image();
        img.onload = () => {
            tempCtx.drawImage(img, (index % 5) * 20, Math.floor(index / 5) * 20, 20, 20);
            loadedImages++;

            if (loadedImages === imageFiles.length) {
                brushPattern = ctx.createPattern(tempCanvas, 'repeat');
            }
        };
        img.src = URL.createObjectURL(file);
    });
});

canvas.addEventListener('mousedown', (e) => {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

    canvas.onmousemove = (e) => {
        ctx.strokeStyle = brushPattern;
        ctx.lineWidth = brushSizeInput.value;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    canvas.onmouseup = () => {
        canvas.onmousemove = null;
        canvas.onmouseup = null;
    }
});
