window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a){
        for(let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    
    let deadline = '2020-09-20';



    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*60*24));
            
        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds,
        };
    }
    
    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
    
            function updateClock(){
                let t = getTimeRemaining(endtime);
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;
    
                if(t.total <= 0){
                    clearInterval(timeInterval);
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00';
                }
            }
    }
    
    setClock('timer', deadline);

    //modal

let more = document.querySelector('.more'),
    dscrBtn = document.querySelectorAll('.description-btn'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    dscrBtn.forEach(function(item){
        item.addEventListener('click', function(){
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        });
    });
        

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

//modal-window form

let message = {
    loading : 'Загрузка...',
    success : 'Спасибо! Скоро мы с вами свяжемся!',
    failure : 'Что-то пошло не так..',
};

let form = document.getElementsByClassName('main-form')[0],
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

function sendForm(elem){
    elem.addEventListener('submit', function(e){
        e.preventDefault();
        elem.appendChild(statusMessage);
        let formData = new FormData(form);

        function postData(data){

            return new Promise(function(resolve, reject){
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php'); 

                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                request.onreadystatechange = function(){
                    if(request.readyState < 4) {
                        resolve();
                    } else if(request.readyState === 4) {
                        if(request.status == 200 && request.status < 3) {
                            resolve();
                        }
                        else {
                            reject();
                        }
                    }
                }
                request.send(data);
            });
        } // End postData
    
        
        function clearInput(){
            for(let i = 0; i < input.length; i++){
                input[i].value = '';
            }
        }
        
            
    postData(formData)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => {
            statusMessage.innerHTML = '';
        })
        .catch(() => statusMessage.innerHTML = message.failure)
        .then(clearInput);
    });
    }
            
sendForm(form);


            

                

            //contact-form

            let contactForm = document.getElementById('form'),
                contactInput = contactForm.getElementsByTagName('input'),
                contactStatusMessage = document.createElement('div');
                console.log(contactForm);
                contactStatusMessage.classList.add('status');

                contactForm.addEventListener('submit', function(e){
                    e.preventDefault();
                    contactForm.appendChild(contactStatusMessage);

                    let req = new XMLHttpRequest();

                    req.open('POST', 'server.php');
                    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                    let contactFormData = new FormData(contactForm);
                    
                    let cObj = {};

                    contactFormData.forEach(function(key, value){
                        cObj[key] = value;
                    });

                    let cjson = JSON.stringify(cObj);

                    req.send(cjson);

                    req.addEventListener('readystatechange', function(){
                        if(req.readyState < 4){
                            contactStatusMessage.innerHTML = message.loading;
                        } else if(req.readyState === 4 && req.status == 200){
                            contactStatusMessage.innerHTML = message.success; 
                        } else {
                            contactStatusMessage.innerHTML = message.failure;
                        }
                    });

                    for(let i = 0; i < contactInput.length; i++){
                        contactInput[i].value = '';
                    }
                });

//slider

let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

showSlides(slideIndex);

    function showSlides(index){

        if(index > slides.length){
            slideIndex = 1;       
        } 
        if(index < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(index){
        showSlides(slideIndex += index);
    }

    function currentSlide(index){
        showSlides(slideIndex = index);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(e){
        for(let i = 0; i < dots.length + 1; i++){
            if(e.target.classList.contains('dot') && e.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });

setInterval(function(){
    plusSlides(1);
}, 5000);


let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.textContent = '0';

    persons.addEventListener('change', function(){
        personsSum = this.value;
        total = (daysSum + personSum) * 4000;

        if(restDays.value == ''){
            totalValue.textContent = '0';
        } else {
            totalValue.textContent = total;
        }
    });


    restDays.addEventListener('change', function(){
        daysSum = this.value;
        total = (daysSum + personSum) * 4000;

        if(persons.value == ''){
            totalValue.textContent = '0';
        } else {
            totalValue.textContent = total;
        }
    });

    place.addEventListener('change', function(){
        if(restDays.value == '' || persons.value == ''){
            totalValue.textContent = '0';
        } else {
            let a = total;
            totalValue.textContent = a * this.options[this.selectedIndex].value;
        }
    });
});