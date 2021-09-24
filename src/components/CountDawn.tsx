import { useContext } from 'react'
import style from '../styles/components/CountDawn.module.css'
import {countdownContext} from '../components/contexts/CountdownContext'
let countdownTimeout: NodeJS.Timeout;
export function CountDawn() {
   
    const {minutes,
          seconds, 
          hasFinished, 
          isActive, 
          resetCountDown,
          StartButton
          } = useContext(countdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

   

    return (
     <div>
        <div className={style.countDownContainer}>

            <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
            </div>

            <span>:</span>

            <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
            </div>

        </div>
        { hasFinished ? (
             <button 
             disabled 
             className={ style.startCountDownButton }>

             Ciclo encerrado
                 
          </button>
        ) : (
            <>
            { isActive ? (
             <button 
             type="button" 
             className={ ` ${style.startCountDownButton} 
             ${style.startCountDownButtonActive}`} 
             onClick={resetCountDown}>

             Abadoar o ciclo
                  
             </button>
                ) : (
                <button type="button" className={style.startCountDownButton} onClick={StartButton}>

                Iniciar um ciclo

                </button>)}       
            </>
        )}

     </div>
    );
}