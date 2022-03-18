import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from './components/layouts/Menu'
// import Filter from "./pages/Filter"
// import BoredApe from "./pages/BoredApe"
import Mint from './pages/Mint'
import Nfts from './pages/Nfts'
import NftsMetadata from './pages/NftsMetadata'
import MintDonate from './pages/MintDonate'

function App () {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Mint />} />
        <Route path='/mintdonate' element={<MintDonate />} />
        <Route path='/nfts' element={<Nfts />} />
        <Route path='/nfts_datos' element={<NftsMetadata />} />
        {/* <Route path='/more' element={<BoredApeMore />} /> */}
        {/* <Route path='/token/:id' element={<Token />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
