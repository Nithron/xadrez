export function whitePawn(pos, board) {
  let set = false

  if (Number(pos) >= 48 && Number(pos) <= 55) {
    set = [Number(pos) - 8, Number(pos) - 16]
  } else set = [Number(pos) - 8]

  if (board[Number(pos) - 8] > 9) {
    set = []
  } else if (board[Number(pos) - 16] > 9) {
    set = set.filter(e => {
      return e > Number(pos) - 16
    })
  }

  if (board[Number(pos) - 7] > 9) {
    set = [...set, Number(pos) - 7]
  }
  if (board[Number(pos) - 9] > 9) {
    set = [...set, Number(pos) - 9]
  }

  return set
}

export function blackPawn(pos, board) {
  let set = []
  if (Number(pos) >= 8 && Number(pos) <= 16) {
    set = [Number(pos) + 8, Number(pos) + 16]
  } else set = [Number(pos) + 8]

  if (board[Number(pos) + 8] > 9) {
    set = []
  } else if (board[Number(pos) + 16] > 9) {
    set = set.filter(e => {
      return e < Number(pos) + 16
    })
  }

  if (board[Number(pos) + 7] > 9) {
    set = [...set, Number(pos) + 7]
  }
  if (board[Number(pos) + 9] > 9) {
    set = [...set, Number(pos) + 9]
  }

  return set
}

export function rookieMoves(pos, board) {
  let set = []

  set = horizontalMove(Number(pos), board)

  return set
}

export function queenMoves(pos, board) {
  let set = []
  let auxH = horizontalMove(Number(pos), board)
  let auxD = diagonalMove(Number(pos), board)

  set = [...auxH, ...auxD]
  return set
}

export function bishopMoves(pos, board) {
  let set = []
  let auxD = diagonalMove(Number(pos), board)

  set = [...auxD]
  return set
}

export function kingMoves(pos, board, canCastle) {
  let line = getLine(pos)
  let column = getColumn(pos)
  let moves = [-1, -7, -8, -9, 1, 7, 8, 9]

  if (line == 1) {
    moves = moves.filter(e => {
      return e > -7
    })
  }
  if (line == 8) {
    moves = moves.filter(e => {
      return e < 7
    })
  }
  if (column == 8) {
    moves = moves.filter(e => {
      return e != 9 && e != 1 && e != -7
    })
  }
  if (column == 1) {
    moves = moves.filter(e => {
      return e != -9 && e != -1 && e != 7
    })
  }
  moves.forEach((e, i) => {
    moves[i] = Number(pos) + Number(e)
  })

  if (canCastle && board[Number(pos) + 1] == 0 && board[Number(pos) + 2] == 0) {
    moves.push(Number(pos) + 2)
  }

  if (
    canCastle &&
    board[Number(pos) - 1] == 0 &&
    board[Number(pos) - 2] == 0 &&
    board[Number(pos) - 3] == 0
  ) {
    moves.push(Number(pos) - 2)
  }
  invalidKingMove(pos, board, moves)

  return moves
}

export function knightMoves(pos) {
  let line = getLine(pos)
  let column = getColumn(pos)
  let moves = [-17, -15, -10, -6, 6, 10, 15, 17]

  if (line == 1) {
    moves = moves.filter(e => {
      return e > -6
    })
  }
  if (line == 2) {
    moves = moves.filter(e => {
      return e > -15
    })
  }
  if (line == 7) {
    moves = moves.filter(e => {
      return e < 15
    })
  }
  if (line == 8) {
    moves = moves.filter(e => {
      return e < 6
    })
  }
  if (column == 1) {
    moves = moves.filter(e => {
      return e != -17 && e != -10 && e != 6 && e != 15
    })
  }
  if (column == 2) {
    moves = moves.filter(e => {
      return e != -10 && e != 6
    })
  }
  if (column == 7) {
    moves = moves.filter(e => {
      return e != 10 && e != -6
    })
  }
  if (column == 8) {
    moves = moves.filter(e => {
      return e != 17 && e != 10 && e != -6 && e != -15
    })
  }
  moves.forEach((e, i) => {
    moves[i] = Number(pos) + Number(e)
  })

  return moves
}
function horizontalMove(pos, board) {
  let line = getLine(Number(pos))
  let column = getColumn(Number(pos))
  let set = []

  for (let i = 1; i < column; i++) {
    if (String(board[pos - 1 * i]).length > 1) {
      if (String(board[pos - 1 * i])[1] != String(board[pos])[1]) {
        set.push(pos - 1 * i)
        break
      } else {
        break
      }
    } else {
      set.push(Number(pos) - 1 * i)
    }
  }
  for (let i = 1; i < line; i++) {
    if (String(board[pos - 8 * i]).length > 1) {
      if (String(board[pos - 8 * i])[1] != String(board[pos])[1]) {
        set.push(pos - 8 * i)
        break
      } else {
        break
      }
    } else {
      set.push(pos - 8 * i)
    }
  }
  for (let i = 1; i <= 8 - column; i++) {
    if (String(board[pos + 1 * i]).length > 1) {
      if (String(board[pos + 1 * i])[1] != String(board[pos])[1]) {
        set.push(pos + 1 * i)
        break
      } else {
        break
      }
    } else {
      set.push(Number(pos) + 1 * i)
    }
  }
  for (let i = 1; i <= 8 - line; i++) {
    if (String(board[pos + 8 * i]).length > 1) {
      if (String(board[pos + 8 * i])[1] != String(board[pos])[1]) {
        set.push(Number(pos) + 8 * i)
        break
      } else {
        break
      }
    } else {
      set.push(Number(pos) + 8 * i)
    }
  }
  return set
}

function diagonalMove(pos, board) {
  let line = getLine(Number(pos))
  let column = getColumn(Number(pos))
  let set = []

  for (let i = 1; i <= 8 - column; i++) {
    if (String(board[pos - 7 * i]).length > 1) {
      if (String(board[pos - 7 * i])[1] != String(board[pos])[1]) {
        set.push(Number(pos) - 7 * i)
        break
      } else {
        break
      }
    } else {
      set.push(Number(pos) - 7 * i)
    }
  }
  for (let i = 1; i < column; i++) {
    if (String(board[pos - 9 * i]).length > 1) {
      if (String(board[pos - 9 * i])[1] != String(board[pos])[1]) {
        set.push(Number(pos) - 9 * i)
        break
      } else {
        break
      }
    } else {
      set.push(Number(pos) - 9 * i)
    }
  }
  for (let i = 1; i < column; i++) {
    if (String(board[pos + 7 * i]).length > 1) {
      if (String(board[pos + 7 * i])[1] != String(board[pos])[1]) {
        set.push(Number(pos) + 7 * i)
        break
      } else {
        break
      }
    } else {
      set.push(Number(pos) + 7 * i)
    }
  }
  for (let i = 1; i <= 8 - column; i++) {
    if (String(board[pos + 9 * i]).length > 1) {
      if (String(board[pos + 9 * i])[1] != String(board[pos])[1]) {
        set.push(Number(pos) + 9 * i)
        break
      } else {
        break
      }
    } else {
      set.push(Number(pos) + 9 * i)
    }
  }

  return set
}

function getLine(pos) {
  let row = 1
  if (Number(pos) / 8 < 1) {
    row = 1
  }
  if (Number(pos) / 8 < 2 && Number(pos) / 8 >= 1) {
    row = 2
  }
  if (Number(pos) / 8 < 3 && Number(pos) / 8 >= 2) {
    row = 3
  }
  if (Number(pos) / 8 < 4 && Number(pos) / 8 >= 3) {
    row = 4
  }
  if (Number(pos) / 8 < 5 && Number(pos) / 8 >= 4) {
    row = 5
  }
  if (Number(pos) / 8 < 6 && Number(pos) / 8 >= 5) {
    row = 6
  }
  if (Number(pos) / 8 < 7 && Number(pos) / 8 >= 6) {
    row = 7
  }
  if (Number(pos) / 8 < 8 && Number(pos) / 8 >= 7) {
    row = 8
  }
  return row
}

function getColumn(pos) {
  let column = 1
  if (String(pos % 8).split('.')[0] == 0) {
    column = 1
  }
  if (String(pos % 8).split('.')[0] == 1) {
    column = 2
  }
  if (String(pos % 8).split('.')[0] == 2) {
    column = 3
  }
  if (String(pos % 8).split('.')[0] == 3) {
    column = 4
  }
  if (String(pos % 8).split('.')[0] == 4) {
    column = 5
  }
  if (String(pos % 8).split('.')[0] == 5) {
    column = 6
  }
  if (String(pos % 8).split('.')[0] == 6) {
    column = 7
  }
  if (String(pos % 8).split('.')[0] == 7) {
    column = 8
  }

  return column
}

function invalidKingMove(pos, board, moves) {
  let hSquares = horizontalMove(Number(pos), board)
  let eRookie = false

  let colorKing = getColor(Number(pos), board)
  hSquares.forEach(item => {
    if (colorKing == 'white' && board[Number(item)]) {
      console.log('tem torre na reta', board[Number(item)])
    } else {
      console.log('nao tem torre na reta', board[Number(item)])
    }
    if (colorKing == 'black') {
      console.log('rei preto')
    }
  })

  console.log(hSquares)
}

function getColor(pos, board) {
  if (String(board[pos])[1] == '1') {
    return 'black'
  }
  if (String(board[pos])[1] == '0') {
    return 'white'
  }
} 
