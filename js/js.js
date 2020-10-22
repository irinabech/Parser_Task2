window.onload = function(){
    //let form = document.querySelector ('#result-generator');
    let fileJson = document.querySelector("#input__file");
    let clear = document.querySelector ('.btn-clear');

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
    // загрузка json файла //
    
    let btnLoad = document.querySelector('.form__btn');
    let newForm = document.querySelector('.newForm');
    btnLoad.onclick = function(event) {
        newForm.classList.add('form-result');
        clear.classList.add('clear-active')
        loadJson();
    };
    

     // чтение json //
    function loadJson() {
    let loadFile =fileJson.files[0];
    let json = new FileReader();
    json.onload = dataJson;
    json.readAsText(loadFile);

    function dataJson(e) {
        let resultForm = e.target.result;
        console.log(resultForm)
        }
    }

    
  // удаление формы //

    function clearForm() {
        clear.addEventListener('click', () => {
        if (newForm) {
            newForm.innerHTML = '';
            newForm.classList.remove('form-result');
            clear.classList.remove('clear-active')
        }
        });
    }
clearForm();

}//onload