import { useState, useEffect, useReducer } from "react";
import Tippy from "@tippyjs/react";

// @emotion/css
import { css } from "@emotion/css";

// sito-components
import SitoContainer from "sito-container";
import SitoImage from "sito-image";

// components
import Loading from "../../../components/Loading/Screen";

// services
import { getNations } from "../../../services/data/get";

// contexts
import { useLanguage } from "../../../context/LanguageProvider";

// images
import flags from "../../../assets/images/nations/flags";

const SelectNation = () => {
  const { languageState } = useLanguage();

  const [loading, setLoading] = useState(true);

  const nationsReducer = (nationsState, action) => {
    const { type } = action;
    switch (type) {
      case "set": {
        const { newArray } = action;
        return newArray;
      }
      default:
        return [];
    }
  };

  const [nations, setNations] = useReducer(nationsReducer, []);
  const [active, setActive] = useState(0);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await getNations();
      const { data } = response;
      setNations({ type: "set", newArray: data.nations });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SitoContainer
      flexDirection="column"
      justifyContent="center"
      sx={{ margin: "auto", width: "335px" }}
    >
      <h1 className={css({ margin: 0, marginBottom: "20px" })}>
        {languageState.texts.SelectNation.Title}
      </h1>
      <Loading visible={loading} />
      {!loading ? (
        <SitoContainer
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", flexWrap: "wrap", gap: "20px" }}
        >
          {nations.map((item, i) => (
            <SitoContainer
              key={item.name}
              extraProps={{ onClick: () => setActive(i) }}
            >
              <Tippy content={item.name}>
                <SitoImage
                  src={flags[i]}
                  alt={item.name}
                  sx={{ width: "150px", height: "95px", cursor: "pointer" }}
                />
              </Tippy>
            </SitoContainer>
          ))}
        </SitoContainer>
      ) : null}
      {!loading ? (
        <SitoContainer>
          <ul>
            {nations[active].advantages.map((jtem) => (
              <li key={jtem}>{jtem}</li>
            ))}
          </ul>
          <button>
            
          </button>
        </SitoContainer>
      ) : null}
    </SitoContainer>
  );
};

export default SelectNation;
