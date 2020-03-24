function add_champion(){
    let table = document.getElementById('championTable').getElementsByTagName('tbody')[0];
    let row = table.insertRow();

    let rowCount = document.getElementById('tableBody').rows.length - 1;

    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    
    let input_class = document.createElement('input');
    input_class.type = 'text';
    cell1.appendChild(input_class);

    let input_champion = document.createElement('input');
    input_champion.type = 'text';
    cell2.appendChild(input_champion);
   
    let button_save = document.createElement('button');
    button_save.type = 'button';
    button_save.innerHTML = 'Save';
    button_save.setAttribute('onclick', 'save_champion(' + rowCount + ')');

    let button_delete = document.createElement('button');
    button_delete.type = 'button';
    button_delete.innerHTML = 'Remove';
    button_delete.setAttribute('onclick', 'delete_champion(' + rowCount + ')');

    cell3.appendChild(button_save);    
    cell3.appendChild(button_delete);
}

function save_champion(row_number){
    let champion_class = document.getElementById('tableBody').rows[row_number].cells[0].childNodes[0];
    let champion_name = document.getElementById('tableBody').rows[row_number].cells[1].childNodes[0];
    
    champion_class_value = champion_class.value;
    champion_name_value = champion_name.value;
    champion_class.remove();
    champion_name.remove();

    let champion_class_text = document.createTextNode(champion_class_value);
    let replacedCell1 = document.getElementById('tableBody').rows[row_number].cells[0];
    replacedCell1.appendChild(champion_class_text); 

    let champion_name_text = document.createTextNode(champion_name_value);
    let replacedCell2 = document.getElementById('tableBody').rows[row_number].cells[1];
    replacedCell2.appendChild(champion_name_text);

    let edit_button = document.getElementById('tableBody').rows[row_number].cells[2].childNodes[0];
    edit_button.innerHTML = 'Edit';
    edit_button.setAttribute('onclick', 'edit_champion(' + row_number + ')');
}

function edit_champion(row_number){
    let champion_class = document.getElementById('tableBody').rows[row_number].cells[0].innerHTML;
    let champion_name = document.getElementById('tableBody').rows[row_number].cells[1].innerHTML;

    let input_class = document.createElement('input');
    input_class.type = 'text';
    input_class.value = champion_class;
    document.getElementById('tableBody').rows[row_number].cells[0].innerHTML = '';
    document.getElementById('tableBody').rows[row_number].cells[0].appendChild(input_class);

    let input_champion = document.createElement('input');
    input_champion.type = 'text';
    input_champion.value = champion_name;
    document.getElementById('tableBody').rows[row_number].cells[1].innerHTML = '';
    document.getElementById('tableBody').rows[row_number].cells[1].appendChild(input_champion);

    let save_button = document.getElementById('tableBody').rows[row_number].cells[2].childNodes[0];
    save_button.innerHTML = 'Save';
    save_button.setAttribute('onclick', 'save_champion(' + row_number + ')');
}

function delete_champion(row_number){
    for(let i=0; i<3; i++){
        document.getElementById("tableBody").rows[row_number].cells[0].remove();
    }
}
