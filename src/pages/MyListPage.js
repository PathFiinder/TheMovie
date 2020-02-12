import React, { Component } from 'react';
import "../sass/myListPage.sass"
class MyListPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            myList: JSON.parse(localStorage.getItem("myList")) || []
        };
    }


    handleClickButton = (e) => {      
        e.preventDefault();
        const data= JSON.parse(localStorage.getItem("myList"))
        data.splice(e.target.parentElement.dataset.listid,1)
        localStorage.setItem("myList", JSON.stringify(data))
        this.setState({myList: data})
    }

    render(){

        const myListSingleItem = this.state.myList.map((single,id) => 
            <li className="listContainer__singleItem" data-listid={id} key={id}>
                <img src={`https://image.tmdb.org/t/p/original${single.image}`} alt="Poster img" className="listContainer__posterImage"/> 
                <h3 className="listContainer__movieTitle">{single.title}</h3>
                <button className="listContainer__button far fa-times-circle" onClick={this.handleClickButton}></button>
            </li>
        )

        return (  
            <div className="main__myListPage myListPage">
                <h2 className="myListPage__title">My watch List</h2>
                {this.state.myList.length !== 0 ? 
                    <ul className="myListPage__listContainer listContainer">
                        {myListSingleItem}
                    </ul>
                : <h3 className="myListPage__noItems">No items in My watch List</h3>}
            </div>
        );
    }
}
 
export default MyListPage;