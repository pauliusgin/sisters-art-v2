import { GatewayFileInput, GatewayFileOutput } from "../../../../messages";

export interface StorageGateway {
  upload(input: GatewayFileInput): Promise<GatewayFileOutput>;

  delete(path: string): Promise<void>;
}
