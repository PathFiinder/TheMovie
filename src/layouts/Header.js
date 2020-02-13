import React from 'react';
import {NavLink} from 'react-router-dom'
import "../sass/header.sass"

const linkList = [
    {name: "News", className: "fas fa-star", path: "/", exact: true},
    {name: "Popular", className: "fas fa-fire", path: "/popular"},
    {name: "Search", className: "fas fa-search", path: "/search"},
    {name: "My List", className: "fas fa-list-ul", path: "/myList"}
]

const Header = () => {

    const handleClick = () => {
        const widthWindow = window.innerWidth;
        if(widthWindow < 568) {
            document.querySelector('.nav').classList.toggle('nav--active')
            document.querySelector('.header__barIcon').classList.toggle('fa-times')
        }
    }


    const singleItemList = linkList.map(item => 
        <li className="nav__item" key={item.name}>
            <NavLink to={item.path} exact={item.exact ? item.exact : false} className='nav__link' activeClassName='nav__link--active'>
                <div className="nav__linkContainer" onClick={handleClick}>
                    <span className={`nav__icon ${item.className}`}></span> 
                    <p className="nav__linkName">{item.name}</p>
                </div>
            </NavLink>
        </li>
    )

    return (  
        <>
        <NavLink to="/"><h1 className="header__title">TheMovie</h1></NavLink>
        <button className="header__barIcon fas fa-bars" onClick={handleClick}></button>
        <nav className="header__nav nav">
            <ul className="nav__list">
                {singleItemList}
            </ul>
        </nav>
        </>
    );
}
 
export default Header;