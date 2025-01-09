/* eslint-disable react/prop-types */
import { staticUrlPhoto } from "../../utils/utils";

// components
import Action from "./Action";
import Cost from "./Cost.jsx";

function PanelCard(props) {
  const { actions = [], name, description, id, image, costs, state, level } = props;

  console.log(costs, level, state);

  return (
    <article id={id} className="flex gap-4">
      <img
        src={staticUrlPhoto(image)}
        alt={name}
        width={144}
        height={144}
        className="w-36 h-36 object-cover rounded-lg"
      />
      <section className="flex flex-col gap-2">
        <h4 className="text-white">{name}</h4>
        <div className="text-white" dangerouslySetInnerHTML={{ __html: description }} />
        <ul>
          {costs?.map((cost) => (
            <li key={cost.id}>
              <Cost {...cost} />
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
