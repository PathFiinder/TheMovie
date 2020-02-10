import React from 'react';
import { NavLink } from 'react-router-dom';

const PopularPageSingleItem = (props) => {
    const navLinkPropsPass = {"pathname": `news/${props.id}`, 
                              aboutProps: {"movieId": props.id, 
                                           "apiKey": props.apiKey, 
                                           "posterPath": props.posterPath, 
                                           "releaseDate": props.releaseDate, 
                                           "voteAverage": props.voteAverage, 
                                           "movieTitle": props.title, 
                                           "movieDesc": props.movieDesc}}
    return ( 
        <div className="list__singleItem">
            <span className="list__itemIndex">{props.index}</span>
            <h3 className="list__itemTitle">{props.title}</h3>
            <div className="list__itemImageContainer">
                <img src={`https://image.tmdb.org/t/p/original${props.posterPath}`} alt="Movie poster" className="list__itemSingleImage"/>
            </div>
            <button className="list__button"><NavLink to={navLinkPropsPass} className="list__button--link">More</NavLink></button>
        </div>
     );
}
 
export default PopularPageSingleItem;