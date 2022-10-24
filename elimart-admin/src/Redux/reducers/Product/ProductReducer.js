const initialState = {
  token: null,
  user: {
    name: '',
    price: '',
    quantity: '',
    description: '',
    productPictures: []
  },
  authenticated: false,
  authenticating: false,
  signingOut: false,
  signedOut: false,
  error: null,
  message: ''
}


export default (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case value:
            
            break;
    
        default:
            break;
    }


}