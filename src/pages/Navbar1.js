import { Link } from 'react-router-dom';

function Navbar1() {
	return (
		<div className="text-white d-flex justify-content-evenly align-items-center border-0" id="navbar1" style={{ backgroundColor: '#111' }}>
			<Link to="/search">
				<i className="fa-solid fa-magnifying-glass" style={{ color: '#fafafa' }}></i>
			</Link>
			<Link to="/home">
				<i className="fa-solid fa-house" style={{ color: '#fafafa' }}></i>
			</Link>
			{ /* <div>
				<i className="fa-solid fa-calendar-days" style={{ color: '#fafafa' }}></i>
			</div> */ }
			<Link to="/v1/iptv">
				<i className="fa-solid fa-desktop" style={{ color: '#fafafa' }}></i>
			</Link>
			{ /* <div>
				<i className="fa-solid fa-clapperboard" style={{ color: '#fafafa' }}></i>
			</div>
			<div>
				<i className="fa-solid fa-plus" style={{ color: '#fafafa' }}></i>
			</div> */ }
		</div>
	);
}

export default Navbar1;
