import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import SimpleAHDContract from '../../../../build/contracts/SimpleAHD.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.

      const simpleAHD = contract(SimpleAHDContract)
      simpleAHD.setProvider(web3.currentProvider)
      let simpleAHDInstance

      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to sign up user.
          authenticationInstance.signup(name, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            // console.log(JSON.stringify(result) + " has now signed up")

          })
          .catch(function(result) {
            // If error...
            console.log(result)
          })
        })

      })

      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
  

        simpleAHD.deployed().then(function(instance) {
          simpleAHDInstance = instance

          simpleAHDInstance.register(name, {from: coinbase})
          .then((result) => {
            console.log(result)
            console.log("user has also been registered within SimpleAHD")

            return dispatch(loginUser())

          })
        })

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
