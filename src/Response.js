import React from 'react';
import './style/response.css';

function Response({response}) {

    return (
        <>
            {response ? <div className='responseBlock'>
                <span>
                {response}
                </span>
            </div> : null}
        </>
    );
}

export default Response;
