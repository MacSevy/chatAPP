let menuToggle = document.querySelectorAll('.toggle');
let navigation = document.querySelectorAll('.navigation');

menuToggle.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navigation.forEach(function (nav) {
            nav.classList.toggle("active");
        });
    });
});

   

    //add active class in selected list items
let list = document.querySelectorAll('.list');
for (let i = 0; i<list.length; i++){
    list[i].onclick = function(){
        let j = 0;
        while(j<list.length){
            list[j++].className = 'list';
        }
        list[i].className = "list active";
    }
}