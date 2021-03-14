//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet, Dish} = require('./src/db.js');

// Syncing all the models at once.
conn.sync().then(() => {
  server.listen(3001, () => {
  console.log('%s listening at 3001'); // eslint-disable-line no-console
  })

  let diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 
            'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
            'Pescetarian', 'Paleo', 'Primal', 'Whole30',]

  diets.map(diet => {
    return Diet.create({
    name: diet,
    })//Promise <Model>??
    .catch(err => {}) //Handles unique constraint error
  })

  let dishes = ['Main Course', 'Bread', 'Marinade',
              'Side Dish', 'Brakfast', 'Fingerfood', 
              'Dessert', 'Soup', 'Snack', 'Appetizer',
              'Beverage', 'Drink', 'Salad', 'Sauce',]

  dishes.map(dish => {
    return Dish.create({
    name: dish,
    })
    .catch(err => {})
  })

  Promise.all([...diets, ...dishes])
    .then(res => {
      console.log("Cargados Dietas y Tipos de platos");
    })

})


