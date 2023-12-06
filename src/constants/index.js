import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export default {
    asyncStorageKey: "NewsApp001",
    BASE_URL: "https://newsapplication-yoft.onrender.com/",

    //BASE_URL: "http://10.0.2.2:3000/",
    THEME: {
        primary: "#062743",
        secondary: "#182952",

        // colors
        black: "#1E1F20",
        white: "#FFFFFF",

        lightGray: "#1E1F20",
        lightGray2: "#F6F6F7",
        lightGray3: "#EFEFF1",
        lightGray4: "#F8F8F9",
        lightGray5: "#1E1F20",
    },
    MyLightTheme: {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: "#062743",
            secondary: "#182952",

            // colors
            black: "#1E1F20",
            white: "#FFFFFF",

            lightGray: "#1E1F20", // Najtamnija nijansa (tamno siva)
            lightGray2: "#444444", // Tamno siva
            lightGray3: "#555555", // Srednje tamno siva
            lightGray4: "#666666", // Svetlo tamno siva
            lightGray5: "#1E1F20",    
            //background: "lightblue",
        }
    },
}

