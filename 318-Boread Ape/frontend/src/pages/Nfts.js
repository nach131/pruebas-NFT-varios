import React, { useState, useEffect } from 'react';

// import Web3Eth from 'web3-eth'
// import getBlockchain from './utils/ethereum.js';
import GetNft from '../utils/GetNft';



function AppDos () {
  const [account, setAccount] = useState(undefined);
  const [nft, setNft] = useState(undefined)
  const [balanceWallet, setBalanceWallet] = useState(undefined)
  const [tokensIdB, setTokenIdB] = useState([])




  useEffect(() => {
    const init = async () => {
      const { nft, wallet, balanceEth, tokensIdBlockchain } = await GetNft();
      setNft(nft)
      setAccount(wallet)
      setBalanceWallet(balanceEth)
      setTokenIdB(tokensIdBlockchain)
    };
    init();
  }, []);
  console.log("Contrato:", nft)



  const balanceNft = async () => {
    if (account) {
      let wallet = account.toString()
      const balanceOf = await nft.balanceOf(wallet)
      const balanceNum = balanceOf.toNumber()
      console.log("Balance nft:", balanceNum)
    }
  }

  balanceNft()

  const urlToken = async () => {
    if (account) {
      const url = await nft.tokenURI(2)
      console.log(url)
    }
  }
  // urlToken()

  return (
    <>
      {!nft ?
        <>
          <h1>nada</h1>
        </>
        :
        <>
          <h3>318-Bored Ape</h3>
          <p>Contrato Address: {nft.address}</p>
          <p>Wallet: {account}</p>
          <p>Balance: {balanceWallet} ETH</p>
        </>
      }
    </>
  )
}

export default AppDos