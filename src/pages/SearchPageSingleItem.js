import React from 'react';

const SearchPageSingleItem = (props) => {
    return(
        <li className="resultsList__singleItem">
            <img src={props.posterPath !== "" ? `https://image.tmdb.org/t/p/original${props.posterPath}` : "https://cdn.bestmoviehd.net/share/images/no-cover.png"} alt="Poster img" className="resultsList__image"/>
            <h3 className="resultsList__title">{props.movieTitle}</h3>
        </li>
    )
}

export default SearchPageSingleItem;
