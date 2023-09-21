import { Image } from "../models/Image";
export interface FetchImageUseCase {
  execute(): Promise<Image[]>;
}
