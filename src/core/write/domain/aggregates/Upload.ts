import { v4 } from "uuid";
import { FileStatus, FileType, FileUsage } from "../../../../messages";

export interface UploadProperties {
  id: string;
  userId?: string;
  fileType: FileType;
  url: string;
  token: string;
  path: string;
  usageEntityId?: string;
  usage: FileUsage;
  status: FileStatus;
}

export class Upload {
  createdAt = new Date();
  updatedAt = new Date();
  props: UploadProperties;

  constructor(props: UploadProperties) {
    this.props = props;
  }

  static readonly limitForEntity = 1;

  static restore(props: UploadProperties) {
    return new Upload(props);
  }

  static upload(payload: {
    userId: string;
    fileType: FileType;
    url: string;
    token: string;
    path: string;
    usage: FileUsage;
  }) {
    const { userId, fileType, url, token, path, usage } = payload;

    const upload = new Upload({
      id: v4(),
      userId,
      fileType,
      url,
      token,
      path,
      usage,
      status: FileStatus.PENDING,
    });

    return upload;
  }

  attach(usageEntityId: string) {
    this.props.usageEntityId = usageEntityId;
    this.props.status = FileStatus.ACTIVE;
  }
}
