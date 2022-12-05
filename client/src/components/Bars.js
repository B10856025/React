import React from 'react';
import { Link, BrowserRouter} from 'react-router-dom';

const Bars = () => {

    const onClick = () => {
        this.props.close();
    }

    return (
        <BrowserRouter>
            <div className="bar" >
                <p className="title has-text-centered">Content</p>
                    <ul >
                        <li className="bar square"><label className="label"><Link to="/" onClick={onClick}>二拾衣の首頁</Link></label></li>
                        <li className="bar square"><label className="label"><Link to="/Products" onClick={onClick}>二拾衣の衣物</Link></label></li>
                        <li className="bar square"><label className="label"><Link to="/Form" onClick={onClick}>回收衣物の表單</Link></label></li>
                    </ul>
                </div>
        </BrowserRouter>

    )
        
};

export default Bars;