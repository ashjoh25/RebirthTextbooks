//set up the server
const express = require( "express" );
const app = express();
const port = 9145;
const logger = require("morgan");
const db = require("./db/db_connection");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


app.use(logger("dev")); // ??
// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public')); // ??

app.use( express.urlencoded({ extended: false }) );


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

// define middleware that logs all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
} );

// define a route for the default home page
app.get( "/", ( req, res ) => {
    // res.sendFile( __dirname + "/views/index.html" );
    res.render("index");
} );

const read_stuff_all_sql = `
SELECT
    id, title, subject
FROM
    textbooks_list
`

// define a route for the stuff inventory page
app.get( "/full_list", ( req, res ) => {
    db.execute(read_stuff_all_sql, (error,results) => {
        if (error) {
            res.status(500).send(error); //Internal Server Error
        }
        else {
            res.render('list', {inventory: results});
        }
    })
    // res.sendFile( __dirname + "/views/list.html" );
} );

const read_item_sql = `
SELECT
    id, title, subject, author, extra_info
FROM
    stuff
WHERE
    id = ?
`

// define a route for the item detail page
app.get( "/full_list/specific_list/:id", ( req, res ) => {
    db.execute(read_item_sql, [req.params.id], (error, results) => {
        if (error) {
            res.status(500).send(error); //Internal Server Error
        }
        else if (results.length == 0) {
            res.status(404).send(`No item found wiht id  = '${req.params.id}'`);
        } 
        else {
            // res.send(results[0]);
            let data = results[0];
            res.render('specific_item', data);
        }
    })
    // res.sendFile( __dirname + "/views/stuff.html" );
} );




// define a route for item DELETE
const delete_item_sql = `
    DELETE 
    FROM
        textbooks_list
    WHERE
        id = ?
`
app.get("/full_list/specific_item/:id/delete", ( req, res ) => {
    db.execute(delete_item_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/full_list");
        }
    });
})

// define a route for item UPDATE
const update_item_sql = `
    UPDATE
        textbooks_list
    SET
        title = ?,
        subject = ?,
        author = ?,
        extra_info = ?
    WHERE
        id = ?
`
app.post("/full_list/specific_item/:id", ( req, res ) => {
    console.log(req.body);
    db.execute(update_item_sql, [req.body.homework_name, req.body.assignment_date, req.body.class_name, req.body.class_description, req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/full_list/specific_item/${req.params.id}`);
        }
    });
})

// define a route for item CREATE
const create_item_sql = `
    INSERT INTO textbooks_list
        (title, subject, author, extra_info)
    VALUES
        (?, ?, ?, ?)
`
app.post("/full_list", ( req, res ) => {
    db.execute(create_item_sql, [req.body.homework_name, req.body.assignment_date, req.body.class_name, req.body.class_description], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (id) of the newly inserted element.
            res.redirect(`/full_list/specific/${results.insertId}`);
        }
    });
})

// const insert_stuff_table_sql = `
//     INSERT INTO stuff
//         (item, due_date)
//     VALUES
//         (?, ?)
// `