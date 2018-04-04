import React, {Component} from 'react';
import './App.css';
import puzzle from './puzzle.json';
import ImgCard from './components/Card';
import {Container, Row, Navbar, NavbarBrand, Jumbotron} from 'reactstrap';

class App extends Component {
		constructor(props) {
				super(props);
				this.state = {
						characters,
						score: 0,
						highScore: 0,
						active: false
				};
		}
		shuffleCards() {
				const puzzle = this
						.state
						.puzzle
						.sort(() => 0.5 - Math.random());
				this.setState({puzzle});

		}
	
		pickCard = id => {
				let score = this.state.score;
				let highScore = this.state.highScore;
				const puzzle = this
						.state
						.puzzle
						.map(puzzlepiece => {
								if (id === puzzlepiece.id) {
										if (!puzzlepiece.clicked) {
												puzzlepiece.clicked = true;
												score = score + 1;
												if (highScore <= score) 
														highScore = score;
												}
										else {
												score = 0;
												// renderStatus();
												this.setState({
														puzzle: this.resetClicked()
												});
										}
								}
								this.setState({puzzle, score, highScore, active: true});
						});
				this.shuffleCards();

		}

		//Render Status
		renderStatus() {
				const score = this.state.score;
				const active = this.state.active;
				if (!active) {
						return (
								<div className="statusMessage">Click A Puzzle Piece To Begin!</div>
						);
				} else if (score === 0) {
						return (
								<div className="statusMessage" id="wrong">Wrong Guess!</div>

						);
				} else {
						return (
								<div className="statusMessage" id="correct">You Got It Right!</div>
						);
				}

		}

		resetClicked() {
				const puzzle = this
						.state
						.puzzle
						.map(puzzlepiece => puzzlepiece.clicked = false);
				this.setState({puzzle});
		}

		//Mount is similar to Document ready
		componentDidMount() {
				this.renderStatus();
				this.shuffleCards();
		}

		render() {
				return (
						<div>
								<Navbar fixed="top" className="text-white">
										<ul>
												<li>
														<NavbarBrand href="/">
																React Memory Game
														</NavbarBrand>
												</li>
												<li>
														{this.renderStatus()}
												</li>
												<li>
														<div>
																<span>Score: {this.state.score}</span>
																{" "}|{" "}
																<span>High Score: {this.state.highScore}</span>
														</div>
												</li>

										</ul>

								</Navbar>
								<Jumbotron>
										<Container>
												<h1>Memory Game</h1>
												<p>To earn points click on an Image, but only once!</p>
										</Container>
								</Jumbotron>
								<Container >
										<Row className="justify-content-around">
												{this
														.state
														.puzzle
														.map(puzzlepiece => <Card
																pickCard={this.pickCard}
																key={puzzlepiece.id}
																id={puzzlepiece.id}
																name={puzzlepiece.name}
																image={require(`${puzzlepiece.image}`)}/>)}
										</Row>
								</Container>
						</div>
				);
		}
}
export default App;
