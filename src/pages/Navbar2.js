import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar2() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", {});
    };
  }, []);

  // console.log(show);

  return (
    <div className={`col-12 col-sm-12 text-white text-center p-0 ${show ? 'nav__black' : ''}`} id="navbar2">
      <div className="container-fluid p-0">
        <div className="row p-0">
          <div className="col-12 col-sm-12 d-flex justify-content-between align-items-center">
            <div>
              <img src="https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png" alt="netflix" className="nav__logo" />
            </div>
            <div className="border-0 bg-transparent nav__div pt-2 ms-5">
                <Link to="/home" className="nav__link">Home</Link>
                <Link to="/search" className="nav__link">Search</Link>
                <Link to="/v1/iptv" className="nav__link">IPTV</Link>
                <Link to="#" className="nav__link">Logout</Link>
            </div>
            <div>
              <img src="https://i.ibb.co/f8rysKm/Netflix-avatar.png" alt="netflix" className="nav__avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
