import React, {Component} from 'react';
import "../sass/popularPage.sass"
import PopularPageSingleItem from "../components/PopularPageSingleItem"
class PopularPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            popularMovieList: [],
            
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.props.apiKey}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(data => {
            const popularList = [];
            data.results.forEach((single,index) => {
                if(index <= 9){
                    popularList.push(single)
                }
            })
            this.setState({popularMovieList: popularList})
        })
        .catch(error => console.log(error))
    }

    render(){

        const popularPageSingleItem = this.state.popularMovieList.map((single,index) => <PopularPageSingleItem key={single.id} title={single.title} index={index+1} apiKey={this.props.apiKey} id={single.id} posterPath={single.poster_path} releaseDate={single.release_date} voteAverage={single.vote_average} movieDesc={single.overview}/>)

        return (  
            <div className="main__popularPage popularPage">
                <h2 className="popularPage__title">Current popular movies</h2>
                <div className="popularPage__listContainer list">
                    {popularPageSingleItem}
                </div>
            </div>
        );
    }
}
 
export default PopularPage;