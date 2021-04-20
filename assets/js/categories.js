// (function () {
//     const showElems = document.getElementsByClassName('showDetails');
//     for (let e of showElems) {
//         e.addEventListener('click', function () {
//             const details = this.nextElementSibling;
//             const img = this.getElementsByTagName('img');
//             const label = this.getElementsByTagName('label');

//             if (details.classList.contains('show')) {
//                 details.classList.remove('show');
//                 details.classList.add('hide');
//                 img[0].src = "/img/icons/chevron-double-down.svg";
//             label[0].textContent = "Show Details";
//             } else {
//                 details.classList.remove('hide');
//                 details.classList.add('show');
//                 img[0].src = "/img/icons/chevron-double-up.svg";
//             label[0].textContent = "Hide Details";
//             }
//         })
//     }
// })();