import { ApiError } from "../errors/apiError";
import { IUser } from "../interfaces/userInterface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", 422);
    }
    return user;
  }

  public async addUser(user): Promise<IUser> {
    await userRepository.create(user);
    return user;
  }

  public async deleteById(id: string) {
    const user = userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not exist");
    }

    await userRepository.deleteById(id);
    return user;
  }
}

export const userService = new UserService();
