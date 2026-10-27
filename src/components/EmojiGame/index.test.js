import {fireEvent, render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import EmojiGame from './index'

const emojisList = [
  {id: 1, emojiName: 'First emoji', emojiUrl: 'first.png'},
  {id: 2, emojiName: 'Second emoji', emojiUrl: 'second.png'},
  {id: 3, emojiName: 'Third emoji', emojiUrl: 'third.png'},
]

describe('EmojiGame', () => {
  it('ends the game after a repeated emoji and preserves the top score', () => {
    render(<EmojiGame emojisList={emojisList} />)

    fireEvent.click(screen.getByAltText('First emoji'))
    fireEvent.click(screen.getByAltText('First emoji'))

    expect(screen.getByText('You Lose')).toBeInTheDocument()
    expect(screen.getByText('1/3')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {name: 'Play Again'}))

    expect(screen.getByText('Score: 0')).toBeInTheDocument()
    expect(screen.getByText('Top Score: 1')).toBeInTheDocument()
  })

  it('wins after every emoji is clicked once and shows the actual list size', () => {
    render(<EmojiGame emojisList={emojisList} />)

    emojisList.forEach(({emojiName}) => {
      fireEvent.click(screen.getByAltText(emojiName))
    })

    expect(screen.getByText('You Won')).toBeInTheDocument()
    expect(screen.getByText('3/3')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {name: 'Play Again'}))

    expect(screen.getByText('Score: 0')).toBeInTheDocument()
    expect(screen.getByText('Top Score: 3')).toBeInTheDocument()
  })
})
