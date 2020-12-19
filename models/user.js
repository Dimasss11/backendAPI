const connection = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class User {
  
  constructor(name, phone, email, password) {
    this.name=name;
    this.phone=phone;
    this.email=email;
    this.password=password;
  }

  async save() {
    this.password=await crypt(this.password);
    return connection.query(
      'INSERT INTO users(phone, name, email, password) VALUES (?,?,?,?)',
      [this.phone, this.name, this.email, this.password]
    );
  }

  static async getUserByEmail(email){
    email=email ? email : '';
    return connection.query('SELECT * FROM users WHERE email=?', email);
  }

  static getUserById(id){
    return connection.query('SELECT * FROM users WHERE id_user=?', id);
  }

  static async getUserValid(email, pswrd){
    if(typeof email ==='undefined' || typeof pswrd ==='undefined') return false;
    let [rows, fields]=await connection.query('SELECT * FROM users WHERE email=?', email);
    if(rows.length<1) return false;
    let result=await validPassword(pswrd, rows[0].password);
    if(result){
      return rows[0];
    }else{
      return false;
    }
  }

};

  function crypt(myPlaintextPassword) {
    return new Promise (function(succeed, fail){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
          if(err) console.log(err);
          if (hash) succeed(hash);	
        });
      });
    })	 
}

function validPassword(pass, hash) {
  return new Promise (function(succeed, fail){
    bcrypt.compare(pass, hash, function(err, result) {
      if(err) console.log(err);
      succeed(result);
    });
  })	 
}
