import { DomainEvent } from "ddd-messaging-bus";

export interface ArtworkUpdatedProperties {
  usageEntityId: string;
  fileUrl: string;
  previousFileUrl: string;
}

export class ArtworkUpdated extends DomainEvent<ArtworkUpdatedProperties> {
  constructor(props: ArtworkUpdatedProperties) {
    super(props);
  }
}
