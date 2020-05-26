import React from 'react';

class Card extends React.Component {
    render() {
        return(
            <p>{this.props.inPlay.value}</p>
        );
    }
}

export default Card;