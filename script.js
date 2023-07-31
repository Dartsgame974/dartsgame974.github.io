document.getElementById('resizeButton').addEventListener('click', function () {
    var inputFiles = document.getElementById('inputFile').files;
    var selectedOption = document.querySelector('input[name="resizeOption"]:checked').value;

    var resizeOptions;
    if (selectedOption === 'twitch') {
        resizeOptions = [72, 36, 18];
    } else if (selectedOption === 'discord') {
        resizeOptions = [256];
    } else if (selectedOption === 'chaine') {
        resizeOptions = [28, 56, 112];
    }

    if (inputFiles.length > 0) {
        var zip = new JSZip();
        var filePromises = [];

        for (var j = 0; j < inputFiles.length; j++) {
            var inputFile = inputFiles[j];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');

                    for (var i = 0; i < resizeOptions.length; i++) {
                        var resizeOption = resizeOptions[i];
                        canvas.width = resizeOption;
                        canvas.height = resizeOption;
                        ctx.clearRect(0, 0, resizeOption, resizeOption);
                        ctx.drawImage(img, 0, 0, resizeOption, resizeOption);
                        var resizedData = canvas.toDataURL('image/png');

                        // Ajouter les images redimensionnées dans le fichier ZIP
                        var imgFileName = inputFile.name + "_" + resizeOption + "x" + resizeOption + ".png";
                        zip.file(imgFileName, resizedData.substr(resizedData.indexOf(',') + 1), { base64: true });
                    }
                };
            };

            filePromises.push(new Promise(function(resolve) {
                reader.readAsDataURL(inputFile);
                reader.onloadend = resolve;
            }));
        }

        Promise.all(filePromises).then(function() {
            // Activer le bouton de téléchargement et définir l'action de téléchargement
            var downloadButton = document.getElementById('downloadButton');
            downloadButton.disabled = false;
            downloadButton.addEventListener('click', function() {
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    var link = document.createElement("a");
                    link.href = URL.createObjectURL(content);
                    link.download = "images.zip";
                    link.click();
                });
            });
        });
    }
});
