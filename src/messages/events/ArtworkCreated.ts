import { DomainEvent } from "ddd-messaging-bus";

export interface ArtworkCreatedProperties {
  usageEntityId: string;
  fileUrl: string;
}

export class ArtworkCreated extends DomainEvent<ArtworkCreatedProperties> {
  constructor(props: ArtworkCreatedProperties) {
    super(props);
  }
}
