const db = require("./db_connection");
/**** Delete existing table, if any ****/

const drop_stuff_table_sql = "DROP TABLE IF EXISTS `stuff`;"

db.execute(drop_stuff_table_sql);

/**** Create "stuff" table (again)  ****/

const create_stuff_table_sql = `
    CREATE TABLE stuff (
        id INT NOT NULL AUTO_INCREMENT,
        item VARCHAR(45) NOT NULL,
        due_date VARCHAR(45) NOT NULL,
        classes VARCHAR(45) NOT NULL,
        description VARCHAR(150) NULL,
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

db.execute(insert_stuff_table_sql, ['Infix Calculator', '1/6/23', 'AP CompSci', 'yayay']);


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