const test = document.getElementById('container').addEventListener('click' ,(event) => {
  //  event.preventDefault();
    if (event.target.classList.contains('more')) {
        const parent = event.target.parentElement;
        const desc = parent.querySelector('.description');
        if (desc.style.display != "block") {
            desc.style.display = "block";
            event.target.textContent = "Hide";
        }
        else {
            
            desc.style.display = "none";
            event.target.textContent = "Show more"
        }
    }
})