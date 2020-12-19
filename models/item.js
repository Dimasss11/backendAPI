const connection = require('../util/database');

module.exports = class Item {
  
  constructor(title, price, image, idUser) {
    this.title=title;
    this.price=price;
    this.image=image;
    this.idUser=idUser;
  }

  save() {
    return connection.query(
      'INSERT INTO products(user_id, title, image_link, price) VALUES (?,?,?,?)',
      [ this.idUser, this.title, this.image, this.price]
    );
  }

  static getLastItemByIdUser(id){
    return connection.query(
      'SELECT *, UNIX_TIMESTAMP(created_at) AS timestamp FROM products '+
      'LEFT JOIN users ON users.id_user = products.user_id '+
      'WHERE products.user_id=? ORDER BY id_product DESC LIMIT 1', id
    );
  }

  static getListItems(){
    return connection.query('SELECT * FROM products LEFT JOIN users ON users.id_user = products.user_id');
  }
  
  static getItemById(idItem){
    return connection.query(
      'SELECT * FROM products LEFT JOIN users ON '+
      'users.id_user = products.user_id where  products.id_product=?', idItem
      );
  }

   updateItemById(idItem){
     let arr=[];
     let strquery='';
     if(this.title){
      strquery+=` title = ?,`;
      arr.push(this.title);
     }
     if(this.price){
      strquery+=` price = ?,`;
      arr.push(this.price);
     }
     if(this.image){
      strquery+=` image_link = ?,`;
      arr.push(this.image);
     }
     strquery= strquery.slice(0, -1);
    if(arr.length<1) return;
    return connection.query(
      `UPDATE products
      SET ${strquery}
      WHERE id_product = ?`, [...arr, idItem]
    );
  }

  static deleteItemById(idItem){
    return connection.query('DELETE FROM products WHERE id_product=?', idItem);
  }

  static saveImgUrl(url, idItem){
    return connection.query('UPDATE products SET image_link=? WHERE id_product=?', [url, idItem]);
  }
  
};
