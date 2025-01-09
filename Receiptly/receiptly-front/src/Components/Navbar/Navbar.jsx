import '../Navbar/Navbar.css'
import IMG from '../../Images/test.jpg'
import { useState } from 'react'
import { FormProvider } from '../../context/FormContext'
import { Form } from '../Form/Form'

const Navbar = () => {

  const [overlay, setOverlay] = useState(false)

  const CardCallback = () => {
    setOverlay(false)
  }

  return (

    <header className="header">
      <nav className="navbar">
        <div className="logoContainer">
          <a href="/" className="logoText">
            Receiptly
          </a>
        </div>

        <div className="navLinks">
          <div className="navLinksContainer">
            <a href="#" className="navLinkSpecial" onClick={() => setOverlay(true)}>New Receipt</a>
            <a href="/" className="navLink">Your Receipts</a>
            <a href="/yourProducts" className="navLink">Your Products</a>
            <a href="/history" className="navLink">History</a>
          </div>
        </div>

        <div className="profileContainer">
          <button className="SignUp">Sign Up</button>
          <button className="SignIn">Sign In</button>
        </div>

        {overlay &&
            <div className='bodyOverlay'>
              <FormProvider>
                <Form setActiveCard={CardCallback} />
              </FormProvider>
            </div>}
      </nav>
    </header>
  )
}

export default Navbar