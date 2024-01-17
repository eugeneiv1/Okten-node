import { IUser } from "../interfaces/userInterface";
import { read, write } from "../services/fs.service";
import { User } from "../user.model";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    const users = await read();
    return users;
  }

  public async updateUsers(users: IUser[]) {
    await write(users);
  }

  public async test() {
    return await User.find({});
  }
}

export const userRepository = new UserRepository();
