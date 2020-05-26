import React from 'react';
import User from "./User";
import { getDefaultNormalizer } from '@testing-library/react';
import Card from './Card'

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: 'Matt',
            cards: [
                {value: "2", rank: 1, alreadyPlayed: false},
                {value: "2", rank: 1, alreadyPlayed: false},
                {value: "2", rank: 1, alreadyPlayed: false},
                {value: "2", rank: 1, alreadyPlayed: false},
                {value: "3", rank: 2, alreadyPlayed: false},
                {value: "3", rank: 2, alreadyPlayed: false},
                {value: "3", rank: 2, alreadyPlayed: false},
                {value: "3", rank: 2, alreadyPlayed: false},
                {value: "4", rank: 3, alreadyPlayed: false},
                {value: "4", rank: 3, alreadyPlayed: false},
                {value: "4", rank: 3, alreadyPlayed: false},
                {value: "4", rank: 3, alreadyPlayed: false},
                {value: "5", rank: 4, alreadyPlayed: false},
                {value: "5", rank: 4, alreadyPlayed: false},
                {value: "5", rank: 4, alreadyPlayed: false},
                {value: "5", rank: 4, alreadyPlayed: false},
                {value: "6", rank: 5, alreadyPlayed: false},
                {value: "6", rank: 5, alreadyPlayed: false},
                {value: "6", rank: 5, alreadyPlayed: false},
                {value: "6", rank: 5, alreadyPlayed: false},
                {value: "7", rank: 6, alreadyPlayed: false},
                {value: "7", rank: 6, alreadyPlayed: false},
                {value: "7", rank: 6, alreadyPlayed: false},
                {value: "7", rank: 6, alreadyPlayed: false},
                {value: "8", rank: 7, alreadyPlayed: false},
                {value: "8", rank: 7, alreadyPlayed: false},
                {value: "8", rank: 7, alreadyPlayed: false},
                {value: "8", rank: 7, alreadyPlayed: false},
                {value: "9", rank: 8, alreadyPlayed: false},
                {value: "9", rank: 8, alreadyPlayed: false},
                {value: "9", rank: 8, alreadyPlayed: false},
                {value: "9", rank: 8, alreadyPlayed: false},
                {value: "10", rank: 9, alreadyPlayed: false},
                {value: "10", rank: 9, alreadyPlayed: false},
                {value: "10", rank: 9, alreadyPlayed: false},
                {value: "10", rank: 9, alreadyPlayed: false},
                {value: "J", rank: 10, alreadyPlayed: false},
                {value: "J", rank: 10, alreadyPlayed: false},
                {value: "J", rank: 10, alreadyPlayed: false},
                {value: "J", rank: 10, alreadyPlayed: false},
                {value: "Q", rank: 11, alreadyPlayed: false},
                {value: "Q", rank: 11, alreadyPlayed: false},
                {value: "Q", rank: 11, alreadyPlayed: false},
                {value: "Q", rank: 11, alreadyPlayed: false},
                {value: "K", rank: 12, alreadyPlayed: false},
                {value: "K", rank: 12, alreadyPlayed: false},
                {value: "K", rank: 12, alreadyPlayed: false},
                {value: "K", rank: 12, alreadyPlayed: false},
                {value: "A", rank: 13, alreadyPlayed: false},
                {value: "A", rank: 13, alreadyPlayed: false},
                {value: "A", rank: 13, alreadyPlayed: false},
                {value: "A", rank: 13, alreadyPlayed: false}
            ],
            isShuffled: false,
            userDeck: [],
            compDeck: [],
            gameBegun: false,
            gamesWon: 0,
            gamesPlayed: 0,
            cardsInPlay: [],
            userCurrentCard: 0,
            compCurrentCard: 1,
            winMessage: '',
            limboCards: []
        }

        this.shuffleDeck = this.shuffleDeck.bind(this);
        this.dealDeck = this.dealDeck.bind(this);
        this.enterName = this.enterName.bind(this);
        this.flipCard = this.flipCard.bind(this);
    }

    //this method shuffles the deck (game can't start until deck is shuffled)
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

    //requires user to enter name before starting
    enterName(){
        if(!this.state.userName) {
            const name = window.prompt("What's your name? ")

            this.setState({
            userName: name
            })
        }
    }

    //this deals the cards, alternating the deal between user and computer (TODO: combine w/ shuffle method)
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
                compDeck: secondDeck,
                gameBegun: true
            })
        } else if(this.state.gameBegun) {
            alert('Game is already in play!')
        } else {
            alert('You must shuffle before the hands are dealt!')
        }
    }

    //functionality of flipping cards
    flipCard(e) {
        const userCard = this.state.userDeck[0];
        const compCard = this.state.compDeck[0];
        let cardArray = [];

        userCard.alreadyPlayed = true;
        compCard.alreadyPlayed = true;

        cardArray.push(userCard);
        cardArray.push(compCard);

        cardArray = cardArray.concat(this.state.limboCards)

        const newUserDeck = this.state.userDeck.slice(1, this.state.userDeck.length);
        const newCompDeck = this.state.compDeck.slice(1, this.state.compDeck.length);

        //if user wins
        if(userCard.rank>compCard.rank){
            this.setState({
                cardsInPlay: cardArray,
                winMessage: "You won!",
                userDeck: newUserDeck.concat(cardArray),
                compDeck: newCompDeck,
                limboCards: []
            })
        } else if (userCard.rank<compCard.rank) { //if comp wins
            this.setState({
                cardsInPlay: cardArray,
                winMessage: "Computer won!",
                userDeck: newUserDeck,
                compDeck: newCompDeck.concat(cardArray),
                limboCards: []
            })
        } else { //if tie
            const userBurnCard = newUserDeck[0];
            const compBurnCard = newCompDeck[0];

            cardArray.push(userBurnCard);
            cardArray.push(compBurnCard);

            this.setState({
                limboCards: cardArray,
                cardsInPlay: cardArray,
                winMessage: "Tie!",
                userDeck: newUserDeck.slice(1, newUserDeck.legnth),
                compDeck: newCompDeck.slice(1, newCompDeck.length)
            })
        }

        if(this.state.userDeck[0].alreadyPlayed === true) {
            this.shufflePlayerHand(this.state.userDeck);
        }

        if(this.state.compDeck[0].alreadyPlayed === true) {
            this.shufflePlayerHand(this.state.compDeck);
        }
    }

    shufflePlayerHand(arr){
        alert(arr);
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
            if(this.state.cardsInPlay.length === 0) {
                return(
                    <div>
                        <h1>Let's Play!</h1>
                        <button onClick = {this.flipCard}>War!</button>
                    </div>
                )
            } else {
                return(
                    <div>
                        <h1>Let's Play!</h1>
                        <button onClick = {this.flipCard}>War!</button>
                        <div>
                            <h2>{this.state.userName}</h2>
                            <h3>Number of Cards: {this.state.userDeck.length}</h3>
                            <Card inPlay = {this.state.cardsInPlay[this.state.userCurrentCard]}/>
                        </div>
                        <div>
                            <h2>Computer</h2>
                            <h3>Number of Cards: {this.state.compDeck.length}</h3>
                            <Card inPlay = {this.state.cardsInPlay[this.state.compCurrentCard]}/>
                        </div>
                        <div>
                            {this.state.winMessage}
                        </div>
                    </div>
                )
            }
        }
    }
}

export default Deck;