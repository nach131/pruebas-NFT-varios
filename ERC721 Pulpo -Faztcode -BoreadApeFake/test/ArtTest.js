const ART = artifacts.require('ArtCollectible');

contract('ART', () => {

  before(async () => {
    this.art = await ART.deployed()
  })

  it('Address', () => {
    const address = this.art.address
    console.log("address: ", address);
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
    assert.notEqual(address, 0x0)
    assert.notEqual(address, "")
  })

  it('BalanceOf', async () => {
    const owner = await this.art.owner()
    const balance = await this.art.balanceOf(owner)
    console.log("Balance inicial: ", balance.words[0]);
  })

  it('Owner', async () => {
    const owner = await this.art.owner()
    console.log("owner: ", owner)
  })

  it('Claim', async () => {

    const url = 'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1001'
    result = await this.art.claimItem(url)

    console.log("claimItem :", result.logs[0].args)

  })

  it('BalanceOf', async () => {
    const owner = await this.art.owner()
    const balance = await this.art.balanceOf(owner)
    console.log("Balance despues claim: ", balance.words[0]);

  })


})