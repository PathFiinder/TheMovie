import React, {Component} from 'react';


import "../sass/popularPage.sass"
import PopularPageSingleItem from "./PopularPageSingleItem"
class PopularPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            popularMovieList: [],
            popularMovieActiveIndex: 1
            
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.props.apiKey}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(data => {
            const popularList = [];
            data.results.forEach((single,index) => popularList.push(single))
            this.setState({popularMovieList: popularList})
        })
        .catch(error => console.log(error))
    }

    handleClickDot = (e) => {
        e.preventDefault();
        const id = parseInt(e.target.dataset.dotid);
        document.querySelector(`[data-dotid="${this.state.popularMovieActiveIndex}"]`).classList.remove('dotList__dotButton--active')
        document.querySelector(`[data-dotid="${id}"]`).classList.add('dotList__dotButton--active')
        document.querySelector(`[data-id="${this.state.popularMovieActiveIndex}"]`).classList.remove('list__singleItem--active')
        document.querySelector(`[data-id="${id}"]`).classList.add('list__singleItem--active')
        this.setState({popularMovieActiveIndex: id})
    }

    render(){

        const popularPageSingleItem = this.state.popularMovieList.map((single,index) => <PopularPageSingleItem key={single.id} title={single.title} index={index+1} apiKey={this.props.apiKey} id={single.id} posterPath={single.poster_path} backPath={single.backdrop_path} releaseDate={single.release_date} voteAverage={single.vote_average} movieDesc={single.overview}/>)
        const dotList = this.state.popularMovieList.map((single,id) => <li key={id+1} className="dotList__singleItem"><button className={`dotList__dotButton ${id+1 === 1 ? "dotList__dotButton--active" : ""} far fa-circle`} data-dotid={id+1} onClick={this.handleClickDot}></button></li>)
        
        return (  
            <div className="main__popularPage popularPage">
                <h2 className="popularPage__title">Current popular movies</h2>
                <div className="popularPage__listContainer list">
                    {popularPageSingleItem}
                </div>
                <ul className="popularPage__dotList dotList">
                    {dotList}
                </ul>
            </div>
        );
    }
}
 
export default PopularPage;