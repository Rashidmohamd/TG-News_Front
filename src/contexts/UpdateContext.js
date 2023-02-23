import {  createContext, useReducer } from "react";

export const DataContext = createContext();
const reducerFunc = (state, action) => {
    switch (action.type) {
        case "adding-new-data":
            return state.data ? { data: [action.paylaod, ...state.data] } : { data: action.paylaod }
        case "removed-one":
            return { data: state.data.filter(dat => dat._id !== action.palaod._id) };
        case 'update-data':
            return { data: [action.paylaod, ...state.data.filter(dat => dat._id !== action.paylaod._id)] };
        case "set-all-data":
            return state.data ? { data: [...state.data , ...action.paylaod] } : { data: action.paylaod };
        case "log-out":
            return { data: null };
        default:
            return state
    }
}
export const DataContextProvider = ({ children }) => {
    const [data, setData] = useReducer(reducerFunc, { data: null });
    return (
        <DataContext.Provider value={{data, setData }}>
            {children}
        </DataContext.Provider>
    )
}