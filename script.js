"use script";

let toDos = [];

function onPageStart() {
    const localStorageData = localStorage.getItem("ToDos");
    const localStorageParse = JSON.parse(localStorageData);
    if (localStorageParse) {
        toDos = localStorageParse;
    }
    generateList();
}

onPageStart();
function generateList() {
    let list = `<ul>`;
    toDos.forEach(function (element, index) {
        list += `<li id="${index}">
     <span id="toDo-${index}"`;
        if (element.checked) {
            list += `class="checked"`;
        }
        list += `> ${element.label} </span>
    <button onclick="deleteItem('${index}')">&#10060;</button>
    <button onclick="checkedItem('${index}')">&#10004;</button>
    </li>
    `;
    });
    list += `</ul>`;
    document.getElementById("lista").innerHTML = list;
    localStorage.setItem("ToDos", JSON.stringify(toDos));
}


function addToDo() {

    const newItemElem = document.getElementById("newItem");
    const newItemElemValue = newItemElem.value;
    if (newItemElemValue.trim() !== "") {

        const item = {
            label: newItemElemValue.trim(),
            checked: false,
        };
        toDos.push(item);

        generateList();
        newItemElem.value = "";
    }
}

function onKeyUp(event) {
    if (event.keyCode === 13) {
        addToDo();
    }
}

function onClick() {
    addToDo();
}

function deleteItem(index) {
    toDos.splice(index, 1);
    generateList();
}

function checkedItem(index) {
    toDos[index].checked = !toDos[index].checked;
    generateList();
}





