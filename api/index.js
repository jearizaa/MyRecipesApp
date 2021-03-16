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
const { conn, Diet, Dish } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
  console.log('%s listening at 3001'); // eslint-disable-line no-console
  })

  let diets = ['gluten free', 'ketogenic', 'vegetarian', 
            'lacto vegetarian', 'ovo vegetarian', 'vegan',
            'pescatarian', 'paleolithic', 'primal', 'whole 30',]
  //console.log(diets[0])
  diets = diets.map(diet => {
    return Diet.create({
    name: diet,
    })
  })
  //console.log(diets[0])
  let dishes = ['main course', 'bread', 'marinade',
              'side dish', 'brakfast', 'fingerfood', 
              'dessert', 'soup', 'snack', 'appetizer',
              'beverage', 'drink', 'salad', 'sauce',]

  dishes = dishes.map(dish => {
    return Dish.create({
    name: dish,
    })
  })

  Promise.all([...diets, ...dishes])
    .then(res => {
      console.log("Cargados Dietas y Tipos de platos");
    }).catch(err => {
      console.log("Dietas y Tipos de platos ya precargados")
    })

})


