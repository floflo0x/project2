import { useState, useEffect } from 'react';
import './mp.css';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axios1 from './axios';
import Spinner2 from './Spinner2';
// https://i.ibb.co/nbjDvPf/netsd-3.jpg

function MoviePart() {
	let { id } = useParams();
	const [text, setText] = useState([]);
  	const location = useLocation();
  	const queryParams = new URLSearchParams(location.search);
	const [isLoading, setIsLoading] = useState(true);
	const [seasons, setSeasons] = useState(null);
	const [collection, setCollection] = useState(null);
	const [selectedSeason, setSelectedSeason] = useState(null);
	const [episodeData, setEpisodeData] = useState(null);
	const [epId, setEpId] = useState(null);
	const [selectedCollection, setSelectedCollection] = useState(null);
	const [similarMovies, setSimilarMovies] = useState(null);
	const [genre, setGenre] = useState(null);
	const [cast, setCast] = useState(null);
	const [firstSeason, setFirstSeason] = useState(null);
	const navigate = useNavigate();

  	// Access query parameters
  	let name = queryParams.get('name');
  	let eNo = queryParams.get('episode');
  	let sNo = queryParams.get('sno');
	
	// console.log(id, name, eNo, sNo);
	
  	async function fetchData() {
		const response = await axios1.get(`/search/multi?query=${name}&include_adult=false&language=en-US&page=1`, {
			headers: {
			    accept: 'application/json',
			    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
			}
		});

		// console.log(response.data.results);

		let filterData = response.data.results.filter(i => {
		  return i.id === id;
		});

		if (filterData.length === 0) {
		  filterData = response.data.results.filter((i, index) => {
		  	return index === 0;
		  });
		}

		// console.log(filterData, filterData[0].media_type);

		let mediaType = "movie";

		if (filterData[0].media_type === 'tv') {
			mediaType = "tv";
		}

		else if (filterData[0].media_type === 'movie') {
			mediaType = "movie"
		}

		// 89113 1782705 2888662 1

		// console.log(mediaType, filterData[0].id);

		const response2 = await axios1.get(`/${mediaType}/${filterData[0].id}?append_to_response=credits&language=en-US`, {
			headers: {
			    accept: 'application/json',
			    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
			}
		});
		// console.log(response2.data);

		// console.log(response2.data, response2.data.hasOwnProperty('number_of_seasons'), response2.data.hasOwnProperty('belongs_to_collection'));

		setCast(response2.data.credits.cast);
		setGenre(response2.data.genres);

		if (response2.data.hasOwnProperty('number_of_seasons') && response2.data.number_of_seasons !== null) {
			// console.log(response2.data?.seasons);
			const sID = response2.data?.id;
			const sno = response2.data?.seasons[0].season_number;
			const sid = response2.data?.seasons[0].id;

			// console.log(sID, sid);

			const response6 = await axios1.get(`/tv/${sID}/season/${sno}`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
				}
			})

			// console.log(response6.data?.episodes);

			setFirstSeason(response6.data?.episodes);

			if (eNo) {
				// console.log("1", `/tv/${sID}/season/${sNo}/episode/${eNo}`);
				const response7 = await axios1.get(`/tv/${sID}/season/${sNo}/episode/${eNo}`, {
					headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
					}
				})

				// console.log(response7.data);
				setText(response7.data);
			}

			else {
				setText(response2.data);
			}

			// console.log(response2.data);

			const response5 = await axios1.get(`/tv/${sID}/similar`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
				}
			})

			setEpId(response2.data.id);
			setSeasons(response2.data.seasons);
			setIsLoading(false);
			setSimilarMovies(response5.data.results);
			setSelectedSeason(sid);
			return response2.data;
		}

		else if (response2.data.hasOwnProperty('belongs_to_collection') && response2.data.belongs_to_collection !== null) {
			// console.log(response2.data);

			if (response2.data.belongs_to_collection !== '') {
				const id = response2.data.belongs_to_collection?.id;
				const sID = response2.data?.id;
				setEpId(response2.data?.id);

				const url = `/collection/${id}`;
				const response4 = await axios1.get(`/collection/${id}`, {
					headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
					}
				})

				// console.log(response4.data);

				const response5 = await axios1.get(`/movie/${sID}/similar`, {
					headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
					}
				})

				// console.log(response5.data.results);

				setSimilarMovies(response5.data.results);
				setCollection(response4.data.parts);
				setSelectedCollection(response4.data.parts[0].id);
			}
			setText(response2.data);
			setIsLoading(false);
			return response2.data;
		}

		else {
			// console.log("3");
			const response5 = await axios1.get(`/${mediaType}/${id}/similar`, {
		        headers: {
		          accept: 'application/json',
		          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
		        }
		    })

		    setSimilarMovies(response5.data.results);
			setText(response2.data);
			setIsLoading(false);
			return response2.data;
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	// https://image.tmdb.org/t/p/original/kGzFbGhp99zva6oZODW5atUtnqi.jpg
	// https://image.tmdb.org/t/p/original${text?.poster_path}

	const formatTime = (minutes) => {
	    const hours = Math.floor(minutes / 60);
	    const remainingMinutes = minutes % 60;

	    let timeString = '';

	    if (hours > 0) {
	      timeString += ` ${hours} hr `;
	    }

	    if (remainingMinutes > 0) {
	      timeString += `${remainingMinutes} min `;
	    }

	    return timeString.trim(); // Trim any leading/trailing spaces
  	};

  	const handleButtonClick = () => {
    	// Redirect to the home page
		navigate("/home");
  	};

  	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	// console.log(seasons);
	// console.log(collection);
	// console.log(similarMovies);

	async function seasonClickHandler(id, seasonNumber) {
		// console.log(id);
		setSelectedSeason(id);
        	const url = `/tv/${epId}?language=en-US&append_to_response=season/${seasonNumber}`;
		const response3 = await axios1.get(url, {
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
			}
		})

		const sData = response3.data['season/'+seasonNumber].episodes;

		// console.log(sData);

		setEpisodeData(sData);
		setFirstSeason(null);
	}

	const collectionClickHandler = (collectionId) => {
    	setSelectedCollection(collectionId);
  	};

  	const handleClick = (episode, type) => {
	    // let name = episode?.title || episode?.name || episode?.original_name || episode?.original_title;
	    let id = episode.episode_number;
	    let show_id = '';
	    if (type == 'tv') {
	    	show_id = episode.show_id;
	    }
	    else {
	    	show_id = episode.id;
	    	name = episode?.title || episode?.name || episode?.original_name || episode?.original_title;
	    }
	    let sno = episode.season_number;

	    // console.log(episode, name, show_id, id, sno);

	    navigate(`/v1/nextPart/${show_id}?name=${name}&episode=${id}&sno=${sno}`);

	    // setText(episode);
  	};

  	const smClickHandler = (smovie) => {
  		let name = smovie?.title || smovie?.name || smovie?.original_name || smovie?.original_title;
  		let id = smovie.id;

	    	// console.log(name, id, smovie);
		
		navigate(`/v1/nextPart/${id}?name=${name}&episode=&sno=`);
  	}

  	// console.log(similarMovies);
  	// console.log(text);

	return (
		<div className="text-white" id="mpDiv1">
			{isLoading ? (
        		<Spinner2 />
      		) : (
      		<>
				<header id="headerDiv" className="fade-in" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${text?.backdrop_path || text?.still_path})` }}>
					<div className="container-fluid p-0" id="mpDiv3">
						<div className="row p-0">
							<div className="col-12" id="mpDiv">
							</div>
							
							<div id="displayText">
								<div className="d-flex" style={{ color: 'white' }}>
									<div className="border-0"><img src="https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png" alt="netflix" width="50" height="50" /></div>
									<div className="align-self-center font-monospace mp__text1">FILM</div>
								</div>
								<h3 className="text-uppercase ps-2 mp__text2" style={{ fontWeight: '700', overflow: 'hidden', textShadow: '2px 2px 2px rgba(0,0,0,0.7)' }}>{text?.original_name || text?.title || text?.name}</h3>
						        <div className="d-flex justify-content-between" id="mpDiv2">
						        	<div className="d-flex">
							        	<Link to="/v1/play/?url=" className="btn text-uppercase btn-light border ms-2" style={{ color: 'black', fontWeight: '700', padding: '5px 20px', borderRadius: '3px' }}>
							        		<i className="fa-solid fa-play me-2" style={{ color: '#000000' }}></i>
							        		play
							        	</Link>
							        	<form>
							        		<button type="button" className="btn ms-3" style={{ border: '1px solid white', borderRadius: '50%', padding: '5px 10px', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
							        			<i className="fa-solid fa-plus" style={{ color: '#f5f5f5' }}></i>
							        		</button>
							        	</form>
							        	<form>
							        		<button type="button" className="btn ms-3" style={{ border: '1px solid white', borderRadius: '50%', padding: '5px 10px', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
							        			<i className="fa-solid fa-thumbs-up" style={{ color: '#f5f5f5' }}></i>
							        		</button>
							        	</form>
							        	<form>
							        		<button type="button" className="btn ms-3 align-self-end" style={{ border: '1px solid white', borderRadius: '50%', padding: '5px 10px', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
							        			<i className="fa-solid fa-volume-high" style={{ color: '#f5f5f5' }}></i>
							        		</button>
							        	</form>
							        </div>
						        </div>
							</div>
						</div>
					</div>
				</header>

				<section>
					<div id="closeBtn1">
						<button type="button" className="btn ms-3" onClick={handleButtonClick} style={{ borderRadius: '50%', padding: '5px 10px', backgroundColor: 'black' }}>
							<i className="fa-solid fa-x" style={{ color: '#ffffff' }}></i>
						</button>
					</div>
				</section>

				<section>
					<div className="container-fluid border-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '0 !important' }}>
						<div className="row">
							<div className="col-12 d-flex flex-row flex-wrap p-0" id="mpDiv4">
								<div className="col-12 col-sm-12 col-md-6 p-2 mt-2 mb-2">
									<div className="flex-item mb-2">
										<p>
											<span className="me-2">
												{text.hasOwnProperty('first_air_date')
	          										? new Date(text.first_air_date).getFullYear()
	          										: text.release_date
	            									? new Date(text.release_date).getFullYear()
	            									: ''
	        									}
											</span>
											{text.hasOwnProperty('episode_run_time') ? 
												(text.episode_run_time && text.episode_run_time.map((time, index) => (
											        <span key={index}>{formatTime(time)} </span>
											      ))) 
												: text.runtime 
												? <span>{formatTime(text.runtime)} </span>
												: '' 
											}
										</p>
										<p>
											<span 
												className="me-1" 
												style={{ backgroundColor: 'yellow', padding: '1px 5px', color: 'black', borderRadius: '5px', fontWeight: '500' }}>
													12+
											</span>
											{genre && genre.map(i => (<span key={i.id}>{i.name}, </span>))}
										</p>
									</div>
									<div className="flex-item mb-2" style={{ fontSize: '20px', fontWeight: '500' }}>No.2 in Films Today</div>
									<div className="text-wrap">
										{text.overview}
									</div>
								</div>
								<div className="col-12 col-sm-12 col-md-6 p-2 mt-2 mb-2">
									<div className="flex-item mb-3">
	  									<span style={{ color: 'grey' }}>Cast: </span> 
	  									{truncate(((cast && cast.map(i => i.original_name).join(', ')) || '') + ((text.guest_stars && text.guest_stars.map(i => i.original_name).join(', ')) || ''), 150)}
									</div>
									<div className="flex-item mb-3">
										<span style={{ color: 'grey' }}>Genres:</span> {genre && genre.map(i => (<span key={i.id}>{i.name}, </span>))}
									</div>
									<div className="flex-item mb-3">
										<span style={{ color: 'grey' }}>This film is:</span> Chilling, Ominous
										<div className="border-0 mt-3">
											<Link to="/v1/payments" 
												className="btn text-uppercase border dBtn" 
												style={{ textDecoration: 'none', color: 'white', borderRadius: '70px', padding: '5px 20px' }}
											>
												donate now
											</Link>
										</div>
									</div>
								</div>
							</div>

							<div className="col-12 col-sm-12" id="mpDiv5">
								{seasons && (
									<>
										<p className="mb-4" style={{ fontSize: '19px', fontWeight: '500' }}>Episodes</p>

										<div className="border-0 mp__div1">
											{seasons.map((season, index) => (
								                <div 
								                	className={`nav__btn ${selectedSeason === season.id ? 'active' : ''}`}
								                	key={index} 
								                	onClick={() => seasonClickHandler(season.id, season.season_number)}
								                >Season {season.season_number}</div>
								            ))}
										</div>
									</>
								)}

								{collection && (
									<>
										<p className="mb-4" style={{ fontSize: '19px', fontWeight: '500' }}>Parts</p>

										<div className="border-0 mp__div1">
											{collection.map((season, index) => (
								                <div 
								                	className={`nav__btn border-0 ${selectedCollection === season.id ? 'active' : ''}`}
								                	key={index} 
								                	onClick={() => collectionClickHandler(season.id)}
								                >{season.title}</div>
								            ))}
										</div>
									</>
								)}
								<hr />
							</div>

							<div className="col-12 col-sm-12 mt-1 mp__div10 mb-3">
								{firstSeason !== null && (
							        <div className="mp__div3">
							           {firstSeason.map((episode, index) => (
							             <div key={index} className="p-1 nav__div1" onClick={() => handleClick(episode, 'tv')}>
							             	<>
								            {episode.still_path ? (
								            	<img src={`https://image.tmdb.org/t/p/original${episode?.still_path}`} alt="netflix" className="sImg" />
											) : (
										    	<div className="sImg" style={{ border: "1px dotted grey" }}></div>
											)}
											<div className="ms-2" style={{ fontSize: '14px' }}>{episode.name}</div>
											</>
							             </div>
							           ))}
							        </div>
							    )}
							</div>

							<div className="col-12 col-sm-12 mt-1 mp__div2 mb-3">
								{episodeData !== null && (
							        <div className="mp__div3">
							           {episodeData.map((episode, index) => (
							             <div key={index} className="p-1 nav__div1" onClick={() => handleClick(episode, 'tv')}>
							             	<>
								            {episode.still_path ? (
								            	<img src={`https://image.tmdb.org/t/p/original${episode?.still_path}`} alt="netflix" className="sImg" />
											) : (
										    	<div className="sImg" style={{ border: "1px dotted grey" }}></div>
											)}
											<div className="ms-2" style={{ fontSize: '14px' }}>{episode.name}</div>
											</>
							             </div>
							           ))}
							        </div>
							    )}

							    {collection && (
							    	<div className="mp__div3">
							    		{collection
							    			.filter((episode) => selectedCollection === episode.id)
							    			.map((episode, index) => (
							    			<div key={index} className="p-1 nav__div3" onClick={() => handleClick(episode, 'movie')}>
								             	<>
										            {episode.backdrop_path ? (
										            	<img src={`https://image.tmdb.org/t/p/original${episode?.backdrop_path}`} alt="netflix" className="sImg" />
													) : (
										            	<img src={`https://image.tmdb.org/t/p/original${episode?.poster_path}`} alt="netflix" className="sImg" />
													)}
													<div className="ms-2" style={{ fontSize: '14px' }}>{episode.title}</div>
												</>
							             	</div>
							    		))}
							    	</div>
							    )}
							</div>

							<div className="col-12 col-sm-12 mt-1 mp__div9 justify-content-center mb-3">
								{firstSeason !== null &&
									firstSeason.map((episode, index) => (
										<div key={index} className="nav__div6" onClick={() => handleClick(episode, 'tv')}>
							             	<div className="col-1 text-center border-0 align-self-center" style={{ fontSize: '25px' }}>{episode.episode_number}</div>
							             	<div className="col text-center align-self-center border-0">
							             		{episode.still_path ? (
								            		<img src={`https://image.tmdb.org/t/p/original${episode?.still_path}`} alt="netflix" className="mImg" />
												) : (
											    	<div className="mImg" style={{ border: "1px dotted grey" }}></div>
												)}
							             	</div>
							             	<div className="col-9 d-flex flex-column justify-content-between border-0 p-2">
							             		<div className="d-flex flex-row justify-content-between align-items-center border-0" style={{ fontWeight: '600' }}>
							             			<div>{episode.name}</div>
							             			<div className="me-3">{episode.runtime}m</div>
							             		</div>
							             		<div style={{ fontSize: '13px' }}>
							             			{truncate(episode?.overview, 150)}
							             		</div>
							             	</div>
							            </div>
									))
								}
							</div>

							<div className="col-12 col-sm-12 mp__div6 justify-content-center mb-3">
								{episodeData !== null &&
									episodeData.map((episode, index) => (
										<div key={index} className="nav__div6" onClick={() => handleClick(episode, 'tv')}>
							             	<div className="col-1 text-center border-0 align-self-center" style={{ fontSize: '25px' }}>{episode.episode_number}</div>
							             	<div className="col text-center align-self-center border-0">
							             		{episode.still_path ? (
								            		<img src={`https://image.tmdb.org/t/p/original${episode?.still_path}`} alt="netflix" className="mImg" />
												) : (
											    	<div className="mImg" style={{ border: "1px dotted grey" }}></div>
												)}
							             	</div>
							             	<div className="col-9 d-flex flex-column justify-content-between border-0 p-2">
							             		<div className="d-flex flex-row justify-content-between align-items-center border-0" style={{ fontWeight: '600' }}>
							             			<div>{episode.name}</div>
							             			<div className="me-3">{episode.runtime}m</div>
							             		</div>
							             		<div style={{ fontSize: '13px' }}>
							             			{truncate(episode?.overview, 150)}
							             		</div>
							             	</div>
							            </div>
									))
								}

								{collection !== null &&
								  collection
								    .filter((episode) => selectedCollection === episode.id) 
								    .map((episode, index) => (
								      <div key={index} className="nav__div6" onClick={() => handleClick(episode, 'movie')}>
								        <div className="justify-content-start border-0">
								          {episode.backdrop_path ? (
								            <img src={`https://image.tmdb.org/t/p/original${episode?.backdrop_path}`} alt="netflix" className="mImg" />
								          ) : (
								            <div className="mImg" style={{ border: "1px dotted grey" }}></div>
								          )}
								        </div>
								        <div className="d-flex flex-column justify-content-between border-0 p-2">
								          <div className="d-flex flex-row justify-content-between align-items-center" style={{ fontWeight: '600' }}>
								            <div>{episode.title}</div>
								          </div>
								          <div style={{ fontSize: '13px' }}>
								            {truncate(episode?.overview, 150)}
								          </div>
								        </div>
								      </div>
								    ))
								}
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="container-fluid border-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '0 !important' }}>
					{similarMovies.length >= 1 && (
						<div className="row">
							<div className="col-12 col-sm-12 mb-3">
								<p className="mb-1" style={{ fontSize: '19px', fontWeight: '500' }}>More Like This</p>
								<hr />
							</div>
							<div className="col-12 col-sm-12 mp__div4">
								{similarMovies && (
									<>										
										{similarMovies.map((smovie, index) => (
											<div key={index} className="border-0 nav__div5" onClick={() => smClickHandler(smovie)}>
												{smovie?.backdrop_path && (
												  <img src={`https://image.tmdb.org/t/p/original${smovie?.backdrop_path}`} alt="netflix" className="sImg" />
												)}
												{!smovie?.backdrop_path && smovie?.poster_path && (
												  <img src={`https://image.tmdb.org/t/p/original${smovie?.poster_path}`} alt="netflix" className="sImg" />
												)}
											</div>
										))}
									</>
								)}
							</div>
							<div className="col-12 col-sm-12 mp__div7">
								{similarMovies && (
									<div className="mp__div8">										
										{similarMovies.map((smovie, index) => (
											<>
												{smovie?.backdrop_path && (
													<div key={index} className="border-0 nav__div7" onClick={() => smClickHandler(smovie)}>
														{smovie?.backdrop_path && (
														  <img src={`https://image.tmdb.org/t/p/original${smovie?.backdrop_path}`} alt="netflix" className="smImg" />
														)}
														{!smovie?.backdrop_path && (
															<div className="sImg" style={{ border: "1px dotted grey" }}></div>
														)}
														<div className="d-flex justify-content-between align-items-center mt-1 smText1">
															<div>
				        										{Math.round(smovie.vote_average) !== 0 && (
																  <span className="me-2 text-black" style={{ padding: '2px 5px', backgroundColor: '#0096FF', borderRadius: '5px', fontWeight: '700' }}>
																    {Math.round(smovie.vote_average)}+
																  </span>
																)}
																{smovie.hasOwnProperty('first_air_date')
					          										? new Date(smovie.first_air_date).getFullYear()
					          										: smovie.release_date
					            									? new Date(smovie.release_date).getFullYear()
					            									: ''
					        									}
				        									</div>
				        									<button className="btn border text-white" style={{ borderRadius: '50%' }}>+</button>
			        									</div>
			        									<div className="smText2">
			        										  	{smovie?.overview && truncate(smovie?.overview, 100)}
																{smovie?.name && smovie.name}
																{smovie?.original_name && smovie.original_name}
			        									</div>
													</div>
												)}
											</>
										))}
									</div>
								)}
							</div>
						</div>
					)}
					</div>
				</section>

				<footer>
					<div className="container-fluid" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '0 !important', height: '100px' }}>
						<div className="row">
							<div className="col-12 col-sm-12"></div>
						</div>
					</div>
				</footer>
			</>
			)}
		</div>
	);
}

export default MoviePart;
