import '../Navbar/Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FormProvider } from '../../context/FormContext'
import { Form } from '../Form/Form'
import { IoMenu } from "react-icons/io5";
import { SignUpIn } from '../../Pages/SignUpIn'


const Navbar = () => {

  const [overlay, setOverlay] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleResize = () => {
    /* console.log(window.innerWidth) */
    const isNowDesktop = window.innerWidth >= 768;
    setIsDesktop(isNowDesktop);

    // Automatically close sidebar on mobile
    if (!isNowDesktop) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if(localStorage.getItem("Access"))
      setIsLoggedIn(true)
  }, [])

  const CardCallback = () => {
    setOverlay(false)
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  return (

    <header className="header">
      <nav className="navbar">
        <div className="logoContainer">
          <a href="/" className="logoText">
            Receiptly
          </a>

          {!isDesktop && <IoMenu color="#7acccc" style={{ width: "30px", height: "30px", cursor: "pointer" }} onClick={() => toggleOpen(true)} />}
        </div>

        <div className={`navLinks ${isOpen ? "open" : ""}`}>
          <div className="navLinksContainer">
            <a href="#" className="navLinkSpecial" onClick={() => setOverlay(true)}>New Receipt</a>
            <a href="/" className="navLink">Your Receipts</a>
            <a href="/yourProducts" className="navLink">Your Products</a>
            <a href="/history" className="navLink">History</a>
          </div>

          {!isLoggedIn ? <div className="profileContainer">
            <button className="SignUp">
              <Link to="/signUp" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.7)" }}>
                Sign Up
              </Link>
            </button>
            <button className="SignIn">
              <Link to="/signIn" style={{ textDecoration: "none", color: "#7acccc" }}>
                Sign In
              </Link>
            </button>
          </div> :
          <div className='profileContainer' style={{color: "#7acccc"}}>
            Hello Ramin
          </div>
          }
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