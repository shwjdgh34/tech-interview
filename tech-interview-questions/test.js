let a = 4;
function parent() {
    console.log(a);
    a += 4;
}
parent();
a = 4;
parent();

parent();

console.log(a);
