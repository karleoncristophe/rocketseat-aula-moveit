import { useContext } from "react";
import style from "../styles/components/Profile.module.css";
import { challengesContext } from "./contexts/ChallengesContexts";

export function Profile() {
  const { level } = useContext(challengesContext);
  return (
    <div className={style.profileContainer}>
      <img
        src="https://pbs.twimg.com/profile_images/1243007588997959680/2-Ql0K_f_400x400.jpg"
        alt="Karleon"
      />

      <div>
        <strong>Karleon Cristophe</strong>
        <p>
          <img
            src="icons/level-up.png"
            alt="level"
            style={{ width: "1rem", height: "1rem" }}
          />
          Level {level}
        </p>
      </div>
    </div>
  );
}
