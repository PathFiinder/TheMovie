import React from 'react';

import SingleMovie from "../components/SingleMovie"

const PopularPageSingleMovie = ({location}) => {
    const props = location.aboutProps !== undefined ? location.aboutProps : ""
    return ( 
        props !== undefined ? 
        <>
            <SingleMovie title={props.movieTitle} 
                         apiKey={props.apiKey} 
                         movieId={props.movieId} 
                         posterPath={props.posterPath}
                         backDropPath={props.backDropPath}
                         releaseDate={props.releaseDate} 
                         voteAverage={props.voteAverage}
                         movieDesc={props.movieDesc}
                         prevPath={props.prevPath}
            />
        </> 
        : ""
    );
}
 
export default PopularPageSingleMovie;