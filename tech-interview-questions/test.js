var myObj = {
    register: function () {
        setTimeout(() => {
            printData();   //결과는?
        });
    },

    printData: function () {
        console.log('clicked');
    }
}

myObj.register();