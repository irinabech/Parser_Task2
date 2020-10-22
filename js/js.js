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
        let loadFile = fileJson.files[0];
        let resultForm = {}
        let json = new FileReader();
        json.onload = dataJson;
        json.readAsText(loadFile);
        function dataJson(e) {
            resultForm = JSON.parse(e.target.result);
            //console.log(resultForm)
            //console.log(resultForm['name'])
            //console.log(resultForm['fields'])
            //console.log(resultForm['references'])
            //console.log(resultForm['buttons'])
            newForm.classList.add('form-result');
            clear.classList.add('clear-active');
            
            //генерация форм

            //input, button, checkbox
            newForm.innerHTML+='<br>' + resultForm['name'];

            for (let value of resultForm['fields']) {
                if (value['input']['type'] == 'technology') {
                    //let multiple = document.createElement('select')
                    //newForm.innerHTML+='<br>' + value["label"] + '<input' + ' type=' + value["input"]["type"] + (value['input']['required'] ? ' required' : '') 
                    //+ ' placeholder=' + (value['input']['placeholder']? '"' + value['input']['placeholder'] + '"' : '')+'>' +
                    let data = '';
                    let length = value['input']['technologies'].length;
                    for (let i=0; i < length; i++) {
                        data += ' <option >' + value['input']['technologies'][i] + '</option> ';
                    }
                    newForm.innerHTML += '<br>' + value['label'] + '<select' + (value['input']['multiple']? ' multiple' : '') + 
                    (value['input']['required'] ? ' required' : '') + '>' + data + '<\select>';;
                }
                else {
                    newForm.innerHTML+='<br>' + value["label"] + '<input' + ' type=' + value["input"]["type"] + (value['input']['required'] ? ' required' : '') 
                        + ' placeholder=' + (value['input']['placeholder']? '"' + value['input']['placeholder'] + '"' : '')+'>'
                }
            }
            for (let value of resultForm['references']) {
                if(value['input']) {
                newForm.innerHTML+='<br><input type=' + value["input"]["type"] + (value['input']['checked'] ? ' checked' : '') +'>'
                }
            }
            for (let value of resultForm['buttons']) {
                newForm.innerHTML+='<br><button>' + value['text'] + '</button>'
            }
            }
        }
        //
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