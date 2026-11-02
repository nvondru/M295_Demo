const firstName = "Nicolas";
const names = ["Nicolas", "Dario", "Noam"];
let newName = getName();


function printName(name){
    console.log(name);
}

function getName(){
    return "New Name";
}

function printAllNames(){
    names.forEach(name => {
        printName(name);
    })
}


printName(firstName);
printName(newName);
printAllNames();


