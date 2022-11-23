export const userList = [
    // {
    //     name: "Sito",
    //     nation: "Spain",
    //     lastMessage: "Hola 👋🏻",
    //     lastConnection: "10:20 PM",
    //     state: true,
    //     numMsg: 5,
    //     id: 1,
    // },
    {
        name: "Jorge",
        nation: "Dutch",
        id: 4,
        lastMessage: "Que tal 😁",
        lastConnection: "12:00 AM",
        state: false,
        numMsg: 1,
        selected: false,
    },
    {
        name: "Jesus",
        nation: "England",
        id: 2,
        lastMessage: "Hi ✌🏻, que tal te encuentras hoy mi querido amigo!!!!",
        lastConnection: "4:15 AM",
        state: true,
        numMsg: 4,
        selected: true,
    },
    {
        name: "Carlos",
        nation: "French",
        id: 3,
        lastMessage: "Hallo 👋🏻",
        lastConnection: "12:00 AM",
        state: false,
        numMsg: 1,
        selected: false,
    },
];

export const messages = {
    "Sito[!]Carlos": [
        {
            sender: "Sito",
            reciever: "Carlos",
            message: "Hola",
            date: 1668975356534,
        },
        {
            sender: "Sito",
            reciever: "Carlos",
            message: "Este es un mensaje de prueba",
            date: 1668975356534,
        },
        {
            sender: "Carlos",
            reciever: "Sito",
            message: "Respondiendo a Sito",
            date: 1668975356534,
        },
    ],
    "Sito[!]Jorge": [
        {
            sender: "Sito",
            reciever: "Jorge",
            message: "Hola",
            date: 1668975356534,
        },
        {
            sender: "Sito",
            reciever: "Jorge",
            message: "Este es un mensaje de prueba",
            date: 1668975356534,
        },
        {
            sender: "Jorge",
            reciever: "Sito",
            message: "Respondiendo a Sito",
            date: 1668975356534,
        },
    ],
};
