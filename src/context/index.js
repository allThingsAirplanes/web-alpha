//context is what we are going to use for our global state. Context is shared between all that we have inside, called children. Context is shared with all the children of the context provider. 
//In React, children are any of the components inside of a component. So far, all of the components that we are writing are self-closing, meaning that they have no children. 

import {
    createContext
} from "react" 

export const userContext = createContext (null) 
export const UserProvider = userContext.Provider
//the provider is going to share all his state with his children
