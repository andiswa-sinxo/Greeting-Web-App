module.exports = function greetRoutes(greetingsApp) {

    async function home (req, res) {
        try {
            var count = await greetingsApp.length()
        res.render('index', { count })
        } catch (error) {
            console.log(error)
        }
        
    }
     
    async function hello (req, res, next) {
        try {
            var count = await greetingsApp.length()
            var language = req.body.language
            var name = req.body.username
            if (name && language) {
                if ((/^([A-Za-z])+$/g).test(name) === false) {
                    req.flash('error', 'Please enter a valid name')
                    
                }
                 else  {
                    var mesg = await greetingsApp.nameLanguage(name, language)
                    await greetingsApp.addNames(name)
                    var count = await greetingsApp.length()
                    console.log(greetingsApp.length())
                    // console.log('llllll'+ await JSON.stringify(greetingsApp.getStoredName()))
                    await greetingsApp.getStoredName();
                }
            }
        
             if (!name && language) {
                req.flash('error', 'Please enter a name')
            }
        
            else if (!name && !language) {
                req.flash('error', "Please enter name and select a language")
            }
            else if (name && !language){
                req.flash('error', 'Please select a language')
            }
            res.render('index', { mesg, count })
            
        } catch (error) {
            next(error)
            
        }
        
        }

        async function person(req, res) {
            try {
                
              var name = await greetingsApp.getStoredName()
              console.log(name);
              res.render('greetings', { name })
            } catch (error) {
                console.log(error)
            }
              
          }

          async function refresh(req, res) {
            try {
                await greetingsApp.resetButton()
            req.flash('info', 'The Greeting App has successfully reset!')
            res.redirect('/')
            } catch (error) {
                console.log(error)
            }
            
        }

          async function many (req, res) {
            try {
                const name = req.params.username;
            var num = await greetingsApp.userCounter(name)
            console.log(num.counter + " num");
            res.render("counter", {
                name, num
            })
            } catch (error) {
                console.log(error)
            }
        
        }
    
    return{
        home,
        hello, 
        person,
        refresh, 
        many
    }

}