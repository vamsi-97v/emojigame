import {Component} from 'react'

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

class EmojiGame extends Component {
  constructor(props) {
    super(props)
    const {emojisList} = props

    this.state = {
      clickedEmojisList: [],
      isGameInProgress: true,
      topScore: 0,
      shuffledEmojisList: shuffleEmojis(emojisList),
    }
  }

  resetGame = () => {
    const {emojisList} = this.props

    this.setState({
      clickedEmojisList: [],
      isGameInProgress: true,
      shuffledEmojisList: shuffleEmojis(emojisList),
    })
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojisList.length}
        totalScore={emojisList.length}
      />
    )
  }

  clickEmoji = id => {
    const {emojisList} = this.props

    this.setState(previousState => {
      if (previousState.clickedEmojisList.includes(id)) {
        return {
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
        clickedEmojisList: nextClickedEmojisList,
        isGameInProgress: !isGameWon,
        topScore: isGameWon
          ? Math.max(previousState.topScore, nextClickedEmojisList.length)
          : previousState.topScore,
        shuffledEmojisList: shuffleEmojis(emojisList),
      }
    })
  }

  renderEmojisList = () => {
    const {shuffledEmojisList} = this.state

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(emojiObject => (
          <EmojiCard
            key={emojiObject.id}
            emojiDetails={emojiObject}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, isGameInProgress, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojisList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
