import { ethers, Contract } from 'ethers';
import ContractBoredApe from '../contracts/BoredApeFake.json'
const AbiFile = require('./AbiFile.json')

const getNft = () =>
  new Promise((resolve, reject) => {

    window.addEventListener('load', async () => {
      if (window.ethereum) {
        // await window.ethereum.enable();
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //CONECTAMOS WALLET de Metamask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const wallet = accounts[0]
        console.log("wallet conectada:", wallet)
        // const web3Provider = window.ethereum
        //===========================================================================================
        const balance = await provider.getBalance(wallet)
        const balanceEth = ethers.utils.formatEther(balance)
        console.log("balance Eth:", balanceEth)

        //==========TODOS LOS NFTS DE LA WALLET CONECTADA======================================================
        const daiContract = new ethers.Contract(ContractBoredApe.networks[window.ethereum.networkVersion].address, AbiFile, provider);
        const filterTo = daiContract.filters.Transfer(null, wallet);
        // console.log("filterTo:", filterTo)
        const todo = await daiContract.queryFilter(filterTo)
        // console.log("todo", todo)
        // const tokenId = todo[2].args.tokenId
        // console.log("tokenId:", tokenId.toNumber())

        //==================Blockchain ID de los tokens ========================================================
        // const tokensIdBlockchain = await Promise.all(todo.map(e => {
        //   // console.log(e)
        //   let tokenId = e.args.tokenId
        //   const tokenIdNum = tokenId.toNumber()
        //   console.log(tokenIdNum)

        //   return tokenIdNum
        // }))
        // console.log("tokensIdBlockchain", tokensIdBlockchain)
        //===========================================================================================

        //===========================================================================================

        //===========================================================================================


        //===========================================================================================
        const nft = new Contract(
          ContractBoredApe.networks[window.ethereum.networkVersion].address,
          ContractBoredApe.abi,
          signer
        );



        resolve({ nft, wallet, balanceEth });
        // resolve({ nft, wallet, balanceEth, tokensIdBlockchain });
        // resolve({ nft, donate, account });
      }
      resolve({ nft: undefined });
    });
  })


export default getNft