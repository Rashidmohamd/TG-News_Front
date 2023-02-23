import { useReducer } from "react";
const comReducer = (state, action) => {
        switch (action.type) {
            case 'set-comments':
                return { coms: action.paylaod }
            case "adding-comment":
                return state.coms ? { coms: [action.paylaod, ...state.coms] } : { coms: action.paylaod }
            case 'delete-comment':
                return { coms: state.coms.filter(c => c._id !== action.paylaod._id) }
            case 'update-comment':
                return { coms: state.coms.filter(c => c._id !== action.paylaod._id) }
            default:
                return state
        }
}
const useComment = () => {
    const [coms, setComs] = useReducer(comReducer, { coms: null })
    return {coms,setComs};
}
 
export default useComment;