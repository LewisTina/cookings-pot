import BaseService from "./BaseService";
import { UserUrl } from "./urls";

class UserServices {
  /* Get Requests */
  static getUserMe = () => BaseService.getRequest({
    url: UserUrl.AUTH_ME,
    required_auth: true
  })

  /* Post Requests */
  static login = (data: any) =>
    BaseService.postRequest({
      url: UserUrl.POST_LOGIN,
      body: data,
      required_auth: false
    });

  /* Put Requests */
}

export default UserServices;
