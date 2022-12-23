import React from 'react';

function EmptyListBanner({text}) {
    return (
        <div className="emptyBanner">
            <h1 className='subtitle is-4'>
                {text?<>{text}</>:<>There is nothing here.</>}
            </h1>
        </div>
    );
}

export default EmptyListBanner;