window.onload = function(){
    //let form = document.querySelector ('#result-generator');
    
    //let fileJson = document.getElementById ("#input__file");

    // загрузка json файла //
    let clear = document.querySelector ('.btn-clear');
    let btnLoad = document.querySelector('.form__btn');
    let newForm = document.querySelector('.newForm');
    btnLoad.onclick = function(event) {
        newForm.classList.add('form-result');
        clear.classList.add('clear-active')
        //createJsonFiles();
    }; 

    //Проверка кол-ва загруженных файлов
    let inputs = document.querySelectorAll('.input__file');
    Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
    labelVal = label.querySelector('.input__file-button-text').innerText;
    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files.length >= 1)
        countFiles = this.files.length;
        if (countFiles)
        label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
        else
        label.querySelector('.input__file-button-text').innerText = labelVal;
        });
    }); 


}//onload