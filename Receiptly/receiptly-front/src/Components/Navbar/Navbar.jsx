import '../Navbar/Navbar.css'
import IMG from '../../Images/test.jpg'

const Navbar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logoContainer">
          <span className="logoText">
            Receiptify
          </span>
        </div>

        <div className="navLinks">
            <div className="navLinksContainer">
              <a href="#" className="navLinkSpecial">New Receipt</a>
              <a href="/currentRecepits" className="navLink">Current Receipt</a>
              <a href="/yourProducts" className="navLink">Your Products</a>
              <a href="/history" className="navLink">History</a>
            </div>
        </div>

        <div className="profileContainer">
          <div className="profile">
            <img src={IMG} alt="CustomerImg" className="profileImg" />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar