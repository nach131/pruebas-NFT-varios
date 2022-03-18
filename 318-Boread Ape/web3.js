const URL =
  // "wss://eth-mainnet.alchemyapi.io/v2/XXXXXXXX";
  'HTTP://127.0.0.1:7545'
const web3Eth = new Web3Eth(Web3Eth.givenProvider || URL);
// const smartContractAddress = "0x06012c8cf97bead5deae237070f9587f8e7a266d";
const smartContractAddress = '0x55f8C500D562DD2cD60E7A6a615A2CAfe81314cf';
// const contract = new web3Eth.Contract(abi_, smartContractAddress);
const contract = new web3Eth.Contract(smartContractAddress);

async function fetchTokens () {
  return contract.getPastEvents(
    "Transfer",
    {
      fromBlock: 0,
      toBlock: "latest",
    },
    function (error, events) {
      if (!error) {
        for (var i = 0; i < events.length; i++) {
          console.log(events[i].returnValues.tokenId);
        }
      }
    }
  );
}
fetchTokens();


//===========================================================================================

const myContract = new web3.eth.Contract(abiJson, contractAddress);
myContract.getPastEvents('Transfer', {
  filter: {
    _from: '0x0000000000000000000000000000000000000000'
  },
  fromBlock: 0
}).then((events) => {
  for (let event of events) {
    console.log(event.returnValues._tokenId);
  }
});

//===========================================================================================
const ethers = require('ethers');
const abi = [{ ...}]
const contractAddress = '0x000...'

const webSocketProvider = new ethers.providers.WebSocketProvider(process.env.ETHEREUM_NODE_URL, process.env.NETWORK_NAME);
const contract = new ethers.Contract(contractAddress, abi, webSocketProvider);

contract.on("Transfer", (from, to, value, event) => {
  console.log({
    from: from,
    to: to,
    value: value.toNumber(),
    data: event
  });
});