import React from 'react';
import "../sass/errorPage.sass"

const ErrorPage = () => {
    return (  
        <div className="main__errorPage errorPage">
            <h2 className="errorPage__info">The page with the given URL does not exist</h2>
        </div>
    );
}
 
export default ErrorPage;