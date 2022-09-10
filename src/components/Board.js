import React, { useState, useEffect } from 'react'
import Square from './Square'
import '../styles/Board.css'
import {
  whitePawn,
  blackPawn,
  rookieMoves,
  queenMoves,
  bishopMoves,
  kingMoves,
  knightMoves
} from '../functions/moves.js'

const Board = () => {
  const [board, setBoard] = useState([
    51, 31, 41, 81, 91, 41, 31, 51, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 50, 30, 40, 80, 90, 40, 30, 50
  ])
  const [whiteToMove, setWhiteToMove] = useState(true)
  const [toMove, setToMove] = useState(null)
  const [piece, setPiece] = useState(null)
  const [whiteCanCastle, setWhiteCanCastle] = useState(true)
  const [blackCanCastle, setBlackCanCastle] = useState(true)
  const [moves, setMoves] = useState([])
  let auxBoard = [
    51, 31, 41, 81, 91, 41, 31, 51, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 50, 30, 40, 80, 90, 40, 30, 50
  ]

  function setAuxBoard() {
    auxBoard = [
      51, 31, 41, 81, 91, 41, 31, 51, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 50, 30, 40, 80, 90, 40, 30, 50
    ]
  }
  /* It's a switch statement that takes the id of the piece and the id of the square that the piece is
  being moved to. */
  const funcs = {
    10: function (pos) {
      setMoves(whitePawn(pos, board))
      //
    },
    11: function (pos) {
      setMoves(blackPawn(pos, board))
      //
    },
    30: function (pos) {
      setMoves(knightMoves(pos, board))
      //
    },
    31: function (pos) {
      setMoves(knightMoves(pos, board))
      //
    },
    40: function (pos) {
      setMoves(bishopMoves(pos, board))
      //
    },
    41: function (pos) {
      setMoves(bishopMoves(pos, board))
      //
    },
    50: function (pos) {
      setMoves(rookieMoves(pos, board))
      //
    },
    51: function (pos) {
      setMoves(rookieMoves(pos, board))
      //
    },
    80: function (pos) {
      setMoves(queenMoves(pos, board))
      //
    },
    81: function (pos) {
      setMoves(queenMoves(pos, board))
      //
    },
    90: function (pos) {
      setMoves(kingMoves(pos, board, whiteCanCastle))
      //
    },
    91: function (pos) {
      setMoves(kingMoves(pos, board, blackCanCastle))
      //
    }
  }

  useEffect(() => {
    console.log(board)
    auxBoard = [...board]
  }, [board])

  function clearMove() {
    board.forEach((e, i) => {
      if (e === 1) {
        auxBoard[i] = 0
      } else {
        auxBoard[i] = e
      }
    })
    setBoard(0)
    setBoard(auxBoard)
    setMoves([])
  }

  useEffect(() => {
    if (moves.length > 0) {
      moves.forEach(e => {
        if (auxBoard[e] == 0) {
          auxBoard[e] = 1
        }
      })
      // setBoard([])
      setBoard(auxBoard)
    }
  }, [moves])

  /**
   * "If the piece is a pawn, then call the pawn function, if it's a rook, then call the rook function,
   * etc."
   *
   * The pawn function is a switch statement that takes the id of the piece and the id of the square
   * that the piece is being moved to.
   *
   * The switch statement is a series of if statements that check if the piece is in the correct
   * position to move to the square that the piece is being moved to.
   *
   * If the piece is in the correct position, then the piece is moved to the square.
   *
   * If the piece is not in the correct position, then the piece is not moved.
   *
   * @param e - the event object
   */
  async function setMove(e) {
    let piece = board.filter((item, index) => {
      return index == e.target.id
    })
    funcs[piece](e.target.id)
  }

  /**
   * When a user clicks on a square, if the square is a valid move, the piece is moved to the square
   * and the square is cleared.
   */
  const handleClick = async e => {
    clearMove()
    console.log(whiteToMove)
    if (whiteToMove) {
      console.log(String(board[e.target.id])[1])
      if (
        String(board[e.target.id])[1] != '0' &&
        (moves.includes(board[e.target.id]) || board[e.target.id] != 1)
      ) {
        if (!capture(e)) {
          return
        }
      }
    } else {
      if (
        String(board[e.target.id])[1] != '1' &&
        (moves.includes(board[e.target.id]) || board[e.target.id] != 1)
      ) {
        console.log(String(board[e.target.id])[1])
        if (!capture(e)) {
          return
        }
      }
    }
    if (board[e.target.id] == 1 && !capture(e)) {
      if (piece == 11 && e.target.id >= 56) {
        auxBoard[e.target.id] = 81
      } else if (piece == 10 && e.target.id <= 7) {
        auxBoard[e.target.id] = 80
      } else if (piece == 90 && e.target.id == 62) {
        auxBoard[63] = 0
        auxBoard[62] = 90
        auxBoard[61] = 50
      } else if (piece == 90 && e.target.id == 58) {
        auxBoard[56] = 0
        auxBoard[58] = 90
        auxBoard[59] = 50
      } else if (piece == 91 && e.target.id == 6) {
        auxBoard[7] = 0
        auxBoard[6] = 91
        auxBoard[5] = 51
      } else if (piece == 91 && e.target.id == 2) {
        auxBoard[0] = 0
        auxBoard[2] = 91
        auxBoard[3] = 51
      } else {
        auxBoard[e.target.id] = piece
      }
      auxBoard[toMove] = 0
      setBoard(auxBoard)
      setWhiteToMove(whiteToMove => !whiteToMove)
    }
    if (capture(e)) {
      auxBoard[e.target.id] = auxBoard[toMove]
      auxBoard[toMove] = 0
      setBoard(auxBoard)
      if (piece == 51 || piece == 91) {
        setBlackCanCastle(false)
      }
      if (piece == 50 || piece == 90) {
        setWhiteCanCastle(false)
      }
      setWhiteToMove(whiteToMove => !whiteToMove)
    }
    if (board[e.target.id] > 2 && !capture(e)) {
      setPiece(board[e.target.id])
      setToMove(e.target.id)
      setMove(e)
      if (piece == 51 || piece == 91) {
        setBlackCanCastle(false)
      }
      if (piece == 50 || piece == 90) {
        setWhiteCanCastle(false)
      }
    }
    if (board[e.target.id] == 0) {
      setPiece(0)
    }

    // console.log(moves, moves.includes(Number(e.target.id)))
  }

  function capture(e) {
    if (
      (String(board[toMove])[1] == '0' || String(board[toMove])[1] == '1') &&
      (String(board[e.target.id])[1] == '0' ||
        String(board[e.target.id])[1] == '1') &&
      piece > 1 &&
      toMove != e.target.id
      // moves.includes(e.target.id)
    ) {
      console.log('teste')
      if (String(board[toMove])[1] != String(board[e.target.id])[1]) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  return (
    <div className="board">
      {board.map((item, index) => {
        let square = 'black'
        let coluna = 'par'

        if (
          (index >= 8 && index <= 15) ||
          (index >= 24 && index <= 31) ||
          (index >= 40 && index <= 47) ||
          (index >= 56 && index <= 63)
        ) {
          coluna = 'par'
        } else {
          coluna = 'impar'
        }
        if (coluna === 'impar') {
          if (index % 2 === 0) {
            square = 'white'
          } else {
            square = 'black'
          }
        } else {
          if (index % 2 === 0) {
            square = 'black'
          } else {
            square = 'white'
          }
        }
        // console.log(board)
        return (
          <div onClick={handleClick} id={index}>
            <Square
              key={index}
              color={square}
              id={index}
              piece={item}
              possibleMove={item == 1}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Board
