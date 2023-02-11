const db = require("./db_connection");
/**** Delete existing table, if any ****/

const drop_stuff_table_sql = "DROP TABLE IF EXISTS `textbooks_list`;"

db.execute(drop_stuff_table_sql);

/**** Create "stuff" table (again)  ****/

const create_stuff_table_sql = `
    CREATE TABLE textbooks_list (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL,
        user_info VARCHAR(100) NOT NULL,
        extra_info VARCHAR(150) NULL,
        PRIMARY KEY (id)
    );
`
db.execute(create_stuff_table_sql);


/**** Create some sample items ****/

const insert_stuff_table_sql = `
    INSERT INTO textbooks_list 
        (title, subject, author, user_info, extra_info) 
    VALUES 
        (?, ?, ?, ?, ?);
`
db.execute(insert_stuff_table_sql, ['Psychology (13th Edition)', 'Psychology', 'David G. Myers, C. Nathan DeWall', 'brainiac@yahoo.com', '2 years old, Torn Cover']);

db.execute(insert_stuff_table_sql, ['Biology: The Core', 'Biology', 'Eric Simon', 'biologyreads@hotmail.com', 'Good']);

db.execute(insert_stuff_table_sql, ['History of the American Frontier 1763-1893', 'History', 'Frederic L. Paxson', 'buybooks@gmail.com', 'Slightly Worn, Paperback']);


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