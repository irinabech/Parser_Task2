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
            newForm.innerHTML+='<br>' + '<h1>' + resultForm['name'] + '</h1>';

            for (let value of resultForm['fields']) {
                if (value['input']['type'] == 'technology') {
                    let data = '';
                    for (let i=0; i < value['input']['technologies'].length; i++) {
                        data += ' <option >' + value['input']['technologies'][i] + '</option> ';
                    }
                    newForm.innerHTML += '<br>' + '<label>' + value["label"] + '</label>' + '<select' + (value['input']['multiple']? ' multiple' : '') + 
                    (value['input']['required'] ? ' required' : '') + '>' + data + '<\select>';;
                }
                else if (value['input']['type'] == 'file') {
                    let accept = '';
                    if (value['input']['filetype']) {
                        accept += ' accept = ".' + value['input']['filetype'].join(', .') + '"';
                    }
                    newForm.innerHTML += '<br>' + '<label>' + value["label"] + '</label>' + '<input' + ' type=' + value["input"]["type"] + accept  +
                    (value['input']['required'] ? ' required' : '') + (value['input']['multiple']? ' multiple' : '') + '>';

                }
                else if (value['input']['type'] == 'color') {
                    let list = ''
                    if (value['input']['colors']) {
                        list += '<datalist id="Color">';
                        for(let i=0;i < value['input']['colors'].length; i++) {
                            list += '<option value="' + value['input']['colors'][i] + '">';
                        }
                        list += '</datalist>';
                    }
                    newForm.innerHTML += '<br>' + (value['label']? '<label>' + value["label"] + '</label>': '') + list + '<input' + ' type=' + value["input"]["type"] +
                        (value['input']['colors']? ' list ="Color" value="' + value['input']['colors'][0] + '"' : '') + '>';
                }
                else {
                    function makeid(length) {
                        var result           = '';
                        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        var charactersLength = characters.length;
                        for ( var i = 0; i < length; i++ ) {
                           result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        }
                        return result;
                    }
                    let class_name = makeid(10);

                    newForm.innerHTML += '<br>' + (value['label']? '<label>' + value["label"] + '</label>': '') + '<input' + ' type=' + (value['input']['mask']? 'text': value["input"]["type"]) + (value['input']['required'] ? ' required' : '') 
                        + (value['input']['placeholder']? ' placeholder="' + value['input']['placeholder'] + '"' : '') + (value['input']['mask']? ' class="' + class_name +'"' : '') + '>';
                    if(value['input']['mask']) {
                        jQuery(newForm).ready(function($){
                            $('.newForm .' + class_name).mask(value['input']['mask']);
                    });
                    }
                }    
            }
            
            if (resultForm['references']) {
                for (let value of resultForm['references']) {
                    if(value['input']) {
                    newForm.innerHTML+='<br><input type=' + value["input"]["type"] + (value['input']['checked'] ? ' checked' : '') +'>'
                    }
                }
            }
            if (resultForm['references']) {
                    for (let value of resultForm['buttons']) {
                        newForm.innerHTML+='<br><button>' + value['text'] + '</button>'
                    }
                }
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