import React from 'react';

class PopContent extends React.Component {
    render() {
        return (
            <div className="content">
                <p className="title has-text-centered">關於我們</p>
                        <div className="control">
                            <button className="button" type="button" onClick={() => {this.props.close();}}>Cancel</button>
                        </div>
                    </div>
        );
    }
}

export default PopContent;