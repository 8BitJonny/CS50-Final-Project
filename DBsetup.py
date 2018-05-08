import sqlite3
conn = sqlite3.connect("company.db")

c = conn.cursor()

#Create Table
c.execute('''DROP TABLE employees''')

c.execute('''CREATE TABLE employees
             (id integer primary key autoincrement, firstname text, lastname text, birthdate text, age integer, sex text, workload_per_week real, work_group text)''')

# Insert a row of data
c.execute("INSERT INTO employees VALUES (0,'Hans','Petersen','1987-01-05','31','M',40,'IT')")
c.execute("INSERT INTO employees VALUES (4,'Peter','Hansen','1966-06-11','52','M',20,'Sales')")
c.execute("INSERT INTO employees VALUES (3,'Julia','Johannsen','1982-11-03','36','W',40,'Marketing')")
c.execute("INSERT INTO employees VALUES (1,'Hannah','Thomsen','1996-04-09','21','W',20,'Sales')")
c.execute("INSERT INTO employees VALUES (2,'Christoph','Tran','1993-02-02','25','M',15,'IT')")

# Save (commit) the changes
conn.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
conn.close()