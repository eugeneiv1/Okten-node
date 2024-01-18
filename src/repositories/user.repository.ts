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

  public async create(body: Partial<IUser>): Promise<IUser> {
    return await User.create(body);
  }

  public async deleteById(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }

  public async getById(id: string): Promise<IUser> {
    return await User.findOne({ _id: id });
  }
}

export const userRepository = new UserRepository();
