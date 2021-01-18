//宣告變數，const使用在識別值不回被重新指定-let在變數可能會被重新指定值//
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++//+1叫出下一題//
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')//把開始鍵藏起來//
  shuffledQuestions = questions.sort(() => Math.random() - .5)//箭頭函數，將問題以正負隨機排序，mathrandom提供一個0~1的數字//
  currentQuestionIndex = 0//從第一題開始//
  questionContainerElement.classList.remove('hide')//把問題框框叫出來//
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)//簡單地說就是將元素新增到指定的節點中//
  })
}

function resetState() {
  clearStatusClass(document.body)//背景顏色要重置//
  nextButton.classList.add('hide')//把nextbutton藏起來//
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)//remove the first child//
  }
}

function selectAnswer(e) {
  const selectedButton = e.target//點擊的東西//
  const correct = selectedButton.dataset.correct//正確答案//
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')//如果還有題目，叫出next按鈕//
  } else {
    startButton.innerText = 'Restart'//把內容改成restart//
    startButton.classList.remove('hide')//呈現restart button//
  }
}

function setStatusClass(element, correct) { 
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '誰跑得比較快?',
    answers: [
      { text: '河馬', correct: true },
      { text: '人類', correct: false }
    ]
  },
  {
    question: '獨角獸是哪一國的國獸？',
    answers: [
      { text: '台灣', correct: false },
      { text: '芬蘭', correct: false },
      { text: '蘇格蘭', correct: true },
      { text: '布吉納法索', correct: false }
    ]
  },
  {
    question: '誰可以從屁股呼吸?',
    answers: [
      { text: '隔壁同學', correct: false },
      { text: '烏龜', correct: true },
      { text: '大象', correct: false },
      { text: '青蛙', correct: false }
    ]
  },
  {
    question: '北極熊是左撇子還是右撇子?',
    answers: [
      { text: '左撇子', correct: true},
      { text: '右撇子', correct: false }
    ]
  } 
]