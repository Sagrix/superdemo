import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
import store from '../../store'

const contract = require('truffle-contract')

export function createEventForm(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      const simpleAHD = contract(SimpleAHDContract)
      simpleAHD.setProvider(web3.currentProvider)

      var simpleAHDInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        simpleAHD.deployed().then(function(instance) {
          simpleAHDInstance = instance

          console.log('hello');
          console.log(instance);
          // simpleAHDInstance.
          // // Attempt to sign up user.
          // simpleAHDInstance.signup(name, {from: coinbase})
          // .then(function(result) {
          //   // If no error, login user.
          //   return dispatch(loginUser())
          // })
          // .catch(function(result) {
          //   // If error...
          // })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
