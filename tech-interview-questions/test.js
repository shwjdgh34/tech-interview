var initText;

function init(number) {
    var textList = ["is Odd Text", "is Even Text"];
    if (number % 2 == 0) {
        initText = textList[1];
    } else {
        initText = textList[0];
    }
};

init(1);
console.log(initText);
console.log(textList);
