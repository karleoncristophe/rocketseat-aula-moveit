//sempre que for criar um contexto com typeScript, use esse formato

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { challengesContext } from "./ChallengesContexts";

interface countdownContextData {}

interface CountdownProviderProps {
  children: ReactNode;
}

interface countdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  StartButton: () => void;
  resetCountDown: () => void;
}

export const countdownContext = createContext({} as countdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { starNewChallenge } = useContext(challengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setisActive] = useState(false);
  const [hasFinished, sethasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function StartButton() {
    setisActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setisActive(false);
    setTime(0.1 * 60);
    sethasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      sethasFinished(true);
      setisActive(false);
      starNewChallenge();
    }
  }, [isActive, time]);

  return (
    <countdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        StartButton,
        resetCountDown,
      }}
    >
      {children}
    </countdownContext.Provider>
  );
}
