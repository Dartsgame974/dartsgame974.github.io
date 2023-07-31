document.getElementById('resizeButton').addEventListener('click', function () {
    var inputFile = document.getElementById('inputFile').files[0];
    var selectedOption = document.querySelector('input[name="resizeOption"]:checked').value;

    var resizeOptions;
    if (selectedOption === 'twitch') {
        resizeOptions = [72, 36, 18];
    } else if (selectedOption === 'discord') {
        resizeOptions = [256];
    } else if (selectedOption === 'chaine') {
        resizeOptions = [28, 56, 112];
    }

    if (inputFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                document.getElementById('outputContainer').innerHTML = '';

                for (var i = 0; i < resizeOptions.length; i++) {
                    var resizeOption = resizeOptions[i];
                    canvas.width = resizeOption;
                    canvas.height = resizeOption;
                    ctx.clearRect(0, 0, resizeOption, resizeOption);
                    ctx.drawImage(img, 0, 0, resizeOption, resizeOption);
                    var resizedData = canvas.toDataURL('image/png');
                    var resizedImg = document.createElement('img');
                    resizedImg.src = resizedData;
                    document.getElementById('outputContainer').appendChild(resizedImg);
                }
            };
        };

        reader.readAsDataURL(inputFile);
    }
});
