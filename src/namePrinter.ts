

export function printName(name){
    console.log(name);
}

export function getName(){
    return "New Name";
}

export function printAllNames(names){
    names.forEach(name => {
        printName(name);
    })
}