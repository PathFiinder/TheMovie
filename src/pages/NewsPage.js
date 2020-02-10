import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import "../sass/newsPage.sass"

class NewsPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            popularFilms: [],
            activeMovieTitle: "",
            activeMovieDescribe: "",
            activeMovieBackDrop: "",
            activeMoviePoster: "",
            activeMovieId: 0,
            activeMovieVoteAverage: 0,
            activeMovieReleaseDate: "",
            firstId: 0,
            myList: JSON.parse(localStorage.getItem("myList")) || []
        }
    }

    componentDidMount = () => {
        const popularFilmsArr = [];
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.props.apiKey}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(data => {
            data.results.sort((a,b) => {
                const popularityA = a.popularity;
                const popularityB = b.popularity
                if(popularityA < popularityB) return 1;
                if(popularityA > popularityB) return -1;
                return 0;
            });
            data.results.forEach(item => popularFilmsArr.push(item));

            this.setState({popularFilms: popularFilmsArr, 
                activeMovieTitle: popularFilmsArr[0].title,
                activeMovieDescribe: popularFilmsArr[0].overview,
                activeMovieBackDrop: popularFilmsArr[0].backdrop_path,
                activeMoviePoster: popularFilmsArr[0].poster_path,
                activeMovieId: popularFilmsArr[0].id,
                activeMovieReleaseDate: popularFilmsArr[0].release_date,
                activeMovieVoteAverage: popularFilmsArr[0].vote_average,
                firstId: 0})
            })
        .catch(err => console.log(err))
    }


    handleClickMyList = () => {
        const myListActual = {"title": this.state.activeMovieTitle, "image": this.state.activeMovieBackDrop};
        const myList = this.state.myList;

        if(localStorage.getItem("myList") !== null){
            let exist = false;
            let id = 0
            
            myList.forEach((single,index) => {
                if(single.title === this.state.activeMovieTitle) {
                    exist = true;
                    id = index;
                } 
            })
           
            if(exist === true) myList.splice(id,1)
            else myList.push(myListActual)

            localStorage.setItem("myList",JSON.stringify(myList))
            this.setState({myList: myList})

        } else {
            myList.push(myListActual)
            localStorage.setItem("myList", JSON.stringify(myList))
            this.setState({myList: myList})
        }
        

    }

    


    handleClickBack = () => {
        if(this.state.firstId < 16){
            document.querySelector(`[data-id="${this.state.firstId}"]`).classList.remove('moviesContainer__singleItem--active')
            document.querySelector(`[data-id="${this.state.firstId + 4}"]`).classList.add('moviesContainer__singleItem--active')
            this.setState((prev) => ({firstId: prev.firstId + 1}))
        }
        
    }

    handleClickNext = () => {
        if(this.state.firstId > 0 && this.state.firstId <= 16){
            document.querySelector(`[data-id="${this.state.firstId + 3}"]`).classList.remove('moviesContainer__singleItem--active')
            document.querySelector(`[data-id="${this.state.firstId - 1}"]`).classList.add('moviesContainer__singleItem--active')
            this.setState((prev) => ({firstId: prev.firstId - 1}))
        }
        
    }


    render() {

        const moviesContainer = this.state.popularFilms.map((single,index) => 
            <li className={`moviesContainer__singleItem ${index <= 4 ? "moviesContainer__singleItem--active" : ""}`} data-id={index} key={single.id} onClick={() => {this.setState({activeMovieTitle: single.title,activeMovieBackDrop: single.backdrop_path, activeMovieDescribe: single.overview, activeMovieId: single.id, activeMoviePoster: single.poster_path,activeMovieReleaseDate: single.release_date, activeMovieVoteAverage: single.vote_average});}}>
                <img src={`https://image.tmdb.org/t/p/original${single.poster_path}`} alt="Movie img" className="moviesContainer__movieImage"/>
            </li>
        )

        const navLinkPropsPass = {"pathname": `/${this.state.activeMovieTitle}`, aboutProps: {"movieId": this.state.activeMovieId, "apiKey": this.props.apiKey, "posterPath": this.state.activeMoviePoster, "releaseDate": this.state.activeMovieReleaseDate, "voteAverage": this.state.activeMovieVoteAverage, "movieTitle": this.state.activeMovieTitle}}
       
        return (  
            <div className="main__newsPage newsPage" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${this.state.activeMovieBackDrop}")`}}>
                <div className="newsPage__container">
                    <h3 className="newsPage__activeMovieTitle">{this.state.activeMovieTitle}</h3>
                    <h3 className="newsPage__activeMovieDesc">{this.state.activeMovieDescribe}</h3>
                    <button className="newsPage__button newsPage__button--more"><NavLink to={navLinkPropsPass} className="newsPage__button--link">More</NavLink></button>
                    <button className="newsPage__button newsPage__button--myList" onClick={this.handleClickMyList}>MyList +</button>
                </div>
                <div className="newsPage__moviesContainer moviesContainer">
                    <button className={`moviesContainer__button moviesContainer__button--back ${this.state.firstId < 16 ? "moviesContainer__button--active" : ""} fas fa-angle-left`} onClick={this.handleClickBack}></button>
                        <ul className="moviesContainer__movieList">
                            {moviesContainer}
                        </ul>
                    <button className={`moviesContainer__button moviesContainer__button--next ${this.state.firstId > 0 ? "moviesContainer__button--active" : ""} fas fa-angle-right`} onClick={this.handleClickNext}></button>
                </div>
            </div>
        );
        }
}
 
export default NewsPage;
