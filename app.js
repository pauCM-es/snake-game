const sizeGrid = 20
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

const drawGrid = (sizeGrid) => {
  //rows
  for (let y = 0;  y < sizeGrid; y++) {
    const newRow$$ = document.createElement("div")
    
    for (let x = 0; x < sizeGrid; x++) {
        const span$$ = document.createElement("span")
        newRow$$.appendChild(span$$)
        span$$.id = `${y}-${x}`
        span$$.className = "empty"
      }
      
    grid$$.appendChild(newRow$$)
    newRow$$.id = `row-${y}`
  
  }
}

drawGrid(sizeGrid)