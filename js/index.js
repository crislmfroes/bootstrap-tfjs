const imgCamera = document.querySelector('#camera');
const labelCamera = document.querySelector('#label');

mobilenet.load().then(model => {
    document.forms[0].addEventListener('submit', e => {
        e.preventDefault();
        console.log(e);
        const file = e.target[0].files[0];
        const img = new Image(224, 224);
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            model.classify(img).then(predictions => {
                console.log('Predictions: ');
                console.log(predictions);
                imgCamera.src = img.src;
                imgCamera.setAttribute('alt', predictions[0].className);
                imgCamera.style.display = 'block';
                labelCamera.innerText = predictions[0].className;
                labelCamera.style.display = 'block';
            });
        }
    });
});