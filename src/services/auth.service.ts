
import { ApiError } from "../errors/apiError";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { User } from "../user.model";
import { passwordService } from "./passord.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(userInfo) {
    const hashedPwd = await passwordService.hash(userInfo.password);
    return await userRepository.create({ ...userInfo, password: hashedPwd });
  }

  public async signIn(inputInfo) {
    const user = await User.findOne({ email: inputInfo.email });
    if (!user) {
      throw new ApiError("Mail or password incorrect");
    }

    const isValid = await passwordService.compare(
      inputInfo.password,
      user.password,
    );

    if (!isValid) {
      throw new ApiError("Mail or password incorrect");
    }

    const tokens = tokenService.generateTokenPair({ userId: user._id });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return tokens;
  }
}

export const authService = new AuthService();
