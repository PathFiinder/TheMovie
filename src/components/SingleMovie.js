import React, {Component} from 'react';
import "../sass/singleMovie.sass"
import { Link } from 'react-router-dom';

class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailerUrl: ""
        };
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movieId}/videos?api_key=${this.props.apiKey}&language=en-US`)
        .then(resp => resp.json())
        .then(data => {
            let key = "";
            data.results.forEach(ele => {
                if(ele.type === "Trailer") key=ele.key
            })
            this.setState({trailerUrl: `https://www.youtube.com/embed/${key}`})
        })
        .catch(err => console.log(err))
    }

    render(){
        return ( 
            <div className="singleMovie" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${this.props.posterPath}")`}}>
                <button className="singleMovie__back"><Link to="/" className="singleMovie__back--text"><span className="singleMovie__back--icon fas fa-arrow-left"></span> Back</Link></button>
                <div className="singleMovie__container">
                    <div className="singleMovie__singleItem singleMovie__singleItem--first">
                        <i className="singleMovie__icon fas fa-star"></i>
                        <h3 className="singleMovie__voteAverage">{this.props.voteAverage} / 10</h3>
                    </div>
                    <div className="singleMovie__singleItem">
                        <h3 className="singleMovie__releaseDate">Release date: <span className="singleMovie__releaseDate--bold">{this.props.releaseDate}</span></h3>
                    </div>
                </div>
                <h2 className="singleMovie__title">{this.props.title}</h2>
                <p className="singleMovie__describe">{this.props.movieDesc}</p>
                <button className="singleMovie__buttonWatch" onClick={() => document.querySelector('.singleMovie__watchContainer').classList.add('singleMovie__watchContainer--active')}>Watch trailer</button>
                <div className="singleMovie__watchContainer">
                    <button className="singleMovie__iframeClose fas fa-times" onClick={() => document.querySelector('.singleMovie__watchContainer').classList.remove('singleMovie__watchContainer--active')}></button>
                    <iframe title="Official Trailer" src={this.state.trailerUrl.length !== 0 ? this.state.trailerUrl : ""} frameBorder="0" allowFullScreen className="singleMovie__iframe"></iframe>
                </div>
            </div>
        );
    }
}
 
export default SingleMovie;