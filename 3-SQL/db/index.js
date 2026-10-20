const Database = require('better-sqlite3')

const db = new Database('./merch_shop.sqlite')

//const getAllCustomer = db.prepare('SELECT * FROM customer LIMIT 2')
//const customer = getAllCustomer.all()

let limit = 5
let firstName = 'Takuma'

const customer = db.prepare('SELECT * FROM customer WHERE first_name=? LIMIT ?').all(firstName, limit)



console.log(customer)
db.close();