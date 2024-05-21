import { createContext, useState } from "react";

export const UserSession = createContext<any>(undefined);

export const UserSessionProvider: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState(undefined);
  
    return <UserSession.Provider value={{user, setUser}}>
      {children}
    </UserSession.Provider>
}