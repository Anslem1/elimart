const UserAddress = require('../../Models/Address')

exports.addAddress = (req, res) => {
  const { payload } = req.body

  console.log(payload)
  if (payload.address) {
    console.log(payload)
    // return res.status(200).json({ body: req.body })
    UserAddress.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          address: payload.address
        }
      },
      { new: true, upsert: true }
    ).exec((error, address) => {
      if (error) res.status(400).json({ error })
      if (address) {
        res.status(200).json({ address })
      }
    })
  } else {
    return res.status(400).json({ error: 'Adress parameter required' })
  }
}

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error })
    if (userAddress) res.status(200).json({ userAddress })
  })
}
