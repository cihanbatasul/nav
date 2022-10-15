const container_div = document.getElementById('container');
const form = document.getElementById('form');
const selects = document.querySelector('select_list')
const select_1 = document.getElementById('select_start');
const select_2 = document.getElementById('select_ziel');
const bod = document.getElementById('bod');
const submit_btn = document.getElementById('btn');
let reset_btn, ergebnis, start_km, ziel_km, start_index, ziel_index;

const cities = [["Stadt 0", 0], ["Stadt 1", 60], ["Stadt 2", 120], ["Stadt 3", 180], ["Stadt 4", 200]];
cities.forEach((element, index)  => {
    select_1[index]  = new Option(element[0], index);
    select_2[index]  = new Option(element[0], index);
    select_1[index].setAttribute('class', 'dropdown_options');
    select_2[index].setAttribute('class', 'dropdown_options');
});



function assign(e){
    e.preventDefault();
    let start = select_1.options[select_1.selectedIndex].text;
    let ziel = select_2.options[select_2.selectedIndex].text;
    
    compare(start, ziel);
    console.log(start_km, ziel_km, start_index, ziel_index);
    calculate(start_km, ziel_km, start_index, ziel_index);
    
    create_div('div_selected_cities', 'div_selected_cities', 'p', `Ihr Startort: ${start} und ihr Zielort: ${ziel}. Sie müssen ${ergebnis} km fahren!`);
    enable_disable_select(select_1, select_2);
    disable_button(true);
    

}

function compare(start, ziel){
    cities.forEach((element) => {
        if(start === element[0]){
            start_km = element[1];
            start_index = cities.indexOf(element);
            
            
        }
        if(ziel === element[0]){
            ziel_km = element[1];
            ziel_index = cities.indexOf(element);

        }
    })
}

function calculate(start_km, ziel_km, start, ziel){
   
    if(start == ziel){
        ergebnis = 0;
    }else{
        if(start > ziel){
            ergebnis = start_km - ziel_km;
        }
        if(ziel >  start){
            ergebnis = ziel_km -  start_km;
        }
        }
    
    return ergebnis;
}

function create_div(class_name, id_name, child_El, child_text){
    let div = document.createElement('div');
    div.setAttribute("class", `${class_name}`);
    div.id = `${id_name}`;
    let p = document.createElement(`${child_El}`);

    p.textContent = `${child_text}`;
    div.appendChild(p);
    bod.append(div);
    
}
    
function enable_disable_select(select1, select2){
    if(select1.options[0].disabled == false){

        for(let i = 0; i < select1.length; i++){
            select1.options[i].disabled = true;
            select2.options[i].disabled = true;
            }

            select1.style.backgroundColor = "red";
            select2.style.backgroundColor = "red";
    }else{
        for(let i = 0; i < select1.length; i++){
            select1.options[i].disabled = false;
            select2.options[i].disabled = false;
            } 
            select1.style.backgroundColor = "#7a77ac";
            select2.style.backgroundColor = "#7a77ac";
            
    }
    
}   

function disable_button(bool){
    
    submit_btn.disabled = bool; 
    
    if(submit_btn.disabled == true){
        submit_btn.style.backgroundColor = "red";
        submit_btn.style.color = "white";
        submit_btn.textContent = "Reset";
        create_reset_button('Reset Now');
    }else if(submit_btn.disabled == false){
        submit_btn.style.backgroundColor = "#a29bfe";
        submit_btn.style.color = "rgb(61, 56, 56)";
        submit_btn.textContent = "Submit";
    }

    
}

function create_reset_button(text){
    reset_btn = document.createElement('button');
    reset_btn.textContent = `${text}`;
    reset_btn.id = "reset_btn";
    reset_btn.disabled = false;
    bod.appendChild(reset_btn);
}

function delete_button(btn_name){
    btn_name.parentNode.removeChild(btn_name);
}

function delete_answer_div(id){
    let div = document.getElementById(`${id}`);
    div.parentNode.removeChild(div);
}


document.addEventListener("click", (e) => {
    // reset button 
    if(e.target == reset_btn){
        disable_button(false);
        enable_disable_select(select_1, select_2);
        delete_button(reset_btn);
        delete_answer_div('div_selected_cities')
    }
})



