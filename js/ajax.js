/*-------------------------Регистрация---------------------------------*/
/* Отправка запроса на страницу регистрации и вывод ошибок без перезагрузки страницы */
document.querySelector("#registration").addEventListener('submit', function(e){
    e.preventDefault(); /* Убираем переадрисацию на страницу регистрации */

    axios.post(this.action, { /* Пост запрос с помощью axios(this.action - адресной строкой будет является переадрисация внутри формы) */
        'login': document.querySelector('#loginReg').value, /* Отправляем значения input на сервер */
        'FI': document.querySelector('#FI').value,
        'phone': document.querySelector('#phone').value,
        'email': document.querySelector('#email').value,
        'password': document.querySelector('#passwordReg').value
    })
    .then(function(response){ /* Что происходит в случае если валидация прошла успешно */
        location.reload(); /* Перезагрузка страницы */
    })
    .catch(function(error){ /* Что происходит в слечае если валидация выдает ошибки */
        let errors = error.response.data.errors; /* Берем все ошибки в переменную */
        let firstError = Object.keys(errors)[0]; /* Записываем самую первую ошибку в переменную */
        var ErrorMessage = errors[firstError][0];/* Записываем текст ошибки */
        document.querySelector('#registration p').innerHTML = ErrorMessage;/* Записывает в параграф о ошибках сам текст ошибки */
    })        
});

/*-------------------------Вход---------------------------------*/
/* Отправка запроса на страницу входа и вывод ошибок без перезагрузки страницы */
document.querySelector("#loginForm").addEventListener('submit', function(e){
    e.preventDefault(); /* Убираем переадрисацию пользователя */

    axios.post(this.action, { /* Начала отправки запроса */
        'login': document.querySelector("#loginLog").value, /* Отправляем значения input на сервер */
        'password': document.querySelector('#passwordLog').value
    })
    .then(function(response){ /* Что происходит в случае успешного входа */
        location.reload(); /* Перезагружаем страницу */
    })
    .catch(function(error){ /* Что происходит в случае ошибки */
        let errors = error.response.data; /* Берем имена ошибок в переменную */
        let firstError = Object.keys(errors)[0]; /* Записываем самую первую ошибку в переменную */
        var ErrorMessage = errors[firstError];/* Записываем текст ошибки */
        document.querySelector('#loginForm p').innerHTML = ErrorMessage;/* Записывает в параграф о ошибках сам текст ошибки */
    })
});

/*-------------------------Удаление аккаунта---------------------------------*/
/* Отправка запроса на страницу удаления аккаунта и вывод ошибок без перезагрузки страницы */
document.querySelector("#deleteProfile").addEventListener('submit', function(e){
    e.preventDefault(); /* Убираем переадрисацию пользователя */

    if(confirm('Вы точно хотите удалить аккаунт?')){ /* Окно с подтверждение что пользователь точно хочет удалить аккаунт */
        axios.post(this.action, { /* Начала отправки запроса */

        })
        .then((response) => { /* Что происходит в случае успешного удаления аккаунта */
            alert('Аккаунт был удален'); /* Вывод сообщение */
            location.reload(); /* Перезагружаем страницу */
        })
        .catch((error) => {
            alert('Произошла ошибка');
        })
    }
})
