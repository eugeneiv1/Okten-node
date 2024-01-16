import { IUser } from "../interfaces/userInterface";
import { read } from "../services/fs.service";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    const users = await read();
    return users;
  }
}

export const userRepository = new UserRepository();
