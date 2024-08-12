import { PassHash } from './components/passHash/PassHash';
import './style/global.scss'
import style from './style/home.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className={style.container}>
      <PassHash />
      <ToastContainer />
    </div>
  );
}

export default App;
