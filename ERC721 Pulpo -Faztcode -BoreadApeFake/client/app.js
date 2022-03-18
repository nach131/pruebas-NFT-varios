
App = {

  contract: {},

  init: async () => {
    await App.loadEthereum()
    await App.loadAccount()
    await App.loadContracts()
    App.render()
    // await App.renderTask()
    await App.renderNFT()
  },

  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum
      //conectar con MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      // otra forma de conectarse a MetaMask
      web3 = await new Web3(window.web3.currentProvider)
      console.log("web", web3);
    }
    else {
      console.log("instalar metamask")
    }
  },


  loadAccount: async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // const accounts2 = await web3.eth.getAccounts(); // con web3
    App.account = accounts[0]
    // console.log("cuenta", accounts);
    console.log("Cuenta conectada:", App.account)

  },

  loadContracts: async () => {

    const res = await fetch("BoredApeFake.json")
    const resDona = await fetch('DonateContract.json')
    // pasamos res a json
    const nftContractJSON = await res.json()
    const donaContractJSON = await resDona.json()
    console.log("Metodos del contrato:", nftContractJSON.abi)
    console.log("Metodos del Dona:", donaContractJSON.abi)
    // El contrato dentro del obj contracts de App
    App.contract.nftContract = TruffleContract(nftContractJSON)
    App.contract.donaContract = TruffleContract(donaContractJSON)

    // para conectarse el contrato a la cuenta de MetaMask
    App.contract.nftContract.setProvider(App.web3Provider)
    App.contract.donaContract.setProvider(App.web3Provider)

    // Desplegar el contrato
    App.nftContract = await App.contract.nftContract.deployed()
    App.donaContract = await App.contract.donaContract.deployed()
  },



  render: async () => {
    // La cuenta conectada renderizada
    document.getElementById("account").innerText = App.account;
    const name = await App.nftContract.name()
    const symbol = await App.nftContract.symbol()
    document.getElementById("name").innerText = name;

    console.log('nombre:', name);
    console.log('symbol:', symbol);
  },

  renderTask: async () => {
    // Trae el metodo TasksCounter del contrato
    const balanceNFT = await App.nftContract.balanceOf(App.account)
    const NumBalanceNFT = balanceNFT.words[0]
    console.log("NFT creados: ", NumBalanceNFT);



    let html = ''

    // hay que traer las tareas una a uno
    for (let i = 1; i <= NumBalanceNFT; i++) {
      //cargagos cada tarea unica
      const task = await App.nftContract.tasks(i)
      // console.log((task));
      // traemos solo los datos pero hay que pasarlos a variables, por que en la blockchain solo esta el indice (0,1...)
      const taskId = task[0].toNumber();
      const taskTitle = task[1]
      const taskDescription = task[2]
      const taskDone = task[3]
      const taskCreatedAt = task[4];

      console.log("taskDone:", taskDone)


      let taskElement = `<div class="card bg-dark rounded-0 mb-2">
      <div class="card-header d-flex justify-content-between align-items-center">
          <span>${taskTitle}</span>
          <div class="form-check form-switch">
            <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.toggleDone(this)" ${taskDone === true && "checked"
        }/>
          </div>
        </div>
        <div class="card-body">
          <span>${taskDescription}</span>
          <span>${taskDone}</span>
          <p class="text-muted">la tarea se creo ${new Date(
          taskCreatedAt * 1000
        ).toLocaleString()}</p>
          </label>
        </div>
      </div>`;
      // añadimos el valor a html cada vez que recorre el for
      html += taskElement
    }

    document.querySelector("#taskList").innerHTML = html
  },

  renderNFT: async () => {
    // trar el balance de los NFT
    const balanceNFT = await App.nftContract.balanceOf(App.account)
    const NumBalanceNFT = balanceNFT.words[0]
    const AddrContrato = await App.nftContract.address()

    console.log("tomate:", AddrContrato)

    console.log("NFT creados: ", NumBalanceNFT);
    let html = ''
    // hay que traer las NFT una a uno
    let promesas = []

    for (let i = 1; i <= NumBalanceNFT; i++) {
      const url = await App.nftContract.tokenURI(i)
      console.log("tokenUrl:", url);

      axios(url)
        .then(res => {
          // promesas.push(res.data)
          const taskId = i;
          let attributes = res.data.attributes
          let image = res.data.image
          console.log("axios:", attributes, image, taskId);

          // let nftElement = `
          // <div class="card bg-dark rounded-0 mb-2">
          // <div class="card-header d-flex justify-content-between align-items-center">
          //     <span>taskId</span>
          //   </div>
          //   <div class="card-body">
          //     <span>descripcion</span>
          //   </div>
          // </div>`;
          // // añadimos el valor a html cada vez que recorre el for
          // html += nftElement
        })



    }
    document.querySelector("#nftList").innerHTML = html

  },

  minteo: async () => {
    const url = 'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/4684'

    const result = await App.nftContract.claimItem(url, {
      from: App.account
    })

    console.log(result);
    console.log("minteo");

  },


  donacion: async (donar) => {
    console.log('donacion: ', donar);
    let pasar = donar * 1000000000000000000

    const result = await App.donaContract.donate({
      value: pasar,
      from: App.account
    })
    console.log(result);
  }



}

