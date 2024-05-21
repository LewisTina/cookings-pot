"use client"

import { createContext, useContext, useEffect, useState } from "react";
import AlertBanner, { AlertBannerProps } from "../components/ui/alert";

export type Alert = AlertBannerProps & {
    show?: boolean,
};

type AlertReturnType = 'CANCEL' | 'OK';

export type AlertContext = Alert & {
    promise?: { resolve: (value: AlertReturnType | PromiseLike<AlertReturnType>) => void, reject: (reason?: any) => void },
    returnCode?: AlertReturnType,
};

export const AlertContext = createContext<{state: AlertContext, setState: React.Dispatch<React.SetStateAction<AlertContext>>}>({state: {}, setState: ()=>{}});

export const AlertProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, setState] = useState<AlertContext>({});

    const { show, promise, returnCode } = state;

    useEffect(()=>{
        if (!show)
            promise?.resolve(returnCode??'CANCEL');
    }, [show, promise, returnCode]);
  
    useEffect(() => {
        if(show){
          setTimeout(() => {
            setState({...state, show: false})
          }, 20000);
        }
      }, [show, state])

    return (
        <AlertContext.Provider value={{state, setState}}>
            { 
                !!state.show ? 
                <AlertBanner 
                    status={state.status} 
                    message={state.message} 
                    onClose={()=>setState({...state, show: false})}
                /> : null
            }
            { children }
        </AlertContext.Provider>
    )
  }

export const useAlert = () => {
    const { setState, state } = useContext(AlertContext);
    return {
        isOpen: state.show,
        open: (options: AlertContext) =>
            new Promise<AlertReturnType>((resolve, reject) => {
                setState({...options, show: true, promise: { resolve: resolve, reject: reject }});
            }),
        close: (code?: AlertReturnType) => setState(p=>({...p, show: false, returnCode: code})),
    }
}