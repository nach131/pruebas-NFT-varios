const donateContract = artifacts.require('donateContract');

module.exports = function (deployer) {
  deployer.deploy(donateContract);
};
