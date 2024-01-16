import { IUser } from "../interfaces/userInterface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }
}

export const userService = new UserService();
