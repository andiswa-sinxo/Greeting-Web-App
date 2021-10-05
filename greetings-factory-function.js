module.exports = function Greetings(pool) {
    
    const alpha = /^([A-Za-z])+$/g;;

    var storedName = [];

    async function nameLanguage(names, language) {
        try {var string = names.toLowerCase();
            var name = string.charAt(0).toUpperCase() + string.slice(1);
    
            // NameStoring(name)
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
            
        } catch (error) {
            console.log(error)
            
        }
    }
    async function addNames(name){
        try {var string = name.toLowerCase();
            var name = string.charAt(0).toUpperCase() + string.slice(1);
            var checkName = await pool.query('SELECT names FROM users WHERE names = $1', [name]);
            if(checkName.rowCount === 0){
             await pool.query("insert into users(names, counter) values($1, $2)",[name, 1])
            }
            else{
                await pool.query('UPDATE users set counter = counter + 1 WHERE names = $1', [name])
            }
             
        } catch (error) {
            console.log(error)
            
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

    async function resetButton(){
        await pool.query('delete from users');

    }

    // function NameStoring(names) {

    //     var string = names.toLowerCase();
    //     var name = string.charAt(0).toUpperCase() + string.slice(1);
    //     if (storedName.length === 0) {
    //         storedName.push({
    //             names: name,
    //             counter: 1
    //         });
    //     }
    //     else {
    //         if (!storedName.some(storedName => storedName.names === name)) {
    //             storedName.push({
    //                 names: name,
    //                 counter: 1
    //             })

    //         } else {
    //             storedName.forEach(element => {
    //                 if (element.names === name) {
    //                     element.counter++
    //                 }

    //             });
    //         }
    //     }

    // }

    // async function lengthName() {
    //     try { 
    //         return storedName.length
            
    //     } catch (error) {
    //         console.log(error)
            
    //     }
       
    // }
    async function length(){
        let storage = await pool.query('select distinct names from users');
        return storage.rowCount

    }
     

    async function getStoredName() {
        try { 
            var allNames =await pool.query('select names from users')
            console.log(allNames);
            return allNames.rows;
            
        } catch (error) {
            console.log(error)
            
        }
       
    }

    async function userCounter(name) {
        try {
            var userCount = await pool.query ('select counter from users where names = $1', [name]);
            console.log(userCount.rows[0]);
            return userCount.rows;
          
            // return num;
            
        } catch (error) {
            console.log(error)
            
        }
        
    }


    return {
        nameLanguage,
        emptyText,
        enterNumber,
        // NameStoring,
        // lengthName,
        getStoredName,
        userCounter,
        addNames,
        length,
        resetButton

    }
}