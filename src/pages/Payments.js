import { useState } from 'react';
import './p.css';
import Wallet from './Wallet';

function Payments() {
  	const [donationAmount, setDonationAmount] = useState(null);
  	const [customAmount, setCustomAmount] = useState('');

  	const handleAmountClick = (amount) => {
  	  setDonationAmount(amount);
  	};

  	const handleCustomAmountChange = (event) => {
    	setCustomAmount(event.target.value);
  	};

	const names = ['nvnhgdgfdg', 'pioiuiuuiyyu', 'bncfsfdwqwwsd'];
	const capitalizeFirstLetter = (word) => {
	  return word.charAt(0).toUpperCase() + word.slice(1);
	};

	const capitalizedNames = names.map(capitalizeFirstLetter);

	const name2 = capitalizedNames.join(', ');

	return (
		<div className="container-fluid p-0 bg-dark pt-3" id="pay__div1">
			<div className="row justify-content-center mt-4">
				<div className="col-12 col-sm-4 col-md-2"></div>
				<div className="col-12 col-sm-4 col-md-8 bg-dark pav__div2">
					<div className="text-uppercase text-white" style={{ fontSize: "20px", fontWeight: "500" }}>
						donate now
					</div>

					<div className="mt-1 ps-4 row g-4 align-items-center">
						<button 
								className="col-auto amtBtn text-white" 
								onClick={() => handleAmountClick(0.1)}
								style={{ backgroundColor: donationAmount === 0.1 ? '#45b6fe' : 'transparent', color: donationAmount === 0.1 ? 'white' : 'black', border: donationAmount === 0.1 ? 'none' : '1px solid grey' }}
						>0.1</button>
						<button 
								className="col-auto amtBtn text-white" 
								onClick={() => handleAmountClick(0.5)}
								style={{ backgroundColor: donationAmount === 0.5 ? '#45b6fe' : 'transparent', color: donationAmount === 0.5 ? 'white' : 'black', border: donationAmount === 0.5 ? 'none' : '1px solid grey' }}
						>0.5</button>
						<button 
								className="col-auto amtBtn text-white" 
								onClick={() => handleAmountClick(1.0)}
								style={{ backgroundColor: donationAmount === 1.0 ? '#45b6fe' : 'transparent', color: donationAmount === 1.0 ? 'white' : 'black', border: donationAmount === 1.0 ? 'none' : '1px solid grey' }}
						>1.0</button>
						<div className="col-auto input-group input-group-lg p-2 sol__div1">
							<span className="input-group-text" style={{ backgroundColor: 'white' }}>SOL</span>
							<input 
							 	type="number" 
							    className="border ps-3" 
							  	placeholder="Other Amount" 
							  	aria-label="Amount (to the nearest sol)"
							  	value={customAmount}
                                onChange={handleCustomAmountChange} 
							/>
						</div>
						<div className="col-auto sol__div2">
						    <input 
						    	type="number" 
						    	className="border p-3"
						    	placeholder="Enter Amount in (SOL)" 
						    	value={customAmount}
                                onChange={handleCustomAmountChange} 
                                aria-describedby="solHelp"
                            />
						</div>
					</div>

					<div className="mt-3 ps-4 text-white">
						<h4 style={{ overflowY: 'hidden' }}>Donors</h4>
						<div>
							<marquee style={{ color: 'white', fontSize: '20px', fontWeight: '500' }}>{name2}</marquee>
					    </div>
					</div>

					<div className="mt-2 text-center">
						<Wallet donationAmount={donationAmount} customAmount={customAmount} />
					</div>
				</div>
				<div className="col-12 col-sm-4 col-md-2"></div>
			</div>
		</div>
	);
}

export default Payments;