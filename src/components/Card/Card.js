import React from 'react';
import './Card.css';

const Card = props => (
	<div className='card col-lg-3 col-md-4 col-xs-6' onClick={() => props.pickCard(props.id)}>
		<img src={ props.image } alt={ props.name } className='cardImage img-thumbnail img-fluid' />
	</div>
);

export default Card;