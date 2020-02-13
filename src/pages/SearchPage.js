import React,{Component} from 'react';
import SearchPageSingleItem from "./SearchPageSingleItem"

import "../sass/searchPage.sass"
class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state={
            activeMovieButton: true,
            activeTvButton: false,
            inputedValue: "",
            results: [],
        }
    }

    handleClickButton = () => {
        this.setState((prev) => ({activeMovieButton: !prev.activeMovieButton, activeTvButton: !prev.activeTvButton}))
    }

    handleClickSearchButton = () => {
        fetch(`http://api.themoviedb.org/3/search/${this.state.activeMovieButton ? "movie" : "tv"}?query=${this.state.inputedValue}&api_key=${this.props.apiKey}`)
        .then(resp => resp.json())
        .then(data => {
            const resultsArr = [];
            data.results.forEach(single => resultsArr.push(single));
            this.setState({results: resultsArr});
        })
        .catch(err => console.log(err))
    }

    render(){
        const singleResult = this.state.results.map(single => <SearchPageSingleItem key={single.id} posterPath={single.poster_path !== null ? single.poster_path : "" } movieTitle={single.title !== undefined ? single.title : single.original_name}/>)

        return (  
            <div className="main__searchPage searchPage">
                <div className="searchPage__container">
                    <div className="searchPage__buttonsContainer">
                        <button className={`searchPage__button searchPage__button--movie ${this.state.activeMovieButton ? "searchPage__button--active" : ""}`} onClick={this.handleClickButton}>Movie</button>
                        <button className={`searchPage__button searchPage__button--tv ${this.state.activeTvButton ? "searchPage__button--active" : ""}`} onClick={this.handleClickButton}>Tv</button>
                    </div>
                    <div className="searchPage__searchContainer">
                        <input type="text" className="searchPage__searchInput" value={this.state.inputedValue} onChange={(event) => this.setState({inputedValue: event.target.value})} onKeyUp={(event) => event.keyCode === 13 ? this.handleClickSearchButton() : ""}/>
                        <button className="searchPage__searchButton fas fa-search" onClick={this.handleClickSearchButton}></button>
                    </div>
                </div>
                <p className="searchPage__noResult">{this.state.results.length === 0 ? "No results" : ""}</p>
                <ul className="searchPage__resultsList resultsList">
                    {singleResult}
                </ul>
            </div>
        );
    }
}
 
export default SearchPage;