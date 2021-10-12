document.addEventListener('DOMContentLoaded', function () {
    let infoElem = document.querySelector('.reset')
    if (infoElem.innerHTML !== '' ) {
        setTimeout(() => {
            infoElem.innerHTML = '';  
            
        }, 3000);
    }
});