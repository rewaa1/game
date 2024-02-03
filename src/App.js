import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardsImages = [
  { "src": "/img/helmet-1.png" , match: false },
  { "src": "/img/potion-1.png" , match: false },
  { "src": "/img/ring-1.png"   , match: false },
  { "src": "/img/scroll-1.png" , match: false },
  { "src": "/img/shield-1.png" , match: false },
  { "src": "/img/sword-1.png"  , match: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secChoice, setSecChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)


  // shuffling the cards
  const shuffleCards = () => {
    const shuffled = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
    
    setFirstChoice(null)
    setSecChoice(null)
    setCards(shuffled)
    setTurns(0)
  }

// handle choice
const handleChoice = (card) => {
  firstChoice ? setSecChoice(card) : setFirstChoice(card)
}

// compare the selected cardes 
useEffect(()=> {
  if( firstChoice && secChoice){
    setDisabled(true)
    if(firstChoice.src === secChoice.src){
      setCards(prevCard => {
        return prevCard.map(card => {
          if (card.src === firstChoice.src){
            return {...card, match: true }
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else{
      setTimeout(() => resetTurn(),1000) 
    }
  }
},[firstChoice, secChoice])

console.log(cards)

  // reseting choices & increase turn 
  const resetTurn = () => {
    setFirstChoice(null)
    setSecChoice(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  // starting the game automatically 

  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className="grid-card">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={ card === firstChoice || card === secChoice || card.match}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
