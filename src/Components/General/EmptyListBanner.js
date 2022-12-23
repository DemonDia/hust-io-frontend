import React from 'react';

function EmptyListBanner({text}) {
    return (
        <div className="emptyBanner container">
            <h1 className='title is-3'>
                {text?<>{text}</>:<>There is nothing here.</>}
            </h1>
        </div>
    );
}

export default EmptyListBanner;