<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>

const upload = document.getElementById('upload');
const previews = document.querySelector('.previews');
const resizeBtn = document.getElementById('resize');

const sizes = {
  twitch: [72, 36, 18],
  discord: [256],
  moji: [28, 56, 112]
};

upload.addEventListener('change', () => {

  previews.innerHTML = '';

  const files = upload.files;

  for(let i = 0; i < files.length; i++) {

    const file = files[i];
    
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';

    deleteBtn.addEventListener('click', () => {
      previews.removeChild(img);
      previews.removeChild(deleteBtn);
    });

    previews.appendChild(img);
    previews.appendChild(deleteBtn);

  }

});


resizeBtn.addEventListener('click', () => {

  previews.innerHTML = '';

  const options = getCheckedOptions();

  zipImages(upload.files, options);

});


function getCheckedOptions() {

  const checked = [];

  if (twitch.checked) {
    checked.push({
      name: 'twitch',
      sizes: sizes.twitch
    });
  }

  if (discord.checked) {
    checked.push({
      name: 'discord',
      sizes: sizes.discord 
    });
  }

  if (moji.checked) {
    checked.push({
      name: 'moji',
      sizes: sizes.moji
    });
  }

  return checked;

}

async function zipImages(files, options) {

  const zip = new JSZip();

  for (let i = 0; i < files.length; i++) {

    const file = files[i];
    const img = await getImage(file);
    const fileName = file.name;

    options.forEach(option => {

      const sizes = option.sizes;

      sizes.forEach(size => {

        const resizedImg = getResizedImage(img, size, size);

        const resizedName = `${fileName}_${option.name}_${size}x${size}.jpg`;

        zip.file(resizedName, resizedImg, {base64: true});

      });

    });

  }

  const zipFile = await zip.generateAsync({type: 'blob'});

  saveAs(zipFile, 'images.zip');

}


function getImage(file) {

  return new Promise(resolve => {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      resolve(img);
    }

  });

}


function getResizedImage(img, width, height) {

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL();

}
