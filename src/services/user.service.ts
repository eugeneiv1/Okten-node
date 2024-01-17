import { ApiError } from "../errors/apiError";
import { IUser } from "../interfaces/userInterface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }

  public async getById(id): Promise<IUser> {
    const users = await this.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new ApiError("User not found");
    }
    return users[index];
  }

  public async addUser(user): Promise<IUser> {
    const users = await this.getAll();
    user.id = users[users.length - 1].id + 1;
    users.push(user);
    await userRepository.updateUsers(users);
    return user;
  }

  public async deleteById(id) {
    const users = await this.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new ApiError("User not exist");
    }
    const deletedUser = users[index];
    users.splice(index, 1);
    await userRepository.updateUsers(users);
    return deletedUser;
  }
  public async test() {
    const data = await userRepository.test();
    return data;
  }
}

export const userService = new UserService();
