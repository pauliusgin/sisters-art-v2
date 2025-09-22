import { DomainEvent } from "ddd-messaging-bus";

export interface FileAttachedProperties {
  usageEntityId: string;
  fileUrl: string;
}

export class FileAttached extends DomainEvent<FileAttachedProperties> {
  constructor(props: FileAttachedProperties) {
    super(props);
  }
}
