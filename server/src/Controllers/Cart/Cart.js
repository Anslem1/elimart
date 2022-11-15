const Cart = require('../../Models/Cart')

function updateItemsAddedToCart (condition, updatedData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, updatedData, { upsert: true })
      .then(result => resolve())
      .catch(error => reject(error))
  })
}

exports.addItemsToCart = (req, res) => {
  //if CART EXISTS UPDATE CART

  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error)
      res.status(400).json({ error, message: 'Error from add item to cart' })
    if (cart) {
      let promiseArray = []
      req.body.cartItems.forEach(cartItem => {
        const product = cartItem.product
        const item = cart.cartItems.find(c => c.product === product)
        let condition, update
        if (item) {
          condition = {
            user: req.user._id,
            'cartItems.product': (update = {
              $set: {
                'cartItems.$': cartItem
              }
            })
          }
        } else {
          condition = { user: req.user._id }
          update = {
            $push: {
              cartItems: cartItem
            }
          }
        }

        promiseArray.push(updateItemsAddedToCart(condition, update))
      })
      Promise.all(promiseArray)
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }))
    } else {
      //IF CART DOES NOT EXIST, CREATE A NEW CART
      const newCart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems
      })
      newCart.save((error, cart) => {
        if (error) res.status(400).json({ error })
        if (cart) res.status(200).json({ cart })
      })
    }
  })
}

exports.getCartItems = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .populate('cartItems.product', '_id name price productPictures')
    .exec((error, cart) => {
      if (error) res.status(400).json({ error })
      if (cart) {
        let cartItems = {}
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            cartImage: item.product.productPictures[0].images,
            price: item.product.price,
            quantity: item.quantity
          }
        })

        res.status(200).json({ cartItems })
      }
    })
}

// exports.addItemsToCart = (req, res) => {
//   Cart.findOne({ user: req.user._id }).exec((error, cart) => {
//     if (error) res.status(400).json({ error })
//     if (cart) {
//       //if CART EXISTS UPDATE CART

//       const product = req.body.cartItems.product
//       const isProduct = cart.cartItems.find(cart => cart.product == product)

//       if (isProduct) {
//         Cart.findOneAndUpdate(
//           {
//             user: req.user._id,
//             'cartItems.product': product
//           },
//           {
//             $set: {
//               'cartItems.$': {
//                 ...req.body.cartItems,
//                 quantity: isProduct.quantity + req.body.cartItems.quantity
//               }
//             }
//           },
//           { new: true }
//         ).exec((error, cartItems) => {
//           if (error) res.status(400).json({ error })
//           if (cartItems) res.status(200).json({ cart: cartItems })
//         })
//       } else {
//         Cart.findOneAndUpdate({
//           user: req.user._id,
//           $push: {
//             cartItems: req.body.cartItems
//           }
//         }).exec((error, cartItems) => {
//           if (error) res.status(400).json({ error })
//           if (cartItems) res.status(200).json({ cart: cartItems })
//         })
//       }
//     } else {
//       //if cart does nt exists create a new cart
//       const newCart = new Cart({
//         user: req.user._id,
//         cartItems: [req.body.cartItems]
//       })
//       newCart.save((error, cart) => {
//         if (error) res.status(400).json({ error })
//         if (cart) res.status(200).json({ cart })
//       })
//     }
//   })
// }
