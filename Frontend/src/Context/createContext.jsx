import { createContext } from "react";

const dataContext = createContext({
    token: null,
    setToken: () => {},
    loading: true
});

export default dataContext;
