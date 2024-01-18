import { IToken } from "../interfaces/token.interfaces";
import { Token } from "../token.model";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }
}

export const tokenRepository = new TokenRepository();
