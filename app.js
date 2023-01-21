import {
  removeElements,
  hasClass,
  randomNumber,
  threeDigitNumber,
  toggleClasses,
  getRandomItems,
  randomBoolean,
} from "./helpers.js";



const sizeGrid = 20
let grid = []
let score = 0
let currentDirection = "left"
let speed = 400
const snake = [[9,10]]
const head = snake[0]
let appleXY = []
let elementsGrid$$ = {}

// [0]=> row movement(x) | [1]=> column movement(y)
const directions = {
  "up": [0, -1],
  "down": [0, +1],
  "right": [+1, 0],
  "left": [-1, 0]
}

const grid$$ = document.querySelector("#grid")

//*OTHER USEFULL FUNCTIONS
const getElement = (x, y) => {
  return elementsGrid$$[`${x}-${y}`]
}

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
    newRow$$.id = `row-${y}`
    
    for (let x = 0; x < size; x++) {
      const span$$ = document.createElement("span")
      span$$.id = `${y}-${x}`
      span$$.className = "empty"
      newRow$$.appendChild(span$$)
      elementsGrid$$ = {...elementsGrid$$, [span$$.id]: span$$} //easy access to html elements
    } 
    grid$$.appendChild(newRow$$)
  }
}


const checkForSnake = ([positionCoords]) => {
  for (const part of snake) {
    part[0] === positionCoords[0] && part[1] === positionCoords[1] && console.log("true")
  }
}

//*APPLE
const randomApple = (maxX, maxY) => {
  //cheack first if the snake is in that position
  const positionY = randomNumber(0, maxY) 
  const positionX = randomNumber(0, maxX) 
  checkForSnake([positionX, positionY])
  console.log('apple: ' + positionX,positionY)
  grid[positionY][positionX] = "A"

  //paint apple
  const apple = getElement(positionX, positionY)
  apple.classList.replace("empty", "apple")
  apple.textContent = "🍎"
  appleXY = [positionX, positionY]
}








//*SNAKE
//print snake head
let head$$
const printHead = () => {
  head$$ = getElement(head[0], head[1])
  head$$.classList.add("head")
}

//check if the next position of the head is ouside of  the grid
//if true return de coords of the oposite wall
const checkWalls = (axis) => {
  const lastElement = sizeGrid - 1
  if (head[axis] < 0) {
    head[axis] = lastElement
  }
  if (head[axis] > lastElement) {
    head[axis] = 0
  }
}

const move = (speed) => {
  setInterval(() => {
    console.log(currentDirection)
    head$$.classList.toggle("head")
    //use the directions vectors to get the next id if the element where the head will be
    const x = directions[currentDirection][0]
    const y = directions[currentDirection][1]
    head[0] = head[0] + y   // head[0]-> column
    checkWalls(0)
    head[1] = head[1] + x   // head[1]-> row
    checkWalls(1)
    checkForSnake(appleXY)


    //update the array of coordenates of the snake's body parts.
    snake.unshift([head[0], head[1]])
    snake.pop()
    printHead()
  }, speed);
}

document.onkeydown = (e) => {
  e = e || window.event;
  if (e.keyCode === 38) {
    currentDirection = "up"
    console.log(currentDirection)
  } else if (e.keyCode === 40) {
    currentDirection = "down"
    console.log(currentDirection)
  } else if (e.keyCode === 37) {
    currentDirection = "left"
    console.log(currentDirection)
  } else if (e.keyCode === 39) {
    currentDirection = "right"
    console.log(currentDirection)
  }
}






createGridArray(sizeGrid)
drawGrid(sizeGrid)
randomApple(sizeGrid, sizeGrid)
printHead()
// move(speed)