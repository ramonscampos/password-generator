import { Copy } from 'lucide-react';
import styles from './Input.module.scss';
import { toast } from 'react-toastify';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ value, ...props }: InputProps) => {
    
    const copyToClipBoard = () => {
        navigator.clipboard.writeText(value!.toString());
        toast('Password has been copied to your clipboard', { type: 'success'})
    }
    
    return (
        <div className={styles.container}>
            <input type="text" {...props} value={value} />
            <button disabled={!value} onClick={copyToClipBoard}>
                <Copy color='#333' size="18" />
            </button>
        </div>
    )
}