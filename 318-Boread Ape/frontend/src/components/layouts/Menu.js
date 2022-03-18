import React from 'react'
// import { Link } from 'react-dom';
import { Nav, Navbar } from 'react-bootstrap'


// import NavDropdown from 'react-bootstrap/NavDropdown'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'

const Menu = () => {




  return (
    // <Navbar expand="lg" className="navbar-dark bg-primary">
    <Navbar expand="lg" bg="warning" variant="light">
      <Navbar.Brand href="/">318-Bored Ape</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          // className="mr-auto my-2 my-lg-0 navbar-dark bg-primary"
          // className="mr-auto my-2 my-lg-0 navbar-dark "
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/mintdonate">Mint Donate</Nav.Link>
          <Nav.Link href="/nfts">NFTs</Nav.Link>
          <Nav.Link href="/nfts_datos">Nft Metadata</Nav.Link>
          <Nav.Link href="/conectar">Conectar</Nav.Link>
          {/* <Nav.Link href="/more">More</Nav.Link> */}
          {/* <Button variant="outline-danger" onClick={accountSubmitRequest}>requestAccount</Button> */}



        </Nav>

      </Navbar.Collapse>
    </Navbar >
  )
}
export default Menu