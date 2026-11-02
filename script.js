const firstName = "Nicolas";
const names = ["Nicolas", "Dario", "Noam"];

let person = {
    name: "Max",
    age: 22
}

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


let newName = getName();
printName(firstName);
printName(newName);
printAllNames();

printName(person.name);

