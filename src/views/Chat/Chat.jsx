import "./style.css";
import Navbar from "../../components/Navbar/Navbar";
import { userList } from "../../data/data";
import flags from "../../assets/images/nations/flags";
import { css } from "@emotion/css";
import { color, fontSize } from "@mui/system";

const Chat = () => {
    return (
        <main className="main-chat">
            <header className="chat-header"></header>
            <section className="chat-section">
                <aside className="user-aside">
                    <ul className="user-list">
                        {userList.map((user) => (
                            <li
                                key={user.id}
                                className="user-item"
                                datatype={user.selected ? "selected" : "not-selected"}
                            >
                                <div className="user-item__photo">
                                    <img src={user.photo || flags[user.nation]} alt={user.name} />
                                    <div
                                        className="user-item__state"
                                        datatype={user.state ? "active" : "not-active"}
                                    ></div>
                                </div>
                                <div className="user-item__info">
                                    <span className="user-item__name">{user.name}</span>
                                    <span className="user-item__last-msg">
                                        {user.lastMessage.length < 20
                                            ? user.lastMessage
                                            : user.lastMessage.substring(0, 20) + "..."}
                                    </span>
                                </div>
                                <div className="user-item__connection">
                                    <span className="user-item__last-con">
                                        {!user.state ? user.lastConnection : "En Linea"}
                                    </span>
                                    {!user.selected ? <span className="user-item__num-msg">{user.numMsg}</span> : <></>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </aside>

                <article className="chat-side">
                    <div className="chat-back"></div>
                    <div className="input-section">
                        <input type="text" />
                        <button>Enviar</button>
                    </div>
                </article>
            </section>
        </main>
    );
};

export default Chat;
