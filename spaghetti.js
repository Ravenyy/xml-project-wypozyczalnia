var b1 = document.createElement("button");
b1.setAttribute("id", "addEmp");
b1.setAttribute("onclick", "addEmp()");
b1.innerHTML = "Dodaj pracownika";
document.getElementById("emp").appendChild(b1);
var b2 = document.createElement("button");
b2.setAttribute("id", "addCar");
b2.setAttribute("onclick", "sortCars()");
b2.innerHTML = "Sortuj samochody wg ceny";
document.getElementById("cars").appendChild(b2);
var b5 = document.createElement("button");
b5.setAttribute("id", "sortReverse");
b5.setAttribute("onclick", "sortCarsById()");
b5.innerHTML = "Sortuj samochody wg ID";
document.getElementById("cars").appendChild(b5);
/*var b4 = document.createElement("button");
b4.setAttribute("id", "addRes");
b4.innerHTML = "Edytuj dane rezerwacji";
document.getElementById("res").appendChild(b4);*/

function addEmp(){
	var y = document.getElementById("empTab").rows.length;
	var newEmpRow = document.createElement("TR");

    newEmpRow.setAttribute("id", `newEmpRow${y}`);
    document.getElementById("empTab").appendChild(newEmpRow);
    var newEmpID = document.createElement("TD");
    var newEmpName = document.createElement("TD");
    var newEmpLastName = document.createElement("TD");
    var newEmpDate = document.createElement("TD");
    var newEmpPhone = document.createElement("TD");
    newEmpID.innerHTML = "e" + y.toString();
    newEmpName.setAttribute("id", `TD1${y}`);
    newEmpLastName.setAttribute("id", `TD2${y}`);
    newEmpDate.setAttribute("id", `TD3${y}`);
    newEmpPhone.setAttribute("id", `TD4${y}`);
    document.getElementById(`newEmpRow${y}`).appendChild(newEmpID);
    document.getElementById(`newEmpRow${y}`).appendChild(newEmpName);
    document.getElementById(`newEmpRow${y}`).appendChild(newEmpLastName);
    document.getElementById(`newEmpRow${y}`).appendChild(newEmpDate);
    document.getElementById(`newEmpRow${y}`).appendChild(newEmpPhone);
    
	var f1 = document.createElement("INPUT");
    var f2 = document.createElement("INPUT");
    var f3 = document.createElement("INPUT");
    var f4 = document.createElement("INPUT");
	f1.setAttribute("id", "empN");
	f1.setAttribute("type", "text");
    f2.setAttribute("id", "empLN");
	f2.setAttribute("type", "text");
    f3.setAttribute("id", "empD");
	f3.setAttribute("type", "text");
    f4.setAttribute("id", "empP");
	f4.setAttribute("type", "text");
	document.getElementById(`TD1${y}`).appendChild(f1);
	document.getElementById(`TD2${y}`).appendChild(f2);
	document.getElementById(`TD3${y}`).appendChild(f3);
	document.getElementById(`TD4${y}`).appendChild(f4);
	
    var delButt = document.getElementById("addEmp");
    delButt.parentNode.removeChild(delButt);
    var okButt = document.createElement("button");
    okButt.setAttribute("id", "OK");
    okButt.setAttribute("onclick", "addEmpNext()");
    okButt.innerHTML = "OK";
	document.getElementById("emp").appendChild(okButt);
    }

function addEmpNext(){
		var y = document.getElementById("empTab").rows.length;
		var x = document.getElementById("empN").value;
        var txtNode = document.createTextNode(x);
        var elToDel = document.getElementById("empN");
        var td1NewValue = document.getElementById(`TD1${y-1}`)
        elToDel.parentNode.removeChild(elToDel);
        td1NewValue.appendChild(txtNode);
        
        x = document.getElementById("empLN").value;
        txtNode = document.createTextNode(x);
        elToDel = document.getElementById("empLN");
        var td2NewValue = document.getElementById(`TD2${y-1}`)
        elToDel.parentNode.removeChild(elToDel);
        td2NewValue.appendChild(txtNode);
        
        x = document.getElementById("empD").value;
        txtNode = document.createTextNode(x);
        elToDel = document.getElementById("empD");
        var td3NewValue = document.getElementById(`TD3${y-1}`)
        elToDel.parentNode.removeChild(elToDel);
        td3NewValue.appendChild(txtNode);
        
        x = document.getElementById("empP").value;
        txtNode = document.createTextNode(x);
        elToDel = document.getElementById("empP");
        var td4NewValue = document.getElementById(`TD4${y-1}`)
        elToDel.parentNode.removeChild(elToDel);
        td4NewValue.appendChild(txtNode);
        
        elToDel = document.getElementById("OK");
        elToDel.parentNode.removeChild(elToDel);
        document.getElementById("emp").appendChild(b1);
        }

function sortCars(){
  var table, rows, switching, i, x, y, shouldSwitch, xToNumber, yToNumber;
  table = document.getElementById("carsTab");
  switching = true;
  while (switching) {
   	switching = false;
   	rows = table.rows;
   	for (i = 1; i < (rows.length - 1); i++) {
   	shouldSwitch = false;
   	x = rows[i].getElementsByTagName("TD")[9].innerHTML;
   	y = rows[i + 1].getElementsByTagName("TD")[9].innerHTML;
    xToNumber = parseInt(x, 10);
    yToNumber = parseInt(y, 10); 	
   	if (xToNumber > yToNumber) {
    	shouldSwitch = true;
   		break;  
   		}
	}
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  }
  
function sortCarsById() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("carsTab");
  switching = true;
  while (switching) {
   	switching = false;
   	rows = table.rows;
   	for (i = 1; i < (rows.length - 1); i++) {
   	shouldSwitch = false;
   	x = rows[i].getElementsByTagName("TD")[0];
   	y = rows[i + 1].getElementsByTagName("TD")[0];
   	if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
    	shouldSwitch = true;
   		break;  
   		}
	}
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  }
 
function setColumnsAttribute(tab){
  var cells, i, cell;
  cells = tab.rows[0].cells.length;
  for(i=0; i<cells; i++){
  	cell = tab.rows[0].getElementsByTagName("TH")[i];
  	cell.setAttribute("onclick", `sortClients(${i})`);
    }
  }
  
  setColumnsAttribute(document.getElementById("clientsTab"));
  
  function sortClients(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("clientsTab");
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

/*function setCellsAttribute(tab){
  var cells, i, cell, j;
  cells = tab.rows[0].cells.length;
  for(i=1; i<tab.rows.length; i++){
  		for(j=0; j<cells; j++){
  			cell = tab.rows[i].getElementsByTagName("TD")[j];
  			cell.setAttribute("onclick", `editData(${i}+${j})`);
   		}
    }
  }
  setCellsAttribute(document.getElementById("resTab"));
  
function editData(n){
  var tab, cells, i, cell, j;
  tab = document.getElementById("resTab");
  cells = tab.rows[0].cells.length;
  for(i=1; i<tab.rows.length; i++){
  		for(j=0; j<cells; j++){
  			cell = tab.rows[i].getElementsByTagName("TD")[j];
  			if(n == Number(${i}+${j})){
            	tab.rows[i]document.getElementByTag("TD")[j].innerHTML = 
            }
   		}
    }
}*/