// TODO: sticky-popup
document.getElementById("sticky-popup").addEventListener("click", togglePopup);

// document.querySelectorAll('#sticky-popup').forEach(item => {
//   item.addEventListener('click', togglePopup(e));
// })
// var stickyPopup = document.querySelector("#sticky-popup");
// for( let i = 0 ; i < stickyPopup.length ; i++) {
//   stickyPopup[i].addEventListener("click", togglePopup());
// }

function togglePopup() {
  console.log('click');
  var element = document.getElementById("sticky-popup");
  element.classList.toggle("open");
  // item.classList.toggle("open");
  
  var type = document.querySelector(".dot-menu");
  if(type.classList.contains("active") === true){
      type.classList.remove("active");
    }else{
      type.classList.add("active");
    }
}