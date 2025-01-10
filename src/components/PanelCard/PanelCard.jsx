/* eslint-disable react/prop-types */
import { staticUrlPhoto } from "../../utils/utils";

// components
import Action from "./Action";
import Cost from "./Cost.jsx";

function PanelCard(props) {
  const { actions = [], name, description, id, image, costs, state, level, realLevel } = props;

  return (
    <article id={id} className="flex gap-4">
      <img
        src={staticUrlPhoto(image)}
        alt={name}
        width={144}
        height={144}
        className="w-36 object-cover rounded-lg"
      />
      <section className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h4 className="text-white text-xl">{name}</h4>
        </div>

        <div className="text-white" dangerouslySetInnerHTML={{ __html: description }} />
        {level || state ? (
          <div className="flex gap-3">
            {level ? <p className="text-white text-sm">{level}</p> : null}
            {state ? <p className="text-white text-sm">{state}</p> : null}
          </div>
        ) : null}
        <ul className="flex gap-5">
          {costs?.map((cost) => (
            <li key={cost.id}>
              <Cost {...cost} level={realLevel} />
            </li>
          ))}
        </ul>
        <ul className="flex mt-2 gap-5">
          {actions
            ?.filter((action) => !action.hidden)
            ?.map((action) => (
              <li key={action.id}>
                <Action {...action} />
              </li>
            ))}
        </ul>
      </section>
    </article>
  );
}

export default PanelCard;
