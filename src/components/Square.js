import React, { useEffect } from 'react'
import '../styles/Square.css'
import Piece from './Piece'

const Square = props => {
  // const [possibleMove, setPossibleMove] = useState(0)

  // console.log(props.possibleMove)

  return (
    <div className={props.color + 'Square'} id={props.id}>
      {props.piece > 0 ? (
        props.possibleMove ? (
          <div className="possibleMove" key={1000} id={props.id}></div>
        ) : (
          <Piece piece={props.piece} id={props.id} key={props.index} />
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default Square
