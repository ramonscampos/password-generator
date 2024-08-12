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
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    const generatePassword = () => {
        let characters = '';
        if (includeLowercase) characters += charactersLib.lowercase;
        if (includeUppercase) characters += charactersLib.uppercase;
        if (includeNumbers) characters += charactersLib.numbers;
        if (includeSymbols) characters += charactersLib.symbols;
    
        if (characters === '') {
          toast('Please select at least one character type', { type: 'error' })
          return;
        }
    
        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          generatedPassword += characters[randomIndex];
        }
    
        setPassword(generatedPassword);
      };

    return (
        <div className={styles.container}>
            <Input value={password} disabled />
            <span>Character length: {length}</span>
            <input type="range" min='6' max="16" value={length} onChange={(e) => setLength(Number(e.target.value))} />

            <div className={styles.checkRow}>
                <input type="checkbox" name="includeLowercase" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
                <label htmlFor="includeLowercase">Include Lowercase</label>
            </div>
            <div className={styles.checkRow}>
                <input type="checkbox" name="includeUppercase" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                <label htmlFor="includeUppercase">Include Uppercase</label>
            </div>
            <div className={styles.checkRow}>
                <input type="checkbox" name="includeNumbers" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                <label htmlFor="includeNumbers">Include Numbers</label>
            </div>
            <div className={styles.checkRow}>
                <input type="checkbox" name="includeSymbols" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                <label htmlFor="includeSymbols">Include Symbols</label>
            </div>
            
            <button onClick={generatePassword}>
                Generate
            </button>
        </div>
    )
}