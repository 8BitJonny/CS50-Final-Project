import sqlite3
conn = sqlite3.connect("company.db")
from random import randint,randrange
from datetime import date

c = conn.cursor()
lastNames = ["Hansen","Petersen","Hoeg","Thomsen","Schmidt","Christiansen","Smith","Johnsen","Williams","Brown","Jones","Miller","Horn","James","Petersen","Rich","Valentine","Boyd","Estes","Morris","Bryant","Marquez","Simon","Kaufman","Lindsey","Ali","Cisneros","Hayden","Pope","Schmitt","Stewart","Pruitt"]
maleNames = ["James","John","Robert","Micheal","William","David","Richard","Dennis","Walter","Patrick","Peter","Joe","Jack","Terry","Daniel","Jason","Jeffrey","Ryan","Gary","Jacob","Nicholas","Eric","Stephen","Jonathan","Larry","Justin","Scott","Frank","Brandon","Raymond","Gregory","Benjamin","Samuel","Patrick","Alexander"]
femaleNames = ["Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Karen","Judy","Irene","Jane","Lori","Judy","Ruby","Lois","Tina","Emma","Olivia","Ava","Isabella","Sophia","Mia","Amelia","Charlotte","Abigail","Emily","Arlene","Maureen","Collen","Allison","Tamara","Joy","Georgia","Constance","Lillie","Claudia"]
names = [maleNames,femaleNames]
departments = ["IT","Sales","HR","Marketing","Research"]
genders = ["M","W"]
employees = []

for i in range(30):
    lastName = lastNames[randint(0,31)]
    gender = randint(0,1)
    firstName = names[gender][randint(0,34)]
    sex = genders[gender]
    age = randint(18,62)
    birthdate = date((2018 - age), randint(1,12), randint(1,28)).isoformat()
    work_load = randrange(15,40,5)
    work_group = departments[randint(0,4)]
    employee = (i,firstName,lastName,birthdate,age,sex,work_load,work_group)
    print(employee)
    employees.append(employee)

#Create Table
c.execute('''DROP TABLE employees''')

c.execute('''CREATE TABLE employees
             (id integer primary key autoincrement, firstname text, lastname text, birthdate text, age integer, sex text, workload_per_week real, work_group text)''')

# Insert a row of data
c.executemany('INSERT INTO employees VALUES (?,?,?,?,?,?,?,?)', employees)

# Save (commit) the changes
conn.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
conn.close()