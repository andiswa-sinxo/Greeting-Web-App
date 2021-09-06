module.exports = function Greetings() {

    const alpha = /^([A-Za-z])+$/g;;

    var storedName = [];

    function nameLanguage(names, language) {

        var string = names.toLowerCase();
        var name = string.charAt(0).toUpperCase() + string.slice(1);

        NameStoring(name)
        if (!name || !language) {
            return null
        }
        if (name == null || name == Number(name)) {
            return null
        }
        if (language === "French") {
            return 'Bonjour, ' + name
        }
        if (language === "IsiXhosa") {
            return 'Molo, ' + name
        }
        if (language === "Spanish") {
            return 'Hola, ' + name

        }
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
        if (storedName.length === 0) {
            storedName.push({
                names: name,
                counter: 1
            });
        }
        else {
            if (!storedName.some(storedName => storedName.names === name)) {
                storedName.push({
                    names: name,
                    counter: 1
                })

            } else {
                storedName.forEach(element => {
                    if (element.names === name) {
                        element.counter++
                    }

                });
            }
        }

    }

    function lengthName() {
        return storedName.length
    }

    function getStoredName() {

        return storedName
    }
    function userCounter(name) {
        var num;
        storedName.forEach(element => {
            if (element.names === name) {
                num = element.counter;
            }
        })
        return num;
    }


    return {
        nameLanguage,
        emptyText,
        enterNumber,
        NameStoring,
        lengthName,
        getStoredName,
        userCounter

    }
}