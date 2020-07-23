let rows = document.getElementsByClassName(`row`)
let squares = document.getElementsByClassName(`square`)
let rowParagraph = document.getElementById(`rowParagraph`)
let columnParagraph = document.getElementById(`columnParagraph`)
let messageParagraph = document.getElementById(`messageParagraph`)

let selectedSquare = squares[Math.floor(Math.random() * squares.length)]
let turn = `row`
let total = {
  row: 0,
  column: 0
}

for (let square of squares) {
  if (square == selectedSquare) {
    square.classList.add(`selected`)
  }
  else {
    square.innerHTML = Math.floor(Math.random() * 21) - 10
  }

  square.addEventListener(`click`, clickSquare)
}

showChoices()

function showChoices() {
  let choiceAdded = false

  for (let i = -7; i <= 7; i++) {
    if (i != 0) {
      let neighbor

      if (turn == `row`) {
        neighbor = getNeighbor(selectedSquare, i, 0)
      }
      else {
        neighbor = getNeighbor(selectedSquare, 0, i)
      }

      if (neighbor != null && neighbor.innerHTML != ``) {
        neighbor.classList.add(`choice`)
        choiceAdded = true
      }
    }
  }

  return choiceAdded
}

function clickSquare() {
  if (this.classList.contains(`choice`)) {
    selectSquare(this)
    let choiceAdded = showChoices()

    if (!choiceAdded) {
      if (total.row > total.column) {
        messageParagraph.innerHTML = `Row wins!`
      }
      else if (total.column > total.row) {
        messageParagraph.innerHTML = `Column wins!`
      }
      else {
        messageParagraph.innerHTML = `Tie game`
      }
    }
  }
}

function selectSquare(square) {
  total[turn] += Number(square.innerHTML)
  rowParagraph.innerHTML = `Row: ${total.row}`
  columnParagraph.innerHTML = `Column: ${total.column}`

  square.innerHTML = ``
  clearChoices()

  selectedSquare.classList.remove(`selected`)
  selectedSquare = square
  selectedSquare.classList.add(`selected`)

  turn = turn == `row` ? `column` : `row`
}

function getNeighbor(square, xDiff, yDiff) {
  let row = square.parentElement // row of square
  let y // y coordinate of square, set below
  let x // x coordinate of square, set below

  // loop through rows to determine y
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] == row) {
      y = i // found matching row, so set y
    }
  }

  // loop through squares in row to determine x
  for (let i = 0; i < row.children.length; i++) {
    if (row.children[i] == square) {
      x = i // found matching square, so set x
    }
  }

  // row of neighbor square
  let neighborRow = rows[y + yDiff]

  if (neighborRow == null) {
    // row is beyond edge, so no neighbor square
    return null
  }
  else {
    // if x + xDiff is beyond edge, will be null
    return neighborRow.children[x + xDiff]
  }
}

function clearChoices() {
  for (let square of squares) {
    square.classList.remove(`choice`)
  }
}