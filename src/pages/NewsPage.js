import React, { Component } from 'react';
import "../sass/newsPage.sass"

class NewsPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            popularFilms: [],
            activeMovieTitle: "",
            activeMovieDescribe: "",
            activeMoviePoster: ""
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
                activeMoviePoster: popularFilmsArr[0].poster_path})
            })

        .catch(err => console.log(err))
    }



    render() {
        return (  
            <div className="main__newsPage newsPage" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${this.state.activeMoviePoster}")`}}>
                <div className="newsPage__container">
                    <h3 className="newsPage__activeMovieTitle">{this.state.activeMovieTitle}</h3>
                    <h3 className="newsPage__activeMovieDesc">{this.state.activeMovieDescribe}</h3>
                    <button className="newsPage__button newsPage__button--more">More</button>
                    <button className="newsPage__button newsPage__button--myList">MyList</button>
                </div>
            </div>
        );
        }
}
 
export default NewsPage;
