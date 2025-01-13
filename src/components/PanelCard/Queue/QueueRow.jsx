import { useTranslation } from "react-i18next";
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";

// providers
import { useGame } from "../../../providers/GameApiProvider";

function QueueRow(props) {
  const { t } = useTranslation();

  const { collection, entity, startedAt, endsAt, active, action, ...rest } = props;

  const gameData = useGame();

  const entityData = useMemo(() => {
    if (gameData) {
      const found = gameData[collection].find((ent) => ent.id === rest[entity][`${entity}Id`]);
      return found;
    }
  }, [collection, entity, gameData, rest]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        const now = new Date();
        const end = new Date(endsAt);
        const start = new Date(startedAt);
        const totalDuration = end - start;
        const elapsedTime = now - start;

        if (elapsedTime < 0) setProgress(0);
        else if (elapsedTime > totalDuration) setProgress(100);
        else {
          const newProgress = (elapsedTime / totalDuration) * 100;
          setProgress(newProgress);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [startedAt, endsAt, active]);

  return (
    <div className="w-full">
      <div className="text-white flex gap-1 text-sm">
        <p>{entityData?.name}</p> - <p>{t(`_game:${collection}.actions.${action}`)}</p> -{" "}
        <p>{Math.round(progress)}%</p>
      </div>
      <div className="w-full h-2 bg-white rounded-lg">
        <div
          className="h-2 bg-light-primary rounded-lg transition-all ease-in-out"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default QueueRow;
