import { useAlert } from "../context/alert";

const useCheckResponse = () => {
    const { open: OpenAlert } = useAlert();
    
    return {
      getResponse: async (res: any) => {
        try {
          let data = await res.json();
          if(data) {
            OpenAlert({
                status: res.status,
                message: data.message_key,
            });
          }
          const response = {status: res.status, data: data}
          return response
        } catch (e) {
          OpenAlert({
            status: res.status,
            message: res.statusText
          })
          const response = {status: res.status, data: undefined}
          return response
        }
      }
    }
  }

  
  export default useCheckResponse