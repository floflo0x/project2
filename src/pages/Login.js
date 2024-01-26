import { useCallback, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

// https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png
// https://i.ibb.co/mBck0jc/logo4.png
// https://i.ibb.co/42yHF7R/logo3.png
// https://i.ibb.co/7nVhzFx/netbg-1.jpg

import {
  LoginSocialTwitter,
} from 'reactjs-social-login';

import {
  TwitterLoginButton,
} from 'react-social-login-buttons';

function Login(props) {
    const REDIRECT_URI = 'https://project2-wznt.onrender.com';

    const { connection } = useConnection();
    const { publicKey, sendTransaction, wallet } = useWallet();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleClick = () => {
	    setIsButtonDisabled(false);
	};

	const [provider, setProvider] = useState('');
  	const [profile, setProfile] = useState('');

  	const onLoginStart = useCallback(() => {
    	alert('login start');
  	}, []);

  	const onLogoutSuccess = useCallback(() => {
    	setProfile(null);
    	setProvider('');
    	alert('logout success');
  	}, []);

	 const onResolve = useCallback(({ provider, data }) => {
  	     console.log('Resolve callback called:', provider, data);
		 
	    setProvider(provider);
	    setProfile(data);
		 
	    // Redirect to /home after successful login

	    // {({ provider, data }: IResolveParams) => {
			// 	setProvider(provider);
			// 	setProfile(data);
			// }}
	  }, []);

	return (
		<div className="bg-black text-white" id="loginDiv">
			<header>
				<div className="container-fluid border-0" id="header">
					<div className="row">
						<div className="col-12 pt-0 pb-0 ps-5 pe-5">
							<img src="https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png" alt="netflix" width="100" height="100" id="logo1" />
						</div>
					</div>
				</div>
			</header>

			<section>
				<div className="container-fluid p-0">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-2 col-lg-3 col-xl-4"></div>
						<div className="col-12 col-sm-8 col-lg-6 col-xl-4 p-5" id="loginDiv2">
							<div>
							    <h2 className="text-capitalize" style={{ overflow: 'hidden' }}>sign in</h2>
							</div>
							<div className="mt-4 text-white text-center">
								<div className="containerWithoutScrollbar" style={{ margin: 0 }}>
            							   <WalletMultiButton />
        							</div>
        				
        						<div className="mt-4 text-center">
							  {wallet && publicKey ? (
							          <>
							            <p>Your wallet address: {publicKey && publicKey.toString()}</p>
							            <Link
							             	to="/home"
							             	className="btn p-2"
							             	style={{ color: 'white', backgroundColor: 'red', fontWeight: '900' }}
							             	onClick={handleClick}
							            >
							             	CONTINUE
							            </Link>
							          </>
					         	) : (
						            <button className="btn p-2" style={{ color: 'white', backgroundColor: 'grey', fontWeight: '900' }} disabled>
						              CONTINUE
						            </button>
						        )}
        					    </div>
						</div>
							<div 
								className="mt-3 text-center text-white" 
								style={{ fontWeight: '500', fontSize: '20px' }}
							>
								OR
							</div>
							<div className="mt-2 text-center">
								<LoginSocialTwitter
								    client_id={'c3pTOERLYlo1QXlEcTZYcHp4Ylg6MTpjaQ' || ''}
								    redirect_uri={REDIRECT_URI}
								    onLoginStart={onLoginStart}
								    onLogoutSuccess={onLogoutSuccess}
								    onResolve={onResolve}
								    onReject={(err: any) => {
								      console.log(err);
								    }}
								>
								  <TwitterLoginButton />
								</LoginSocialTwitter>
							</div>
						</div>
						<div className="col-12 col-sm-2 col-lg-3 col-xl-4"></div>
					</div>
				</div>
			</section>

			<section>
				<div className="container-fluid mt-2 d-none">
					<div className="row">
						<div className="col-12 col-sm-12 col-lg-3 col-xl-4">
						</div>
					</div>
				</div>
			</section>

			<footer>
				<div className="container-fluid p-0">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-12">
							Questions? Call 000-800-919-1694
						</div>
						<div className="col-12 col-sm-12 footer_div">
							<div>FAQ</div>
							<div>Help Centre</div>
							<div>Terms of Use</div>
							<div>Privacy</div>
							<div>Cookie Prefrences</div>
							<div>Corporate Information</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Login;
