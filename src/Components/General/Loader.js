import React from 'react';

function Loader({text}) {
    return (
        <div className="card loaderContainer">
            <h1 className='title is-3'>
                {text?<>{text}</>:<>Loading ...</>}
            </h1>
            <progress class="progress" 
            style={{ backgroundImage: "linear-gradient(to right, rgb(36, 36, 139) 30%, #ededed 30%)" }} max="100">30%</progress>

        </div>
    );
}

export default Loader;