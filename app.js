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
const getElement = (coordsArray) => {
  return elementsGrid$$[`${coordsArray[0]}-${coordsArray[1]}`]
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
      newRow$$.appendChild(span$$)
      elementsGrid$$ = {...elementsGrid$$, [span$$.id]: span$$} //easy access to html elements
    } 
    grid$$.appendChild(newRow$$)
  }
}

//compaires if any of the snake's body parts has the same coordinates of an element
const checkForSnake = (coordsArray) => {
  return snake.some(bodyPart => bodyPart.toString() === coordsArray.toString())
}

//*APPLE
const randomApple = (maxX, maxY) => {
  //new apple position on grid
  let positionY = randomNumber(0, maxY) 
  let positionX = randomNumber(0, maxX) 
  appleXY = [positionX, positionY]

  //cheack if the snake is in that position. if true repeat until false
  while (checkForSnake(appleXY)) {
    positionY = randomNumber(0, maxY) 
    positionX = randomNumber(0, maxX) 
    appleXY = [positionX, positionY]
  }
  
  console.log('apple: ' + positionX,positionY)
  grid[positionY][positionX] = "A"

  //paint apple
  const apple = getElement([positionX, positionY])
  apple.classList.add("apple")
  apple.textContent = "🍎"
}








//*SNAKE
//print snake head
let head$$
const printHead = () => {
  head$$ = getElement([head[0], head[1]])
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

//eat apple
const eatApple = () => {
  const apple = getElement(appleXY)
  apple.classList.remove("apple")
  apple.textContent = ""
  score += 5
  console.log("EAT APPLE +5pts!!!")
  randomApple(sizeGrid, sizeGrid)
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
    //update the array of coordenates of the snake's body parts.
    snake.unshift([head[0], head[1]])
    snake.pop()
    checkForSnake(appleXY) && eatApple()
    printHead()
  }, speed);
}

// it doesn't allow movement in the oposite direction to your current one.
document.onkeydown = (e) => {
  e = e || window.event;
  if (e.keyCode === 38) {
    currentDirection !== "down" ? currentDirection = "up" : console.log("wrong direction")
    console.log(currentDirection)
  } else if (e.keyCode === 40) {
    currentDirection !== "up" ? currentDirection = "down" : console.log("wrong direction")
    console.log(currentDirection)
  } else if (e.keyCode === 37) {
    currentDirection !== "right" ? currentDirection = "left" : console.log("wrong direction")
    console.log(currentDirection)
  } else if (e.keyCode === 39) {
    currentDirection !== "left" ? currentDirection = "right" : console.log("wrong direction")
    console.log(currentDirection)
  }
}






createGridArray(sizeGrid)
drawGrid(sizeGrid)
randomApple(sizeGrid, sizeGrid)
printHead()
// move(speed)