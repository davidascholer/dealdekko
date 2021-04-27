
(function () {
    //Reload the page when screen size changes from mobile to desktop and vice versa.
    let windowWidth = (window.innerWidth > 600) ? 1 : 0;
    window.addEventListener('resize', function () {
        let tempWidth = (window.innerWidth > 600) ? 1 : 0;
        if (tempWidth !== windowWidth)
        window.location.href = window.location.href;
    });

    //Sets a random plant every time the user refreshes the page. For fun.
    const NUMBER_OF_PLANTS = 6;
    const plantHeaderImage = document.getElementById('header_plant');
    let randomPlant = Math.floor(Math.ceil(Math.random() * NUMBER_OF_PLANTS));
    plantHeaderImage.src = '/img/sucs/succ_' + randomPlant + '.svg';

    document.querySelector('.searchbox [type="reset"]').addEventListener('click', function () { this.parentNode.querySelector('input').focus(); });
    const searchBox = document.querySelector('.searchbox [type="search"]')
    // searchBox.addEventListener('keypress', function (e) {
    //     console.log(e.key);
    //     if (e.key === 'search') {
    //         searchDeals(this);
    //     }
    // });
    document.getElementById('searchbutton').addEventListener('click', function () {
        searchDeals(searchBox);
    });

    //Show drop down list of desktop categories.
    const showCat = document.getElementById('allDealsOption');
    showCat.addEventListener('click', function () {
        const cat = document.getElementsByClassName('categories');
        if (cat[0].classList.contains('show')) {
            cat[0].classList.remove('show');
            cat[0].classList.add('unshow');
        }
        else {
            cat[0].classList.remove('unshow');
            cat[0].classList.add('show');
        }
    })

    //Show drop down list of mobile categories.
    const showCatMobile = document.getElementsByClassName('show-cat-mobile');
    showCatMobile[0].addEventListener('click', function () {
        const cat = document.getElementsByClassName('categories');
        if (cat[0].classList.contains('show')) {
            cat[0].classList.remove('show');
            cat[0].classList.add('unshow');
        }
        else {
            cat[0].classList.remove('unshow');
            cat[0].classList.add('show');
        }
    })

    document.getElementById('mobile-selection-1').addEventListener('click', function () { hideAllAndShow('section-1') });
    document.getElementById('mobile-selection-2').addEventListener('click', function () { hideAllAndShow('section-2') });
    document.getElementById('mobile-selection-3').addEventListener('click', function () { hideAllAndShow('section-3') });
    document.getElementById('mobile-selection-4').addEventListener('click', function () { hideAllAndShow('section-4') });


    //Set up the overlay so it goes away when you click on the outside of it.
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlay-content');

    overlay.addEventListener('click', function () {
        overlayContent.innerHTML = '';
        overlay.style.display = 'none';
        history.back();
    });

    window.addEventListener('popstate', (event) => {
        overlayContent.innerHTML = '';
        overlay.style.display = 'none';
    });

    const dealViews = document.getElementsByClassName('deal-content');
    for (let dealView of dealViews) {
        dealView.addEventListener('click', function () {

            let htmlContent = this.outerHTML;

            overlay.style.display = 'block';
            overlayContent.innerHTML = htmlContent;

            history.pushState({ state: null }, '');
        });
    }


})();

function addLikeRoute(event, elemID) {
    event.stopPropagation();
    if (document.getElementById('overlay').style.display !== 'block')
        return;
    addLike(elemID);
}

function addLike(elemID) {
    //update UI elements
    const curElem = document.getElementsByClassName('likes' + elemID);
    for (let e of curElem) {
        const label = e.getElementsByTagName('label');
        let likes = parseInt(label[0].textContent.trim());
        likes++;
        label[0].textContent = likes.toString();
        e.style.pointerEvents = 'none';
    }

    //create a put request
    putRequest('like', elemID);
}
function addDead(event, elemID) {

    event.stopPropagation();
    //update UI elements
    const curElem = document.getElementsByClassName('dead' + elemID);
    for (let e of curElem) {
        const img = e.getElementsByTagName('img');
        const label = e.getElementsByTagName('label');
        img[0].src = "/img/icons/dead_icon_purple.svg";
        label[0].textContent = " Reported this deal dead. ";
        e.style.pointerEvents = 'none';
    }
    //create a put request
    putRequest('dead', elemID);
}

//Stop propagation on text so users can click and copy.
function detailsClicked(event) {
    event.stopPropagation();
}

const searchDeals = obj => {
    const input = obj.value;
    const searchBox = document.getElementById('searchbox');
    const letterNumber = /^[0-9 a-zA-Z]+$/;
    if (input.trim() !== '') {
        if (input.match(letterNumber)) {
            try {
                const searchLink = "/search?searchString=" + encodeURIComponent(input);
                window.location.href = searchLink;
            } catch (err) {
                const searchLink = "/search?searchString=empty";
                window.location.href = searchLink;
            }
        } else {
            obj.value = '';
            searchBox.classList.add('shake');
            setTimeout(function () {
                searchBox.classList.remove('shake');
                obj.placeholder = 'search (letters & numbers only)'
            }, 350)
        }
    }
}

//helper method to remove all of the .show classes from the mobile footer before showing a new one.
const hideAllAndShow = element => {
    const section = document.getElementById(element);
    //If the selected item is up, bring it down
    if (section.classList.contains('showfootersection')) {
        section.classList.add('hidefootersection');
        setTimeout(function () {
            section.classList.remove('showfootersection');
        }, 400);
    }

    else {
        const sec1 = document.getElementById('section-1').classList;
        const sec2 = document.getElementById('section-2').classList;
        const sec3 = document.getElementById('section-3').classList;
        const sec4 = document.getElementById('section-4').classList;

        const setDelay = false;

        //If the selected item is down, take any other potential selections down and bring this one up.
        if (sec1.contains('showfootersection'))
            hideOneShowAnother(sec1, section.classList);
        else if (sec2.contains('showfootersection'))
            hideOneShowAnother(sec2, section.classList);
        else if (sec3.contains('showfootersection'))
            hideOneShowAnother(sec3, section.classList);
        else if (sec4.contains('showfootersection'))
            hideOneShowAnother(sec4, section.classList);
        else {
            //If it's down, bring it up. No others are up.
            section.classList.remove('hidefootersection');
            section.classList.add('showfootersection');
        }
    }

    function hideOneShowAnother(one, another) {
        one.add('hidefootersection');
        setTimeout(function () {
            one.remove('showfootersection');
            another.remove('hidefootersection');
            another.add('showfootersection');
        }, 400);
    }
}

//send a like or report a dead deal to the server
const putRequest = (type, id) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json, charset=UTF-8'
        }
    }
    fetch('api/' + type + '/' + id, options);
}