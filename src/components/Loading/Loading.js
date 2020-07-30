import React from 'react';
import LoadingGif from '../../Images/ICON/loading.gif'
const Loading = (props) => {
    return (
        <div>
            <div className="text-center col-12 py-5 my-5" style={{display: props.loading}}>
            <img src={LoadingGif} alt=""/>
        </div>
        </div>
    );
};

export default Loading;