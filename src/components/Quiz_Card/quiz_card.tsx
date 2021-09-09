import "./quiz_card.css"
import React from "react"
import { Link } from "react-router-dom";

interface QUIZ_CARD_PROPS
{

}

const Quiz_card = (props:QUIZ_CARD_PROPS)=>
{
	return(
		<Link to="/123"className="card">
			Hello World
		</Link>
	);
}

export default Quiz_card;