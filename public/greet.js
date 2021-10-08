describe.addEventListener('DOMContentLoaded', function () {
    let errorMessageElem = document.querySelector('.entry');
    let infoMessageElem = document.querySelector('.reset');

    if (errorMessageElem.innerHTML !== '' || infoMessageElem.innerHTML !== ''){

    
        setTimeout(function () {
            errorMessageElem.innerHTML = '';
            infoMessageElem.innerHTML = '';
        }, 3000);
    }
})