const assert = require('assert');
const Greetings = require('../greetings-factory-function');

const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greet';

const pool = new Pool({
    connectionString,
    // ssl : useSSL
  });

  describe('The greetings database web app', function(){

    beforeEach(async function(){
        await pool.query("delete from users;");
    });
  
    it('should greet a person in French', async function(){
        let greetings = Greetings(pool);
        await greetings.nameLanguage('Andiswa', 'French')
        await greetings.nameLanguage('Thato', 'French')

        assert.equal("Bonjour, Andiswa", await greetings.nameLanguage("Andiswa", "French"));
        assert.equal("Bonjour, Thato", await greetings.nameLanguage("Thato", "French"));
    });

    it('should greet a person in isiXhosa', async function(){
        let greetings = Greetings(pool);
        await greetings.nameLanguage('Aviwe', 'IsiXhosa')
        await greetings.nameLanguage('Sihle', 'IsiXhosa')

        assert.equal("Molo, Andiswa", await greetings.nameLanguage("Andiswa", "IsiXhosa"));
        assert.equal("Molo, Thato", await greetings.nameLanguage("Thato", "IsiXhosa"));
    });

    it('should greet a person in Spanish', async function(){
        let greetings = Greetings(pool);
        await greetings.nameLanguage('Andiswa', 'Spanish')
        await greetings.nameLanguage('Thato', 'Spanish')

        assert.equal("Hola, Andiswa", await greetings.nameLanguage("Andiswa", "Spanish"));
        assert.equal("Hola, Thato", await greetings.nameLanguage("Thato", "Spanish"));
    });

    it('should greet the person with the first letter uppercase if the person is greeted with a first letter lowercase', async function(){
        let greetings = Greetings(pool);
        await greetings.nameLanguage('andiswa', 'French')
        await greetings.nameLanguage('thato', 'Spanish')

        assert.equal("Bonjour, Andiswa", await greetings.nameLanguage("andiswa", "French"));
        assert.equal("Hola, Thato", await greetings.nameLanguage("thato", "Spanish"));
    });

    it('should greet the person with the first letter uppercase if the person is greeted with uppercase letters', async function(){
        let greetings = Greetings(pool);
        await greetings.nameLanguage('AMANDA', 'IsiXhosa')
        await greetings.nameLanguage('LIKHO', 'Spanish')

        assert.equal("Molo, Amanda", await greetings.nameLanguage("AMANDA", "IsiXhosa"));
        assert.equal("Hola, Likho", await greetings.nameLanguage("LIKHO", "Spanish"));
    });

    it("should increase the counter to 2 if two names are greeted in two different languages",async function () {
        let greetings = Greetings(pool);

        await greetings.addNames("Thato")
        await greetings.addNames("Andiswa")
        let counter = await greetings.length()
        assert.equal(2, counter);

    });

    it("should increase the counter to 4 if 4 names are greeted in two different languages",async function () {
        let greetings = Greetings(pool);

        await greetings.addNames("Thato")
        await greetings.addNames("Andiswa")
        await greetings.addNames("Lele")
        await greetings.addNames("Anda")
        let counter = await greetings.length()
        assert.equal(4, counter);

    });
});
