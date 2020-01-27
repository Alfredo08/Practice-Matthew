let express = require( 'express' );
let morgan = require( 'morgan' );
let bodyParser = require( 'body-parser' );
let knex = require( 'knex' );
let jsonParser = bodyParser.json();
let {Students} = require( './university-service' );

let database = knex({
    client : 'pg',
    connection : 'postgresql://universityuser:pass@localhost/university'
});

let app = express();

app.use( morgan( 'dev' ) );

app.get( '/api/getAllStudents', ( req, res ) => {

    Students.getAll( database )
        .then( students => {
            return res.status( 200 ).json(students);
        })
        .catch( err => {
            res.sendStatus = "Something went wrong with the Database connection";
            return res.status( 400 ).send();
        });
});

app.post( '/api/createNewStudent', jsonParser, ( req, res ) => {
    
    let {id, firstname, lastname} = req.body;

    let newStudent = {
        id : Number(id),
        firstname : firstname,
        lastname : lastname
    }

    Students.create( database, newStudent )
        .then( student => {
            return res.status( 201 ).json( student );
        })
        .catch( err => {
            res.sendStatus = "Something went wrong with the Database connection";
            return res.status( 400 ).send();
        });
});

app.listen( 8080, () => {
    console.log( 'App running in port 8080.' );
    console.log( 'Knex instance : ', database );
});