(function () {
    //Sets a random plant every time the user refreshes the page. For fun.
    const NUMBER_OF_PLANTS = 6;
    const plantHeaderImage = document.getElementById('header_plant');
    let randomPlant = Math.floor(Math.ceil(Math.random() * NUMBER_OF_PLANTS));
    plantHeaderImage.src = '/img/sucs/succ_' + randomPlant + '.svg';

    document.querySelector('.searchbox [type="reset"]').addEventListener('click', function () { this.parentNode.querySelector('input').focus(); });
    const searchBox = document.querySelector('.searchbox [type="search"]')
    // searchBox.addEventListener('keypress', function (e) {
    //     if (e.key === 'Enter') {
    //         searchDeals(this);
    //     }
    // });
    document.getElementById('searchbutton').addEventListener('click',function(){
        searchDeals(searchBox);
    });
})()

const searchDeals = obj => {
    const input = obj.value;
    const searchBox = document.getElementById('searchbox');
    const letterNumber = /^[0-9 a-zA-Z]+$/;
    if (input.trim() !== '') {
        if (input.match(letterNumber)) {
            try{
                const searchLink = "/search?searchString="+encodeURIComponent(input);
                window.location.href = searchLink;
            }catch(err){
                const searchLink = "/search?searchString=empty";
                window.location.href = searchLink;
            }
        } else {
            obj.value = '';
            searchBox.classList.add('shake');
            setTimeout(function () {
                searchBox.classList.remove('shake');
                obj.placeholder = 'search (no special characters)'
            }, 350)
        }
    }
}

