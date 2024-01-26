import { useState, useEffect } from 'react';
import './home.css';
import Navbar4 from './Navbar4';
import Navbar1 from './Navbar1';
import Banner from './Banner';
import Row4 from './Row4';
import requests from './requests';
import Spinner2 from './Spinner2';

function Home2() {
	const [isLoading, setIsLoading] = useState(true);

  	useEffect(() => {
	    // Simulate data loading delay
	    const timeout = setTimeout(() => {
	      setIsLoading(false);
	    }, 2000); // Replace 2000 with the actual loading time for the first row

	    return () => clearTimeout(timeout);
  	}, []);

  	const handleNextRowLoad = () => {
	    // Set isLoading to true when the next row loads
	    setIsLoading(true);

	    // Simulate data loading delay for the next row
	    setTimeout(() => {
	      setIsLoading(false);
	    }, 2000); // Replace 2000 with the actual loading time for the next row
  	};

	return (
		<div className="container-fluid" id="mainContainer">
			<div className="row">
				<div className="col-12 col-sm-12 text-white p-0" id="homeDiv1">
					<Navbar4 />
					<Banner />
					{isLoading && <div className="loading-spinner"></div>}
					<Row4 
						title="pirated.tv originals" 
						fetchUrl={requests.fetchNetflixOriginals} 
						isLargeRow={true} 
						onLoaded={handleNextRowLoad}
					/>
					<Row4 
						title="trending now" 
						fetchUrl={requests.fetchTrending}
						onLoaded={handleNextRowLoad} 
					/>
					<Row4 
						title="top rated" 
						fetchUrl={requests.fetchTopRated}
						onLoaded={handleNextRowLoad} 
					/>
					<Row4 
						title="action movies" 
						fetchUrl={requests.fetchActionMovies}
						onLoaded={handleNextRowLoad} 
					/>
					<Row4 
						title="comedy movies" 
						fetchUrl={requests.fetchComedyMovies}
						onLoaded={handleNextRowLoad} 
					/>
					<Row4 
						title="horror movies" 
						fetchUrl={requests.fetchHorrorMovies}
						onLoaded={handleNextRowLoad} 
					/>
					<Row4 
						title="romance movies" 
						fetchUrl={requests.fetchRomanceMovies}
						onLoaded={handleNextRowLoad} 
					/>
					<Row4 
						title="documentaries" 
						fetchUrl={requests.fetchDocumentaries}
						onLoaded={handleNextRowLoad} 
					/>
					<div style={{ height: '60px' }}></div>
					<Navbar1 />
				</div>
			</div>
		</div>
	);
}

export default Home2;