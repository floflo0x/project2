import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar4() {
	return (
		<div id="navbar4">
			<nav className="navbar navbar-expand-lg bg-black border-body p-0 w-100" data-bs-theme="dark">
				<div className="container-fluid p-0 w-100">
					<div className="row border-0 w-100 p-0">
						<div className="col-12 col-sm-12 border-0 d-flex justify-content-between align-items-center p-0">
							<div className="border-0 p-0">
								<img src="https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png" alt="netflix" className="nav__logo" />
							</div>

							<div className="d-flex justify-content-center align-items-center p-0 mh__div border-0">
								<Link to="/home" className="ms-5 me-5" style={{ textDecoration: 'none', color: 'white' }}>
									Home
								</Link>
								<Link to="/search" className="me-5" style={{ textDecoration: 'none', color: 'white' }}>
									Search
								</Link>
								<Link to="/v1/iptv" className="me-5" style={{ textDecoration: 'none', color: 'white' }}>
									IPTV
								</Link>
							</div>

							<div className="p-0">
				                <img src="https://i.ibb.co/f8rysKm/Netflix-avatar.png" alt="netflix" className="nav__avatar" />
				            </div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar4;