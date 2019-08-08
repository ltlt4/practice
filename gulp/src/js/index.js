class Ns {
    constructor(name) {
        this.name = name
    };
};
var arr=[1,2,3];
arr.forEach(item=>{
    console.log(item);
});
async function testAsync() {
    return "hello async";
}

const result = testAsync();
console.log(result);