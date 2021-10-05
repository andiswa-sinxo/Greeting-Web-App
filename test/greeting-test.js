const assert = require('assert');
const Greetings = require('./greetings-factory-function');

const pg = require('pg');
const { isTypedArray } = require('util/types');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greet';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

  describe('The greetings database web app', function(){

    beforeEach(async function(){
        await pool.query("delete from users;");
    });
  
    it('it should greet a person in french', async function(){
        let greetings = Greetings(pool);
        await greetings.nameLanguage(Andiswa, 'French')

        assert.equal('Bonjour, Andiswa')
    });
});
