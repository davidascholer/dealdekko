(function(){
    //Sets a random plant every time the user refreshes the page. For fun.
    const NUMBER_OF_PLANTS = 6;
    const plantHeaderImage = document.getElementById('header_plant');
    let randomPlant = Math.floor(Math.ceil(Math.random() * NUMBER_OF_PLANTS));
    plantHeaderImage.src = '/img/sucs/succ_'+randomPlant+'.svg';

    //Set up the overlay so it goes away when you click on the outside of it.
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlay-content');

    overlay.addEventListener('click',function(){
        overlayContent.innerHTML='';
        overlay.style.visibility = 'hidden';
    })
    overlayContent.addEventListener('click',function(event){
        event.stopPropagation();
    })

    

    const dealViews = document.getElementsByClassName('deal-content');
    for(let dealView of dealViews){
        dealView.addEventListener('click',function(){
            
            let htmlContent = this.outerHTML;

            overlay.style.visibility = 'visible';
            overlayContent.innerHTML = htmlContent;

            let details = this.getElementsByClassName('details');
            let link = this.getElementsByClassName('link');

        });
    }




})()