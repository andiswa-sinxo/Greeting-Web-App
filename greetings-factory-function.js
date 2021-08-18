module.exports = function Greetings() {

    const alpha = /^([A-Za-z])+$/g;;

    var storedName = {};

    function nameLanguage(names, language) {

        var string = names.toLowerCase();
        var name = string.charAt(0).toUpperCase() + string.slice(1);
        // if (alpha.test(name)=== true) {
           
            NameStoring(name)

            if (language === "French") {
                return 'Bonjour, ' + name
            }
            if (language === "IsiXhosa") {
                return 'Molo, ' + name
            }
            if (language === "Spanish") {
                return 'Hola, ' + name

            }
        // }else{
        //     return 'invalid input'
        // }
    }

    function emptyText(name) {
        if (name === "") {
            return "Please enter a name.";
        }
    }

    function enterNumber(name) {

        return "Please enter a valid name.";
    }

    function NameStoring(names) {

        var string = names.toLowerCase();
        var name = string.charAt(0).toUpperCase() + string.slice(1);


        if (storedName[name] === undefined) {
            storedName[name] = 0
        } else {
            storedName[name]++
        }
    //     console.log(storedName)
    }

    function lengthName() {
        return Object.keys(storedName).length
    }

    function getStoredName() {
        return NameGreet
    }

    return {
        nameLanguage,
        emptyText,
        enterNumber,
        NameStoring,
        lengthName,
        getStoredName

    }
}