import { FC } from "preact/compat"

type HangmanWordProps = {
    guessedLetters: string[],
    wordToGuess: string,
    revealWord?: boolean,
}
const HangmanWord: FC<HangmanWordProps> = ({ guessedLetters, wordToGuess, revealWord = false }) => {
    return (
        <div style={{
            display: 'flex', gap: '.25em', fontSize: '6rem', fontWeight: 'bold',
            textTransform: 'uppercase', fontFamily: 'monospace'
        }}>
            {
                wordToGuess.split('').map((letter, index) => (
                    <span key={index} style={{ borderBottom: '.1em solid black' }}>
                        <span style={{
                            visibility: (guessedLetters.includes(letter) || revealWord) ? 'visible' : 'hidden',
                            color: !guessedLetters.includes(letter) && revealWord ? 'red' : 'black'
                        }}>{letter}</span>
                    </span>
                ))
            }
        </div>
    )
}

export default HangmanWord