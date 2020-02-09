import React, { Component } from 'react';

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
            firstId: 0,
            myList: [],
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
                firstId: 0})
            })

        .catch(err => console.log(err))
    }


    handleClickMyList = () => {
        const myList = this.state.myList;
        const myListActual = {"title": this.state.activeMovieTitle, "image": this.state.activeMovieBackDrop};
        
        if(this.state.myList.length !== 0){
            let exist = false;
            this.state.myList.forEach(single => {
                if(single.title === this.state.activeMovieTitle) exist = true
            })
            if(exist !== true) myList.push(myListActual);
        } else {
            myList.push(myListActual);
        }
        
        localStorage.setItem("myList", JSON.stringify(myList))
        this.setState({myList: myList});
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
            <li className={`moviesContainer__singleItem ${index <= 4 ? "moviesContainer__singleItem--active" : ""}`} data-id={index} key={single.id} onClick={() => {this.setState({activeMovieTitle: single.title,activeMovieBackDrop: single.backdrop_path, activeMovieDescribe: single.overview})}}>
                <img src={`https://image.tmdb.org/t/p/original${single.poster_path}`} alt="Movie img" className="moviesContainer__movieImage"/>
            </li>
        )
       
        return (  
            <div className="main__newsPage newsPage" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${this.state.activeMovieBackDrop}")`}}>
                <div className="newsPage__container">
                    <h3 className="newsPage__activeMovieTitle">{this.state.activeMovieTitle}</h3>
                    <h3 className="newsPage__activeMovieDesc">{this.state.activeMovieDescribe}</h3>
                    <button className="newsPage__button newsPage__button--more">More</button>
                    <button className="newsPage__button newsPage__button--myList" onClick={this.handleClickMyList}>MyList </button>
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
