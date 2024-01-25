import { Types } from "mongoose";

import { ITokenPair } from "./tokenPair.interface";

export interface IToken extends ITokenPair {
  _userId: Types.ObjectId;
}
