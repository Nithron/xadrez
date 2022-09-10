import React, { useState, useEffect } from 'react'
import '../styles/Piece.css'
import blackBishop from '../images/black_bishop.svg'
import blackKing from '../images/black_king.svg'
import blackKnight from '../images/black_knight.svg'
import blackPawn from '../images/black_pawn.svg'
import blackQueen from '../images/black_queen.svg'
import blackRookie from '../images/black_rookie.svg'
import whiteBishop from '../images/white_bishop.svg'
import whiteKing from '../images/white_king.svg'
import whiteKnight from '../images/white_knight.svg'
import whitePawn from '../images/white_pawn.svg'
import whiteQueen from '../images/white_queen.svg'
import whiteRookie from '../images/white_rookie.svg'

const Piece = props => {
  const [piece, setPiece] = useState('')
  const [img, setImg] = useState(null)
  const funcs = {
    10: function () {
      setPiece('whitePawn')
      setImg(whitePawn)
    },
    11: function () {
      setPiece('blackPawn')
      setImg(blackPawn)
    },
    30: function () {
      setPiece('whiteKnight')
      setImg(whiteKnight)
    },
    31: function () {
      setPiece('blackKnight')
      setImg(blackKnight)
    },
    40: function () {
      setPiece('whiteBishop')
      setImg(whiteBishop)
    },
    41: function () {
      setPiece('blackBishop')
      setImg(blackBishop)
    },
    50: function () {
      setPiece('whiteRookie')
      setImg(whiteRookie)
    },
    51: function () {
      setPiece('blackRookie')
      setImg(blackRookie)
    },
    80: function () {
      setPiece('whiteQueen')
      setImg(whiteQueen)
    },
    81: function () {
      setPiece('blackQueen')
      setImg(blackQueen)
    },
    90: function () {
      setPiece('whiteKing')
      setImg(whiteKing)
    },
    91: function () {
      setPiece('blackKing')
      setImg(blackKing)
    }
  }

  useEffect(() => {
    funcs[props.piece]()
  }, [])

  useEffect(() => {
    funcs[props.piece]()
  }, [props.piece])

  return (
    <div className={props.piece} id={props.id}>
      <img src={img} alt={piece} id={props.id} />
    </div>
  )
}

export default Piece
