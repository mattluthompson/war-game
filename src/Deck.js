import React from 'react';
import User from "./User";
import { getDefaultNormalizer } from '@testing-library/react';
import Card from './Card'

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            cards: [
                {value: "2", rank: 1},
                {value: "2", rank: 1},
                {value: "2", rank: 1},
                {value: "2", rank: 1},
                {value: "3", rank: 2},
                {value: "3", rank: 2},
                {value: "3", rank: 2},
                {value: "3", rank: 2},
                {value: "4", rank: 3},
                {value: "4", rank: 3},
                {value: "4", rank: 3},
                {value: "4", rank: 3},
                {value: "5", rank: 4},
                {value: "5", rank: 4},
                {value: "5", rank: 4},
                {value: "5", rank: 4},
                {value: "6", rank: 5},
                {value: "6", rank: 5},
                {value: "6", rank: 5},
                {value: "6", rank: 5},
                {value: "7", rank: 6},
                {value: "7", rank: 6},
                {value: "7", rank: 6},
                {value: "7", rank: 6},
                {value: "8", rank: 7},
                {value: "8", rank: 7},
                {value: "8", rank: 7},
                {value: "8", rank: 7},
                {value: "9", rank: 8},
                {value: "9", rank: 8},
                {value: "9", rank: 8},
                {value: "9", rank: 8},
                {value: "10", rank: 9},
                {value: "10", rank: 9},
                {value: "10", rank: 9},
                {value: "10", rank: 9},
                {value: "J", rank: 10},
                {value: "J", rank: 10},
                {value: "J", rank: 10},
                {value: "J", rank: 10},
                {value: "Q", rank: 11},
                {value: "Q", rank: 11},
                {value: "Q", rank: 11},
                {value: "Q", rank: 11},
                {value: "K", rank: 12},
                {value: "K", rank: 12},
                {value: "K", rank: 12},
                {value: "K", rank: 12},
                {value: "A", rank: 13},
                {value: "A", rank: 13},
                {value: "A", rank: 13},
                {value: "A", rank: 13}
            ],
            isShuffled: false,
            userDeck: [],
            compDeck: [],
            gameBegun: false,
            gamesWon: 0,
            gamesPlayed: 0,
            cardsInPlay: []
        }

        this.shuffleDeck = this.shuffleDeck.bind(this);
        this.dealDeck = this.dealDeck.bind(this);
        this.enterName = this.enterName.bind(this);
    }

    shuffleDeck(e){
        let deckToShuffle = this.state.cards;
        for(let i = 51; i > 0; i--){ //https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
            const j = Math.floor(Math.random() * i)
            const temp = deckToShuffle[i]
            deckToShuffle[i] = deckToShuffle[j]
            deckToShuffle[j] = temp
        }
        
        this.setState({
            cards: deckToShuffle,
            isShuffled: true
        })
    }

    enterName(){
        if(!this.state.userName) {
            const name = window.prompt("What's your name? ")

            this.setState({
            userName: name
            })
        }
    }

    dealDeck(e) {
        if(this.state.isShuffled){
            let firstDeck = []
            let secondDeck = []
            for(let i = 0; i<51; i = i + 2){
                firstDeck.push(this.state.cards[i])
            }

            for (let j = 1; j < 52; j = j + 2) {
                secondDeck.push(this.state.cards[j])
            }

            this.setState({
                userDeck: firstDeck,
                secondDeck: secondDeck,
                gameBegun: true
            })
        } else if(this.state.gameBegun) {
            alert('Game is already in play!')
        } else {
            alert('You must shuffle before the hands are dealt!')
        }
    }
    
    render() {
        this.enterName();

        if(!this.state.gameBegun){
            return(
                <div>
                    <h1>Shuffle the Deck to Start!</h1>
                    <button onClick = {this.shuffleDeck}>Shuffle Deck</button>
                    <button onClick = {this.dealDeck}>Deal Deck</button>
                    
                    {/* <User cards = {this.state.userDeck} isVisible = {this.state.gameBegun} isComputer = {false} />
                    <User cards = {this.state.compDeck} isVisible = {this.state.gameBegun} isComputer = {true} /> */}
                </div>
            );
        } else {
            return(
                <div>
                    <h1>Let's Play!</h1>
                    <button>War!</button>
                    <div>
                        <h2>{this.state.userName}</h2>
                        <Card />
                    </div>
                    <div>
                        <h2>Computer</h2>
                        <Card />
                    </div>
                </div>
            )
        }
    }
}

export default Deck;