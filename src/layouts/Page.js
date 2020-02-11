import React from 'react';  
import { Route, Switch } from 'react-router-dom';

import NewsPage from '../pages/NewsPage'
import NewsPageSingleMovie from '../pages/NewsPageSingleMovie'
import PopularPage from '../pages/PopularPage'
import PopularPageSingleMovie from '../pages/PopularPageSingleMovie'
import SearchPage from '../pages/SearchPage'
import MyListPage from '../pages/MyListPage'
import ErrorPage from '../pages/ErrorPage'


const Page = (props) => {
    return ( 
    
        <>
        <Switch>
            <Route path="/" exact component={() => <NewsPage apiKey={props.apiKey}/>} />
            <Route path="/news/:name" component={NewsPageSingleMovie}/>
            <Route path="/popular/:name" component={PopularPageSingleMovie}/>
            <Route path="/popular" component={() => <PopularPage apiKey={props.apiKey}/>} />
            <Route path="/search"  component={() => <SearchPage apiKey={props.apiKey}/>} />
            <Route path="/myList"  component={() => <MyListPage apiKey={props.apiKey}/>} />
            <Route component={ErrorPage} />
        </Switch>
        </>
     );
}
 
export default Page;