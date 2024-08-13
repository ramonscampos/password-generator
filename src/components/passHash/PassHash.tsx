import { useState } from 'react';
import { Input } from '../input/Input';
import styles from './PassHash.module.scss';
import { toast } from 'react-toastify';

const charactersLib = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?',
}

export const PassHash = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(10);

    const [conditions, setConditions] = useState({
        includeLowercase: true,
        includeUppercase: false,
        includeNumbers: false,
        includeSymbols: false,
    });

    const generatePassword = () => {
        let characters = '';
        let guaranteedCharacters = [];

        if (conditions.includeLowercase) {
            characters += charactersLib.lowercase;
            guaranteedCharacters.push(charactersLib.lowercase[Math.floor(Math.random() * charactersLib.lowercase.length)]);
        }

        if (conditions.includeUppercase) {
            characters += charactersLib.uppercase;
            guaranteedCharacters.push(charactersLib.uppercase[Math.floor(Math.random() * charactersLib.uppercase.length)]);
        }

        if (conditions.includeNumbers) {
            characters += charactersLib.numbers;
            guaranteedCharacters.push(charactersLib.numbers[Math.floor(Math.random() * charactersLib.numbers.length)]);
        }

        if (conditions.includeSymbols) {
            characters += charactersLib.symbols;
            guaranteedCharacters.push(charactersLib.symbols[Math.floor(Math.random() * charactersLib.symbols.length)]);
        }

        if (characters === '') {
            toast('Please select at least one character type', { type: 'error' })
            return;
        }

        let generatedPassword = guaranteedCharacters.join('');

        for (let i = guaranteedCharacters.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            generatedPassword += characters[randomIndex];
        }

        // Shuffle the generated password to avoid predictable patterns
        generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

        setPassword(generatedPassword);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const activeCheckboxes = Object.values(conditions).filter(value => value).length;

        if (activeCheckboxes === 1 && !checked) {
            return;
        }

        setConditions({
            ...conditions,
            [name]: checked,
        });
    };

    return (
        <div className={styles.container}>
            <Input value={password} disabled />
            <span>Character length: {length}</span>
            <input type="range" min='6' max="16" value={length} onChange={(e) => setLength(Number(e.target.value))} />

            <div className={styles.checkRow}>
                <input type="checkbox" name="includeLowercase" checked={conditions.includeLowercase} onChange={handleCheckboxChange} />
                <label htmlFor="includeLowercase">Include Lowercase</label>
            </div>
            <div className={styles.checkRow}>
                <input type="checkbox" name="includeUppercase" checked={conditions.includeUppercase} onChange={handleCheckboxChange} />
                <label htmlFor="includeUppercase">Include Uppercase</label>
            </div>
            <div className={styles.checkRow}>
                <input type="checkbox" name="includeNumbers" checked={conditions.includeNumbers} onChange={handleCheckboxChange} />
                <label htmlFor="includeNumbers">Include Numbers</label>
            </div>
            <div className={styles.checkRow}>
                <input type="checkbox" name="includeSymbols" checked={conditions.includeSymbols} onChange={handleCheckboxChange} />
                <label htmlFor="includeSymbols">Include Symbols</label>
            </div>

            <button onClick={generatePassword}>
                Generate
            </button>
        </div>
    )
}