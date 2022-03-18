import React, { useState, useEffect } from 'react';
import getBlockchain from '../utils/ethereum.js';
import { Button } from 'react-bootstrap';


function MintDonate () {
  const [wallet, setWallet] = useState(undefined);
  const [nft, setNft] = useState(undefined)
  const [donate, setDonate] = useState(undefined)
  const [balanceWallet, setBalanceWallet] = useState(undefined)
  const [balanceNft, setBalanceNft] = useState(undefined)


  console.log("nft:", nft)
  console.log("donate:", donate)



  useEffect(() => {
    const init = async () => {
      const { nft, donate, wallet, balanceEth } = await getBlockchain();
      setNft(nft)
      setWallet(wallet)
      setBalanceWallet(balanceEth)
      setDonate(donate)
    };
    init();
  }, []);


  if (typeof wallet === 'undefined') {
    return 'Loading...';
  }


  const minteo = async () => {
    const url = 'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2332'
    const result = await nft.claimItem(url, {
      from: wallet
    })
    console.log(result);
  }

  const balance = async () => {
    const balanceOf = await nft.balanceOf(wallet)
    const balanceNum = balanceOf.toNumber()
    console.log("Balance", balanceNum)
  }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12'>
          <p className="pt-3">Mint Donate</p>
          {/* <h5>{name}</h5> */}
          <p>wallet: {wallet}</p>
          <p>{balanceWallet} ETH</p>
          {/* <h1 className='text-center'>{tokenInfo.name}</h1> */}
          <div className="jumbotron">
            {/* <p className="lead text-center">{tokenInfo.description}</p> */}
            {/* <img src={tokenInfo.image} className="img-fluid" /> */}
            {/* <form> */}
            <input value="0.01" name="donacion" className="form-control bg-dark text-white rounded-0 border-0 my-4" type="number" step="any" />
            <Button onClick={minteo} className="mb-2 btn-block" variant="success">Mint y Donar 0.01 Eth </Button>
            <Button onClick={balance} className="mb-2 btn-block" variant="warning">Balance </Button>

            {/* <button className="btn btn-success my-4">Mint y Donar 0.01 Eth</button> */}
            {/* </form> */}
          </div>
        </div>
      </div>

    </div>
  );
}

export default MintDonate;
