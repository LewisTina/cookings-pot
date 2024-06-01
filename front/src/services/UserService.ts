import BaseService from "./BaseService";
import { UserUrl } from "./urls";

class UserServices {
  /* Get Requests */
  static getUserMe = () => BaseService.getRequest({
    url: UserUrl.AUTH_ME,
    required_auth: true
  })

  static getRecipes = () => BaseService.getRequest({
    url: UserUrl.RECIPE,
    required_auth: false
  })

  static getUserRecipes = () => BaseService.getRequest({
    url: `${UserUrl.RECIPE}/member`,
    required_auth: true
  })

  /* Post Requests */
  static login = (data: any) =>
    BaseService.postRequest({
      url: UserUrl.POST_LOGIN,
      body: data,
      required_auth: false
    });

  static register = (data: any) =>
    BaseService.postRequest({
      url: UserUrl.POST_REGISTER,
      body: data,
      required_auth: false
    });

  static createRecipe = (data: any) => 
    BaseService.postRequest({
      url: UserUrl.RECIPE,
      body: data,
      required_auth: true
    });

  /* Put Requests */
}

export default UserServices;
