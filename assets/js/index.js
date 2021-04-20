// (function(){

//     //Set up the overlay so it goes away when you click on the outside of it.
//     const overlay = document.getElementById('overlay');
//     const overlayContent = document.getElementById('overlay-content');

//     overlay.addEventListener('click',function(){
//         overlayContent.innerHTML='';
//         overlay.style.display = 'none';
//     })
//     // overlayContent.addEventListener('click',function(event){
//     //     event.cancelBubble = true;
//     //     event.stopPropagation();
//     // })

    

//     const dealViews = document.getElementsByClassName('deal-content');
//     for(let dealView of dealViews){
//         dealView.addEventListener('click',function(){
            
//             let htmlContent = this.outerHTML;

//             overlay.style.display = 'block';
//             overlayContent.innerHTML = htmlContent;
//         });
//     }
    
    
    
// })()

//     function addLikeRoute(elemID){
//         if(document.getElementById('overlay').style.display!=='block')
//         return;
//         addLike(elemID);
//     }