async function main() {
    console.log("Loading data...");
    try {
        const data = await loadData();
        console.log("Data loaded!");
        console.log("Data: " + data);
    }
    catch (error) {
        console.log(error);
    }
}
function loadData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = Math.random() > 0.5;
            if (success) {
                resolve(['Anna', 'Ben', 'Carla']);
            }
            else {
                reject("An error occurred while loading data");
            }
        }, 1500);
    });
}
main();
export {};
