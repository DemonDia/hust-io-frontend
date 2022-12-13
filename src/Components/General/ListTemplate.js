import React from 'react';

function ListTemplate({ListComponent,FormComponent}) {
    return (
        <div className="columns">
            {ListComponent}
            {FormComponent}
            {/* <props.ListComponent></props.ListComponent> */}
            
        </div>
    );
}

export default ListTemplate;