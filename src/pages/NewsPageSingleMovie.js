import React from 'react';

import SingleMovie from "../components/SingleMovie"

const NewsPageSingleMovie = ({location}) => {
    const props = location.aboutProps
    return ( 
        <>
            <SingleMovie title={props.movieTitle} 
                         apiKey={props.apiKey} 
                         movieId={props.movieId} 
                         posterPath={props.posterPath}
                         releaseDate={props.releaseDate} 
                         voteAverage={props.voteAverage}
            />
        </> 
    );
}
 
export default NewsPageSingleMovie;