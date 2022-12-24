const sizeGrid = 20
let grid = []
let score = 0
let currentDirection = ["x" , "y"]
let speed = 500
let snake = []
let head = snake[0]

directions = [
  {move: "up", x: 0, y: -1},
  {move: "down", x: 0, y: +1},
  {move: "right", x: +1, y: 0},
  {move: "left", x: -1, y: 0},
]

const grid$$ = document.querySelector("#grid")

//*DRAW GRID
const createGridArray = (size) => {
  for (let i = 0; i < size; i++) {
    const rowArray = []
    for (let j = 0; j < size; j++) {
      rowArray.push(0)
    }
    grid.push(rowArray)
  }
}

const drawGrid = (size) => {
  //rows
  for (let y = 0;  y < size; y++) {
    const newRow$$ = document.createElement("div")
    
    for (let x = 0; x < size; x++) {
        const span$$ = document.createElement("span")
        newRow$$.appendChild(span$$)
        span$$.id = `${y}-${x}`
        span$$.className = "empty"
        span$$
      } 
    grid$$.appendChild(newRow$$)
    newRow$$.id = `row-${y}`
  }
}







createGridArray(sizeGrid)
drawGrid(sizeGrid)