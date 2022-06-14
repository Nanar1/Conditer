//-------------------------------------------\/Адаптивность\/-------------------------------------------
window.addEventListener("resize", function(){
    if(window.screen.width<=960){
        document.querySelector("#header-bottom-left-up p:first-of-type").innerHTML = "Ремесленная мастерская";
        document.querySelector("#header-bottom-left-up p:last-of-type").innerHTML = "Ивана Куликова";
    } else{
        document.querySelector("#header-bottom-left-up p:first-of-type").innerHTML = "Ремесленная<br>мастерская";
        document.querySelector("#header-bottom-left-up p:last-of-type").innerHTML = "Ивана<br>Куликова";
    }
    init();
})
if(window.screen.width<=960){
    document.querySelector("#header-bottom-left-up p:first-of-type").innerHTML = "Ремесленная мастерская";
    document.querySelector("#header-bottom-left-up p:last-of-type").innerHTML = "Ивана Куликова";
    let links = document.querySelectorAll("#nav-links a");
    links.forEach(element => {
        element.addEventListener("click", function(){
            closeMenu();
        })
    });
}

//-------------------------------------------\/Добавление класса fix(Фиксирование навигации), когда пользователь не видит навигационное меню\/-------------------------------------------
window.onscroll = () => {
    let nav = document.querySelector('nav'); //Запись тега nav в переменную nav
    if(window.pageYOffset>=document.querySelector("nav").offsetHeight){ //Проверка на то, что пользователь проскролил навигацию
        nav.classList.add('fixed');// Добавление класса fixed
    } else{
        nav.classList.remove('fixed');//Удаление класса fixed
    }
    let header = document.querySelector('header'); //Запись тега header в переменную
    //Фикс того, что когда появляется nav - весь сайт перемещается вниз
    if(nav.classList.contains('fixed')){//Проверка на то что, у nav есть класс fixed
        header.style.paddingTop = document.querySelector("nav").offsetHeight + "px"; //Добавление отступа на Высоту nav
    } else{
        header.style.paddingTop = "0.83vw";//Возращения padding обратно
    }
}

//-------------------------------------------\/Slider(Слайдер)\/-------------------------------------------
var images = document.querySelectorAll(".slider .slider-line img"); //Блоки с картинками
var sliderLine = document.querySelector(".slider-line"); //Линия слайда
var count = 0; //Подсчет кол-ва блоков с картинками
var width;
var height;
var window1024 = false;
//Добавление перевижение слайдера с помощью тача
sliderLine.addEventListener("touchstart", handleTouchStart, false);
sliderLine.addEventListener("touchmove", handleTouchMover, false);
//Объявление переменное с x1
let x1 = null;
// Функция определения первого тапа
function handleTouchStart(e){
    //Записываем в переменную первое нажатие
    let firstTouch = e.touches[0];
    //Записываем в переменные X и Y нажатия
    x1 = firstTouch.clientX;
}
//Функция того, что будет происходить при свайпе
function handleTouchMover(e){
    //Просмотр было ли зажатие
    if(!x1){
        return false;
    }
    //Записываем второе нажатие
    let x2 = e.touches[0].clientX;
    // console.log(x2,y2);
    //Понимание куда идет сдвиг
    let xDiff = x2 - x1; 

    if(xDiff>0){
        count--;
        if(count < 0){ //Проверка на то, что счетчик стал не меньше чем 0
            sliderTypeMinus();
        }
    } else{
        count++;
        sliderTypePlus();
    }
    rollSlider();
    x1 = null;
}
//Функция адаптации картинок под div slider
function init(){
    //Пореврка на размер экрана, для показа одной или трех картинок
    if(window.screen.width > 960){ //Если экран больше 960 пикселей
        window1024 = false;//Ставим ложь к переменной на проверку
    } else if(window.screen.width <= 960){
        window1024 = true;//Ставим истинну к переменно на проверку
    }
    width = document.querySelector(".slider").offsetWidth;
    if(!window1024){//Поверка на размер экрана
        width /= 3; //Если экран больше, то делим на кол-во видимых картинок
    }
    sliderLine.style.width = width*images.length + "px";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     // Выставляем ширину линии слайдера
    for(let image of images){
        image.style.width = width + "px"; //Присваиваем ширину слайдера всем картинкам
        image.style.height = "auto";
    }
    rollSlider(); //Вызов функции, нужно для того, что бы при изменении ширины, картинки не застывали, а уходили в нормальное положение
}
init();
//Добовляем и пишем функцию для кнопки вправа
document.querySelector(".slider-next").addEventListener("click", function(){
    count++; //Добовляется один к счетчику
    sliderTypePlus();
    rollSlider(); //Вызов функции
})
//Добовляем и пишем функцию для кнопки влево
document.querySelector(".slider-prev").addEventListener("click", function(){
    count--; //Убераем один у счетчика
    if(count < 0){ //Проверка на то, что счетчик стал не меньше чем 0
        sliderTypeMinus();
    }
    rollSlider(); //Вызов функции
})
//Счетчик, который каждые полминуты переключает на следующий слайд
setInterval(function(){
    count++;
    if(count >= images.length){ //Проверка на то, что счетчик стал не больше чем кол-во картинок
        count = 0; //Сброс счетчика до нуля
    }
    sliderTypePlus();
    rollSlider(); //Вызов функции
}, 30000)
// Функция проверки какой тип картинки сейчас
function sliderTypePlus(){
    switch(window1024){
        case true:
            if(count > images.length){
                count = 0;
            }
        case false:
            if(count > images.length - 3){
                count = 0;
            }
    }
}
function sliderTypeMinus(){
    switch(window1024){
        case true:
            count = images.length - 1; //Сброс счетчика до максимальной картинки
        case false:
            count = images.length - 3; //Сброс счетчика до максимальной картинки
    }
}
//Функция перемещения картинки
function rollSlider(){
    sliderLine.style.transform = 'translate(-' + count * width + 'px' + ')'; //Перемещение картнки на опредленную ширину(кол-во куда нужно преместится * на ширину одной слайдера)
}

//-------------------------------------------\/Изменение кастомной иконки для checkbox\/-------------------------------------------
let checkbox = document.querySelector("#check"); //Сам чекбокс
let cusChecbox = document.querySelector("#label"); //Кастомный чекбокс
checkbox.addEventListener("click", function(){ //Добавляем ивент при наджатие на чекбокс
    if(!checkbox.checked){ //Если чекбокс нажат
        cusChecbox.classList.replace("fa-check-square", "fa-square-o") // Заменяем квадрат на галочку
        document.querySelector('#regSub').disabled = true;
    } else{
        cusChecbox.classList.replace("fa-square-o", "fa-check-square") //Заменяем галочку на квадрат
        document.querySelector('#regSub').disabled = false;
    }
    switch(window1024){
        case true:
            cusChecbox.style.fontSize = "2.60vw";
            break;
        case false:
            cusChecbox.style.fontSize = "1.56vw";
            break;
    }
})
//-------------------------------------------\/Popup(Модальное окно)\/-------------------------------------------
let popUpButs = document.querySelectorAll(".openPopUp");
let popUpBacks = document.querySelectorAll(".pop-up-back");
let exitButs = document.querySelectorAll(".exit");
//---Подключение функций открытия модального окна к кнопкам для откртия модал окон и его заднего фона
for(let popUpBut of popUpButs){
    popUpBut.addEventListener("click", function(){
        let popUpName = popUpBut.getAttribute("href").replace("#", "");
        showPopup(popUpName);
    })
}
//---Подключение функций закрытия модального окна к крестику
for(let exitBut of exitButs){
    exitBut.addEventListener("click", function(){
        let popUpName = exitBut.getAttribute("id").replace("But", "");
        closePopup(popUpName);
    })
}
//---Функция для показа Модального окна
function showPopup(id){ 
    let popUp = document.getElementById(id);
    popUp.classList.replace("disactive", "active");
}
//---Функция для скрытия Модального окна
function closePopup(id){
    let popUp = document.getElementById(id);
    popUp.classList.replace("active", "disactive");
}
//-------------------------------------------\/Бургер меню\/-------------------------------------------
var burger = document.querySelector("#buger");
var burgerLine = document.querySelector("#buger p");
var visible = false;
var linksBody = document.querySelector("#nav-body");
var links = document.querySelector("#nav-links a");
// Присваиваем открытие и закрытие меню с навигацией на одну кнопку(Саму кнопку бургер меню)
burger.addEventListener("click", function(){
    if(!visible){
        showMenu();
    } else{
        closeMenu();
    }
})
// Функция которая будет показывать меню
function showMenu(){
    visible = true;
    burger.style.cssText= `
    position: fixed;
    z-index: 50;
    right: 2.9vw;
    top: 3.9vw;
`
    linksBody.style.display = "block";
}
// Функция которая будет убирать меню
function closeMenu(){
    visible = false;
    burger.style.cssText= `
    position: none;
    z-index: 0;`
    linksBody.style.display = "none";
}
/* Отключение кнопки отпрвки при несовпадении паролей */
let pass1 = document.querySelector('#passwordReg');
let pass2 = document.querySelector('#passwordReg2');
pass1.addEventListener('input', () => {
    passwordValid();
});
pass2.addEventListener('input', () => {
    passwordValid();
});

function passwordValid() {
    if(pass1.value != pass2.value ){
        document.querySelector('#registration p').innerHTML = 'Пароли должны совпадать';
        document.querySelector('#regSub').disabled = true;
    } else{
        document.querySelector('#registration p').innerHTML = '';
        document.querySelector('#regSub').disabled = false;
    }
}

/* Создание маски для номера телефона */
let inputsPhone = document.querySelectorAll('.phone');
let mask = { /* Создаем шаблон маски */
    mask: '+7 (000) 000-00-00'
}
inputsPhone.forEach(inputPhone => {
    IMask(inputPhone, mask); /* Применяем маску на инпуты */
});