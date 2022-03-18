import { ethers } from 'ethers';
import ContractBoredApe from '../contracts/BoredApeFake.json'
const AbiFile = require('./AbiFile.json')

const getNftMeta = () =>
  new Promise((resolve, reject) => {

    window.addEventListener('load', async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        //CONECTAMOS WALLET de Metamask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const wallet = accounts[0]
        // console.log("wallet conectada:", wallet)

        //==========TODOS LOS NFTS DE LA WALLET CONECTADA======================================================
        const daiContract = new ethers.Contract(ContractBoredApe.networks[window.ethereum.networkVersion].address, AbiFile, provider);
        const filterTo = daiContract.filters.Transfer(null, wallet);
        // console.log("filterTo:", filterTo)
        const todo = await daiContract.queryFilter(filterTo)
        // console.log("todo", todo)
        // const tokenId = todo[2].args.tokenId
        // console.log("tokenId:", tokenId.toNumber())

        const devolverTodasPromesas = item => {
          // console.log("item:", item)
          return Promise.resolve(item)
        }

        const getUrlToken = async item => {

          let tokenId = item.args.tokenId
          const tokenIdNum = tokenId.toNumber()

          const uriToken = await daiContract.tokenURI(tokenIdNum)
          const soloIdOriginal = uriToken.replace('ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/', '')
          console.log("Id Originales:", soloIdOriginal)

          console.log(soloIdOriginal)

          try {
            let esto = await fetch(`https://tokemo.tk/api/bored/token/${soloIdOriginal}`)
            let json = await esto.json()
            // console.log("Datos Mongo:", json)
            const toma = {
              ...json,
              BlockIdNach: tokenIdNum
            }
            return devolverTodasPromesas(toma)

          } catch (e) {
            console.log(e)
          }
        }

        const getData = async () => Promise.all(todo.map(item => getUrlToken(item)))
        const data = await getData()

        resolve({ wallet, data });
      }

      resolve({ wallet: undefined, data: undefined });
    });
  })


export default getNftMeta