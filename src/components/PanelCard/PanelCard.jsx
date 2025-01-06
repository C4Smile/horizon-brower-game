/* eslint-disable react/prop-types */

// utils
import { staticUrlPhoto } from "../../utils/utils";

function PanelCard(props) {
  const { action, onClick, name, description, id, image } = props;

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
        <div className="flex">
          <button onClick={(e) => onClick(e, id)} type="button">
            {action}
          </button>
        </div>
      </section>
    </article>
  );
}

export default PanelCard;
