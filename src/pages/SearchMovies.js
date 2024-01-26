import { useState, useEffect } from 'react';
import './sm.css';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

function SearchMovies(props) {
  	const [text, setText] = useState('');
  	// const [id, setId] = useState(null);
  	const [searchResults, setSearchResults] = useState([]);
  	const [isResultsVisible, setIsResultsVisible] = useState(true);
  	const [selectedItem, setSelectedItem] = useState({});
  	const [rSearch, setRSearch] = useState([]);
  	const [pSearch, setPSearch] = useState([]);

	const base_url = "https://image.tmdb.org/t/p/original";

  	const inputChangeHandler = (event) => {
    	setText(event.target.value);
    	setIsResultsVisible(true);
  	}

  	const handleLiClick = (result) => {
    	setText(result.title || result.name);
    	setIsResultsVisible(false);
    	setSelectedItem({ id: result.id, media_type: result.media_type });
  	};

  	const fetchData = async () => {
	    try {
	      const response = await axios.get(`/search/multi?query=${text}&include_adult=false&language=en-US&page=1`, {
	        headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
			}
	      });

	      setSearchResults(response.data.results);
	      return response;
	    } catch (error) {
	      console.error('Error fetching data:', error);
	    }
  	};

  	useEffect(() => {
	    if (text.trim() !== '') {
	      fetchData();
	    } else {
	      setSearchResults([]);
	    }
  	}, [text]);

  	const handleGoButtonClick = async () => {
	    if (selectedItem.id) {
	      try {
	        let mediaType = "movie";

			if (selectedItem.media_type === 'tv') {
				mediaType = "tv";
			}
			else if (selectedItem.media_type === 'movie') {
				mediaType = "movie"
			}

			// console.log(mediaType, selectedItem.id);

			const response2 = await axios.get(`/${mediaType}/${selectedItem.id}?language=en-US`, {
				headers: {
				    accept: 'application/json',
				    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
				}
			});

			// console.log(response2.data);

			setRSearch(response2.data);

			return response2.data;
	        // Process the fetched data as needed
	      } catch (error) {
	        console.error('Error fetching data:', error);
	      }
	    }
  	};

  	useEffect(() => {
	    async function fetchData() {
	      	try {
		        // Fetch Netflix originals
		        const response = await axios.get("/trending/all/day?language=en-US", {
		          	headers: {
					    accept: 'application/json',
					    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
					},
		        });

		        // console.log(response.data.results);

		        setPSearch(response.data.results);

		        return response.data.results;
	    	}
	    	catch (error) {
		        console.error('Error fetching data:', error);
		    }
		}
		fetchData();
	}, [])

	const navigate = useNavigate();

	const handleClick = (movie) => {
	    // Extract necessary information
	    let name = '';
	    let id = '';

	    // console.log(movie.media_type, movie);
	    // console.log(movie);

	    if (movie.hasOwnProperty('media_type') && movie.media_type === "movie") {
	      name = movie.original_title;
	      id = movie.id;
	    }
	    else if (movie.hasOwnProperty('media_type') && movie.media_type === "tv") {
	      name = movie.name;
	      id = movie.id;
	    }
	    else {
	      name = movie?.original_name || movie?.title;
	      id = movie.id;
	    }

	    // console.log(name, id);

	    // Build the URL with query parameters
	    const url = `/v1/moviePart/${id}?name=${name}`;

	    // Navigate to the URL
	    navigate(url);
  	};

  	const handleKeyDown = (event) => {
	  if (event.key === "Enter") {
	    event.preventDefault(); // Prevent form submission
	    handleGoButtonClick(); // Call your submit function
	  }
	};

	return (
		<div>
			<div className="container-fluid">
				<div className="row bg-black">
					<Navbar2 />

					<div className="col-12 col-sm-12 bg-black text-white p-5" id="smDiv1">
						<div className="col-xxl border-0 mt-2 bg-dark text-white p-2" id="searchBox" style={{ borderRadius: '5px' }}>
							<form className="d-flex" role="search">
							    <input 
							    	className="form-control bg-transparent text-white border-0 search" 
							    	value={text} type="search" 
							    	placeholder="Movie, shows and more" 
							    	aria-label="Search" 
							    	onChange={inputChangeHandler} 
							    	onKeyDown={handleKeyDown}
							    	style={{ fontWeight: '500', fontSize: '20px', color: 'white !important', outline: 'none', border: 'none' }} />
							    <button 
							    	type="button" 
							    	onClick={handleGoButtonClick} 
							    	className="btn bg-transparent text-white"
							    >
							    	<i className="fa-solid fa-magnifying-glass" style={{ color: '#ffffff' }}></i>
							    </button>
							</form>

							{isResultsVisible && searchResults.length >= 1 && (
  								<ul>
								    {searchResults.map((result) => (
								      <li
								        key={result.id}
								        onClick={() => {
								          handleLiClick(result);
								          setSearchResults([]); // Clear search results when an item is selected
								        }}
								        className="p-2"
								        style={{ cursor: 'pointer' }}
								      >
								        {result.title || result.name}
								      </li>
								    ))}
  								</ul>
							)}
						</div>
						<div className="mt-5">
							{rSearch && Object.keys(rSearch).length > 1 && (
        						<div className="card">
								  	<img 
								  		src={`${base_url}${rSearch?.backdrop_path || rSearch?.poster_path}`} 
								  		className="card-img-top" 
								  		alt="netflix"
								  		onClick={() => handleClick(rSearch)}
								  	/>
								</div>
							)}

							<h4 className="mt-5">Popular Searches</h4>
							{pSearch && pSearch.length >= 1 && (
								<div className="flex flex-row flex-wrap">
									{pSearch.map(i => (
										<button 
											key={i.id} 
											className="btn p-2 me-3 mb-3 border"
											onClick={() => {
									          setText(i.name || i.original_title);
									        }}
										>
											{i?.name || i?.original_title}
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					<Navbar1 />
				</div>
			</div>
		</div>
	);
}

export default SearchMovies;