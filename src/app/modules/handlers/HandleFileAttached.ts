import { inject, injectable } from "inversify";
import { FileAttached } from "../../../messages";
import { EventHandler } from "ddd-messaging-bus";
import { DeleteUnusedUploads } from "../../../core";

@injectable()
export class HandleFileAttached implements EventHandler {
  constructor(
    @inject(DeleteUnusedUploads)
    private readonly _deleteUnusedUploads: DeleteUnusedUploads
  ) {}

  async handle(domainEvent: FileAttached): Promise<void> {
    const { usageEntityId } = domainEvent.props;

    await this._deleteUnusedUploads.execute({
      usageEntityId,
    });
  }
}
