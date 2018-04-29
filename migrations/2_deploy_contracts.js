var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Destructible = artifacts.require("./zeppelin/lifecycle/Destructible.sol");
var Authentication = artifacts.require("./Authentication.sol");
var SimpleAHD = artifacts.require('./SimpleAHD.sol');

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Destructible);
  deployer.deploy(Destructible);
  deployer.link(Destructible, Authentication);
  deployer.deploy(Authentication);
  deployer.deploy(SimpleAHD);
};
