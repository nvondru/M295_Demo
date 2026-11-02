import {getName, printName, printAllNames} from "./namePrinter.js";
import irgendwas from "./math.js";

function test(name, myCallback){
    console.log(name);
    myCallback("Douglas");
}

test("Nicolas", (otherName) => {
    console.log("Callback: " + otherName);
});


























