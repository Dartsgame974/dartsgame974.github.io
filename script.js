const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('active');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('active');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    previewContainer.innerHTML = '';
    if (files.length === 0) {
        dropArea.classList.add('empty');
    } else {
        dropArea.classList.remove('empty');
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-item');
                previewItem.appendChild(img);
                previewContainer.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        }
    }
}

function resizeImagesAndCreateZip() {
    const resolutions = document.querySelectorAll('input[name="resolutions"]:checked');
    const files = fileInput.files;

    if (resolutions.length === 0 || files.length === 0) {
        alert("Veuillez sélectionner des résolutions et des images à redimensionner.");
        return;
    }

    const zip = new JSZip();

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                for (const resolution of resolutions) {
                    const [width, height] = resolution.value.split('x');
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    zip.file(`${file.name}_${resolution.value}.jpg`, dataUrl.split(',')[1], { base64: true });
                }
            };
        };
        reader.readAsDataURL(file);
    }

    zip.generateAsync({ type: 'blob' })
        .then((content) => {
            saveAs(content, 'images_resized.zip');
        });
}

const resizeButton = document.getElementById('resizeButton');
resizeButton.addEventListener('click', resizeImagesAndCreateZip);
