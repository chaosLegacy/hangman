import { FC } from "preact/compat"
import { KEYS } from "../constants"
import styles from './HangmanKeyboard.module.css'

type HangmanKeyboardProps = {
    activeLetter: string[],
    inactiveLetter: string[],
    addGuessedLetter: (letter: string) => void,
    disabled?: boolean,
}
const HangmanKeyboard: FC<HangmanKeyboardProps> = ({ activeLetter, inactiveLetter, addGuessedLetter, disabled }) => {
    return (
        <section style={{ alignSelf: 'stretch', maxHeight: '50vh'}}>
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
                gap: '.5rem'
            }}>
                {KEYS.map((key) => {
                    const isActive = activeLetter.includes(key)
                    const isInactive = inactiveLetter.includes(key)
                    return (
                        <button
                            key={key}
                            disabled={isInactive || isActive || disabled}
                            className={`${styles.btn} 
                            ${isActive ? styles.active : ''} ${isInactive ? styles.inactive : ''}`}
                            onClick={() => addGuessedLetter(key)}
                        >{key}</button>
                    )
                })}
            </div>
        </section>
    )
}

export default HangmanKeyboard