const passInp = Array.from(document.querySelectorAll('.vetification_input')) // оращаемся через селектор к инпутам, используем Array.from, так как обращаемся к Node-лист массивоподобный элемент
const codeNumber = document.querySelector('.code') // обращаемся к инпуту генерации чисел через селектор
const verifyBtn = document.querySelector('.verify_btn') // обращаемся к кнопке верификации через селектор
const showPassword = document.querySelector('.password_control') // обращаемся к кнопке "глаз" через селектор
const eyePass = Array.from(document.querySelectorAll('.password_control')) // обращаемся через селектор ко всем кнопкам "глаз", используем Array.from, так как обращаемся к Node-лист массивоподобный элемент
const nextBtn = document.querySelector('.sign_in_btn') // обращаемся к кнопкам ввода данных через селектор
const form = document.forms['sign'] // обращаемся к форме через селектор, используем квадратные скобки, так как обращаемся к форме
const backBtn = document.querySelector('.btn_back') // обращаемся через селектор к кнопке возвращения на предыдущую страницу
const mail = document.querySelector('.blue_text') // обращаемся к span email

const show = (e) => { // прописываем функцию для показа пароля, аргумент "е" - событие
    const input = e.target.previousElementSibling // обращаемся ко всем предыдущим узлам элемента, к которому будет применена данная функция
    if(input.getAttribute('type') == 'password') { // если тип атрибута "пароль", то поменять тип на текст
        input.setAttribute('type', 'text')
    } else {
		input.setAttribute('type', 'password') // если тип атрибута текст, поменять на пароль
	}
	return false // во всех остальный случаях, вернуть false
}


function getCode() { // прописываем функцию для генерации рандомного числа - кода
    const rNumber = Math.floor(Math.random() * (99000 - 10000) + 10000) // создаем переменную, прописываем рандом
    console.log(codeNumber) // выводим в консоль инпут генерации чисел
    codeNumber.value = rNumber // содержимое данного инпута должно ровняться сгенерированному числу
}


function verify() { // создаем функцию верификации
    let str = passInp.map(item => item.value).join('') // создаем строку, которая принимает значение инпутов, далее масси с инпутами прогоняем через map, чтобы вытащить каждый отдельный item, после чего используем join, чтобы снова объеденить все item в одностроковое значение
    console.log(str == codeNumber.value) // выводим через консоль, что строка равна содержимому инпуту, в который выводится рандомное число
}
eyePass.map(item => item.addEventListener('click', show)) // прогоняем eyePass через map, навешиваем на каждый item слушатель событий, вызывающий функцию show (показать содержимое пароля, вместо точек) при клике на элемент


passInp.map((item, index, arr) => item.addEventListener('input', () => { // создаем функцию для автоматического перехода от инпута к инпту
    if(item.value.length >= 1 && arr[index + 1]) { // условие: если длина содержимого инпута больше или равна одному, то совершить переход
        arr[index + 1].focus() // focus() означает, что элемент активен
    }
}))

function btnSub(href) { // функция для кнопок ввода/ регистрации
    const elements = [...form.elements].filter(item => item.classList.contains('data')) // создаем пееменную для всех элементов формы с классом "data"
    const bool = elements.filter(item => item.value !='') // создаем переменную для всех пустых инпутов
    localStorage.setItem('email', elements[0].value) // подключаем localStorage для передачи email с первой страницы на span страницы верификации
    
    for(let i = 0; i < elements.length; i++) { // создвем цикл для содержимого инпутов elements
        if (elements[i].value == '') { // если значение инпутов пустое, данные не введены, то окрашивать границы данного инпута в красный цвет
            elements[i].classList.add('red_border') // добавление класса с css свойством border-color:red
        } else {
            elements[i].classList.remove('red_border') // если содержимое инпута заолнено, удалить этот класс
        }
    }
    enterValid(bool, elements, href) // вызов функции валидации
    //console.log(bool, elements)
}

function enterValid(bool, elements, href) { // создаем функцию валидации
    if(bool.length == elements.length && validation(elements) && elements[1].value.length >= 6 ) { // если длина элементов меньше или равна 6, то удалить класс, окрашивающий границу в красный цвет
        elements[0].classList.remove('red_border') // удаление класса с красными границами
        elements[1].classList.remove('red_border')// удаление класса с красными границами
       window.location.href = href // подключение ссылки перехода на страницу верификации
    } if (elements[1].value.length < 6) { // если длина инпута с паролем меньше 6 символов, то поменять плейсхолдер
        ationValid(elements[1], "Length of password less six symbols")
    } if (!validation(elements)) { // если email ней соответствует валидации, поменять плейсхолдер
        ationValid(elements[0], "Email is uncorrect")
    } 
} 
function ationValid(elem, text) { // функция для смены плейсхолдера и добавления красных границ
    elem.classList.add('red_border')
    elem.value = ''
    elem.placeholder = text
}

function validation(elements) { // функция валидации
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(elements[0].value)
}

function goBack() { // прописфываем функцию для кнопки возвращения на предыдущую страницу
    window.history.go(-1)
}

let timer = 0 // обнуляем таймер
const newCode = document.querySelector('.havent_code') // ищем по селктору ссылку на запрос нового кода
function startTimer() { // функция обратного отсчета таймера
    let sec = 59 // изначально 59 секунд
    let min = 4 // изначально 4 минуты
    const time = document.querySelector('.timer') // обращаемся чеез селектор объект с классом timer
    const interval = setInterval(() => { // прописываем интервал
        time.innerHTML = sec > 9 ? `0${min}:${sec}` : `0${min}:0${sec}` // обращаемся к содержимому time, пишем, если секунд меньше 9 , то отобразить содержимое, как указано в бэктиках, иначе так, как указано в других бэктиках
        sec-- // указываем, что секунды должны уменьшаться
        if(sec == 0) { // если секунд 0, то минуты должны начать уменьшаться, а секунд должно стать снова 59
            min--
            sec = 59
        }
        if(min < 0 ) { // если минут 0, очистить интервал и отправить ссылку на получение нового кода
            clearInterval(interval)
            newCode.classList.remove('hide_caption') // удаление класса, скрывающего ссылку
        }
    }, 1000)
}

if(window.location.href == 'http://127.0.0.1:5500/varification.html') { // если мы находимся на странице верификации, то передать на нее данные localStorage
    const local = localStorage.getItem('email') // передача localStorage на страницу верификации
    mail.innerText = local // присваиваем переменную local содержимому переменной mail
    console.log(local)
}
