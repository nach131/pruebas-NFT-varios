import { ethers, Contract } from 'ethers';
import NFT from '../contracts/BoredApeFake.json'
import DONATE from '../contracts/DonateContract.json'



const getBlockchain = () =>
  new Promise((resolve, reject) => {

    window.addEventListener('load', async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const wallet = accounts[0]
        console.log("wallet:", wallet)
        //===========================================================================================
        const balance = await provider.getBalance(wallet)
        const balanceEth = ethers.utils.formatEther(balance)
        console.log("balance Eth:", balanceEth)


        //===========================================================================================
        const nft = new Contract(
          NFT.networks[window.ethereum.networkVersion].address,
          NFT.abi,
          signer
        );
        const donate = new Contract(
          DONATE.networks[window.ethereum.networkVersion].address,
          DONATE.abi,
          signer
        )
        resolve({ nft, donate, wallet, balanceEth });
      }
      resolve({
        nft: undefined,
        donate: undefined,
        wallet: undefined,
        balanceEth: undefined
      });
    });
  });

export default getBlockchain;
