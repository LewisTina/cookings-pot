import Cookies from 'js-cookie'

export interface ServiceParams {
  url: string, 
  body?: any, 
  required_auth?: boolean
}


class Services {
  static getHeaders = (isFile?: boolean) => {
    let headers = new Headers();
    if (!isFile) {
      headers.append("Content-Type", "application/json");
    }
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*/*");
    headers.append("Credentials", "same-origin");
    return headers;
  };

  static getHeadersAuth = (isFile?: boolean) => {

    let headers = Services.getHeaders(isFile);
    let access_token = Cookies.get("credential")?.toString()
    if (access_token === null) {
      window.location.reload();
    }
    headers.append("Authorization", `Bearer ${access_token}`);
    return headers;
  };


  static getToken = () => {
    return Cookies.get("credential")?.toString();
  }
  
  static postRequest = async (data: ServiceParams) => {
    const {url, body, required_auth} = data
    let head = required_auth
      ? Services.getHeadersAuth()
      : Services.getHeaders();

    let headers: any = {
      method: "POST",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    };

    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };

  static putRequest = async (data: ServiceParams) => {
    const {url, body, required_auth} = data
    let head = required_auth
      ? Services.getHeadersAuth()
      : Services.getHeaders();

    let headers: any = {
      method: "PUT",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    };
    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };

  static deleteRequest = async (data: ServiceParams) => {
    const {url, body, required_auth} = data
    let head = required_auth
      ? Services.getHeadersAuth()
      : Services.getHeaders();

    let headers: any = {
      method: "DELETE",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    };
    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };

  static getRequest = async (data: ServiceParams) => {
    const {url, required_auth} = data
    let head = required_auth
      ? Services.getHeadersAuth()
      : Services.getHeaders();

    let headers: any = {
      method: "GET",
      headers: head,
      mode: "cors",
      cache: "default"
    };
    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };
}

export default Services;
