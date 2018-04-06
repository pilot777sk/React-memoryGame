import React, { Component } from 'react';
import './App.css';
import puzzle from './puzzle.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import Card from './components/Card'

class App extends Component {
    state = {
        message: "Click a Puzzle Piece to begin!",
        topScore: 0,
        curScore: 0,
        puzzle: puzzle,
        unselectedPuzzle: puzzle
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectPuzzle = id => {
        const findPuzzle = this.state.unselectedPuzzle.find(item => item.id === id);

        if(findPuzzle === undefined) {
            
            this.setState({ 
                message: "Wrong Guess!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                puzzle: puzzle,
                unselectedPuzzle: puzzle
            });
        }
        else {
            
            const newPuzzle = this.state.unselectedPuzzle.filter(item => item.id !== id);
            
            this.setState({ 
                message: "You are correct!",
                curScore: this.state.curScore + 1,
                puzzle: puzzle,
                unselectedPuzzle: newPuzzle
            });
        }

        this.shuffleArray(puzzle);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.puzzle.map(piece => (
                        <Card
                            id={piece.id}
                            image={piece.image}
                            selectPuzzle={this.selectPuzzle} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
