import { DomainEvent } from "ddd-messaging-bus";

export interface FileUploadedProperties {
  userId: string;
  url: string;
}

export class FileUploaded extends DomainEvent<FileUploadedProperties> {
  constructor(props: FileUploadedProperties) {
    super(props);
  }
}
