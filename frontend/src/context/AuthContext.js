
import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            console.log("coming here ")
            return { user: null} 
        default:
            return state       
    }
}

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(authReducer , {
        user: null
    })

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        dispatch({type:'LOGIN',payload:user})
      }
    },[])

    console.log("AuthContext state: ",state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}