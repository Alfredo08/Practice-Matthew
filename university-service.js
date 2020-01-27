
let Students = {
    getAll : function( db ){
        return db
                .select( '*' )
                .from( 'students' );
    },
    create : function ( db, newStudent ){
        return db   
                .insert( newStudent )
                .into( 'students' )
                .returning( '*' )
                .then( rows => {
                    return rows[0];
                });
    }
};

module.exports = {Students};