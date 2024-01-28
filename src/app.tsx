// import { useState } from 'preact/hooks'

import { useCallback, useEffect, useState } from "preact/hooks"
import words from './assets/wordList.json'
import HangmanDrawing from "./components/HangmanDrawing"
import HangmanWord from "./components/HangmanWord"
import HangmanKeyboard from "./components/HangmanKeyboard"
import useKeyPress from "./hooks/useKeypress"

export function App() {
  const randomWord = () => words[Math.floor(Math.random() * words.length)]
  const [wordToGuess, setWordToGuess] = useState(randomWord())

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6 //BodyParts length
  const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  // Handle letter key press
  useKeyPress(
    (e) => {
      if (!e.key.match(/^[a-z]$/)) return; // Ignore everything except letters
      addGuessedLetter(e.key);
    },
    [guessedLetters]
  );

  // Handle Enter key press
  useKeyPress(
    (e) => {
      if (e.key !== 'Enter') return; // Ignore everything except Enter
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(randomWord());
    },
    [guessedLetters]
  );

  return (
    <>
      <div style={{
        maxWidth: '800px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
        zoom: 0.73
      }}>
        <div style={{ fontSize: '2rem', textAlign: 'center' }}>
          {isWinner && 'Winner - Refresh to try again!'}
          {isLoser && 'Nice try - Refresh to try again!'}
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} revealWord={isLoser} />
        <HangmanKeyboard
          activeLetter={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
          inactiveLetter={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isWinner || isLoser}
        />
      </div>
    </>
  )
}
