import React from 'react';

import SingleMovie from "../components/SingleMovie"

const NewsPageSingleMovie = ({location}) => {
    const props = location.aboutProps !== undefined ? location.aboutProps : ""
    return ( 
        props !== undefined ? 
        <>
            <SingleMovie title={props.movieTitle} 
                         apiKey={props.apiKey} 
                         movieId={props.movieId} 
                         posterPath={props.posterPath}
                         releaseDate={props.releaseDate} 
                         voteAverage={props.voteAverage}
                         movieDesc={props.movieDesc}
            />
        </> 
        : ""
    );
}
 
export default NewsPageSingleMovie;