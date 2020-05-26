import React from 'react';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards: this.props.cards,
            isComputer: this.props.isComputer,
            index: 25
        };
    }

    flipCards(){

    }

    render(){
        if(this.props.isVisible){
            return <h1>{this.state.cards.length}</h1>
        } else {
            return <h1>Shuffle the deck then deal the cards to begin.</h1>
        }
    }
}

export default User;