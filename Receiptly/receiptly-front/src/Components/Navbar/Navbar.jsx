import '../Navbar/Navbar.css'
import IMG from '../../Images/test.jpg'

const Navbar = () => {
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
            <a href="#" className="navLinkSpecial">New Receipt</a>
            <a href="/" className="navLink">Your Receipts</a>
            <a href="/yourProducts" className="navLink">Your Products</a>
            <a href="/history" className="navLink">History</a>
          </div>
        </div>

        <div className="profileContainer">
          <button className="SignUp">Sign Up</button>
          <button className="SignIn">Sign In</button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar