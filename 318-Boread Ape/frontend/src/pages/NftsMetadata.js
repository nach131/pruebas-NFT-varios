import React, { useState, useEffect } from 'react';
import getNftMeta from '../utils/getNftMeta'

function NftsMetadata () {
  const [wallet, setWallet] = useState(undefined)
  const [dataNft, setDataNft] = useState([])

  console.log(dataNft)

  useEffect(() => {
    const init = async () => {
      const { wallet, data } = await getNftMeta();
      setWallet(wallet)
      setDataNft(data)
    };
    init();
  }, []);

  return (
    <>
      <div>NftsMetadata</div>
      <p>wallet: {wallet}</p>
      <ul>
        {dataNft.map((item, i) => <li key={i}>{item.uri}</li>)}
      </ul>
    </>
  )
}

export default NftsMetadata