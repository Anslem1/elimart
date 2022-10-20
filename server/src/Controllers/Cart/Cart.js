const Cart = require('../../Models/Cart')

exports.addItemsToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error })
    if (cart) {
      //if CART EXISTS UPDATE CART
      const product = req.body.cartItems.product
      const isProduct = cart.cartItems.find(cart => cart.product == product)

      if (isProduct) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            'cartItems.product': product
          },
          {
            $set: {
              'cartItems.$': {
                ...req.body.cartItems,
                quantity: isProduct.quantity + req.body.cartItems.quantity
              }
            }
          },
          { new: true }
        ).exec((error, cartItems) => {
          if (error) return res.status(400).json({ error })
          if (cartItems) return res.status(200).json({ cart: cartItems })
        })
      } else {
        Cart.findOneAndUpdate({
          user: req.user._id,
          $push: {
            cartItems: req.body.cartItems
          }
        }).exec((error, cartItems) => {
          if (error) return res.status(400).json({ error })
          if (cartItems) return res.status(200).json({ cart: cartItems })
        })
      }
    } else {
      //if cart does nt exists create a new cart
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems]
      })
      newCart.save((error, cart) => {
        if (error) return res.status(400).json({ error })
        if (cart) return res.status(200).json({ cart })
      })
    }
  })
}
