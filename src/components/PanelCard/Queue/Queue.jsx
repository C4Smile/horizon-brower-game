/* eslint-disable react/prop-types */
import { useMemo } from "react";

// icons
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import QueueRow from "./QueueRow";

function Queue(props) {
  const { playerQueue, collection, entity } = props;

  const queue = useMemo(() => playerQueue?.data, [playerQueue?.data]);

  return (
    <section id="queue" className="w-full mb-5">
      {playerQueue?.isLoading ? (
        <FontAwesomeIcon icon={faSpinner} />
      ) : (
        <ul className="flex flex-col gap-3 w-full">
          {queue?.map((ele, i) => (
            <li key={ele.id} className="w-full">
              <QueueRow {...ele} entity={entity} active={i === 0} collection={collection} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Queue;
