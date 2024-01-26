import { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import './banner.css';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import Spinner2 from "./Spinner2";

function Banner3() {
	const [movie, setMovie] = useState(null);
  	const [videos, setVideos] = useState([]);
  	const [error, setError] = useState(null);
  	const [loading, setLoading] = useState(true);
  	const [isAudioMuted, setIsAudioMuted] = useState(true);

  	const base_url = "https://image.tmdb.org/t/p/original";

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

	        // Randomly select a movie
	        const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length - 1)];

	        // Set the selected movie
	        setMovie(randomMovie);

	        // console.log(randomMovie.id);

	        let tag = "movie";

	        if (randomMovie.media_type == 'tv') {
		        // Fetch videos for the selected movie
		        tag = "tv";
		    }

		    const videosResponse = await axios.get(`/${tag}/${randomMovie.id}/videos?language=en-US`, {
			    headers: {
				    accept: 'application/json',
				    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzOGRlNzRlYTUwZDRkNDE5Mzk0OTM0OTczYTA0MCIsInN1YiI6IjY1OWUyYzkzOGU4ZDMwMDE0YzIwMjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0rTluAv1sY7ne6WtCShIY8TfJIsx7HQ6FajTpbXC-w'
				},
		    });

		    // Set the videos for the selected movie
		    setVideos(videosResponse.data.results[0].key);
		    // console.log(videosResponse.data.results[0].key);
		    setLoading(false);
	        setError(null); // Reset error state if successful
	      } catch (error) {
	        console.error('Error fetching data:', error);
	        setError('Error fetching data. Please try again.'); // Set error state
	        setLoading(false);
	      }
	    }

	    fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

  	// Rest of your component logic...

  	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	if (loading) {
    	return <Spinner2 />;
  	}

	if (error) {
	  return <div>Error: {error}</div>;
	}

	const dynamicSrc = `https://www.youtube.com/embed/${videos}?autoplay=1&mute=1&controls=0`;

	return (
		<header className="banner">
			{videos.length === 0 ? (
			  	<div
				    className="banner__background-image"
				    style={{
				      backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
				      backgroundSize: 'cover',
				      backgroundPosition: 'center',
				      width: '100%',
				      height: '100%',
				    }}
			  	/>
			) : (
					<ReactPlayer 
			            url={dynamicSrc}
			            className="banner__video"
			            width="100%"
			            height="100%"
			            loop={true}
			            playsinline={true}
			            volume={0.5}
			            muted={isAudioMuted}
			            playing={true}
			            config={{ youtube: { playerVars: { disablekb: 1 } } }}
			            fullscreen="true"
	          		/>
				)
			}

			<div className="banner__contents">
				<h1 className="banner__title">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>

				<div className="banner__buttons">
					<Link to="/v1/play/?url=" className="btn banner__button1 text-uppercase text-white ms-2" style={{ textDecoration: 'none' }}>
						<i className="fa-solid fa-play me-2" style={{ color: '#FFFFFF' }}></i>
						play
					</Link>
					<button className="banner__button text-capitalize">My List</button>
					<button
						className="btn banner__button2 audio-button border-0"
						onClick={() => setIsAudioMuted((prevMuted) => !prevMuted)}
					>
						{isAudioMuted ? (
						    <i className="fa-solid fa-volume-xmark" style={{ color: '#00000' }}></i>
						) : (
						    <i className="fa-solid fa-volume-high" style={{ color: '#00000' }}></i>
						)}
					</button>
				</div>

				<h1 className="banner__description">
					{truncate(movie?.overview, 150)}
				</h1>
			</div>

			<div className="banner--fadeBottom" />
		</header>
	);
}

export default Banner3;