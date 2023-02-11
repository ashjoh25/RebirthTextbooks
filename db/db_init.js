const db = require("./db_connection");
/**** Delete existing table, if any ****/

const drop_stuff_table_sql = "DROP TABLE IF EXISTS `textbooks_list`;"

db.execute(drop_stuff_table_sql);

/**** Create "stuff" table (again)  ****/

const create_stuff_table_sql = `
    CREATE TABLE stuff (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(45) NOT NULL,
        subject VARCHAR(45) NOT NULL,
        author VARCHAR(45) NOT NULL,
        extra_info VARCHAR(150) NULL,
        PRIMARY KEY (id)
    );
`
db.execute(create_stuff_table_sql);


/**** Create some sample items ****/

const insert_stuff_table_sql = `
    INSERT INTO stuff 
        (title, subject, author, extra_info) 
    VALUES 
        (?, ?, ?, ?);
`
db.execute(insert_stuff_table_sql, ['World History 1', 'History', 'J. Kwon', 'Broken']);

db.execute(insert_stuff_table_sql, ['Intro to Biology', 'Biology', 'R. Bajwa', 'good']);


const read_stuff_table_sql = "SELECT * FROM textbooks_list";

db.execute(read_stuff_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'textbooks_list' initialized with:")
        console.log(results);
    }
);

db.end();