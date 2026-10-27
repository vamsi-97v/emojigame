import {useState} from 'react'

import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

const shuffleEmojis = emojisList => {
  const shuffledEmojisList = [...emojisList]

  for (let index = shuffledEmojisList.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const emoji = shuffledEmojisList[index]
    shuffledEmojisList[index] = shuffledEmojisList[randomIndex]
    shuffledEmojisList[randomIndex] = emoji
  }

  return shuffledEmojisList
}

const EmojiGame = ({emojisList}) => {
  const [gameState, setGameState] = useState(() => ({
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
    shuffledEmojisList: shuffleEmojis(emojisList),
  }))

  const resetGame = () => {
    setGameState(previousState => ({
      ...previousState,
      clickedEmojisList: [],
      isGameInProgress: true,
      shuffledEmojisList: shuffleEmojis(emojisList),
    }))
  }

  const clickEmoji = id => {
    setGameState(previousState => {
      if (previousState.clickedEmojisList.includes(id)) {
        return {
          ...previousState,
          isGameInProgress: false,
          topScore: Math.max(
            previousState.topScore,
            previousState.clickedEmojisList.length,
          ),
        }
      }

      const nextClickedEmojisList = [...previousState.clickedEmojisList, id]
      const isGameWon = nextClickedEmojisList.length === emojisList.length

      return {
        ...previousState,
        clickedEmojisList: nextClickedEmojisList,
        isGameInProgress: !isGameWon,
        topScore: isGameWon
          ? Math.max(previousState.topScore, nextClickedEmojisList.length)
          : previousState.topScore,
        shuffledEmojisList: shuffleEmojis(emojisList),
      }
    })
  }

  const {
    clickedEmojisList,
    isGameInProgress,
    topScore,
    shuffledEmojisList,
  } = gameState

  return (
    <div className="app-container">
      <NavBar
        currentScore={clickedEmojisList.length}
        isGameInProgress={isGameInProgress}
        topScore={topScore}
      />
      <div className="emoji-game-body">
        {isGameInProgress ? (
          <ul className="emojis-list-container">
            {shuffledEmojisList.map(emojiObject => (
              <EmojiCard
                key={emojiObject.id}
                emojiDetails={emojiObject}
                clickEmoji={clickEmoji}
              />
            ))}
          </ul>
        ) : (
          <WinOrLoseCard
            isWon={clickedEmojisList.length === emojisList.length}
            onClickPlayAgain={resetGame}
            score={clickedEmojisList.length}
            totalScore={emojisList.length}
          />
        )}
      </div>
    </div>
  )
}

export default EmojiGame
