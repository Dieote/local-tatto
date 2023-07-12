export class ImageModal {
  id: number;
  fileName: string;
  fileType: string;
  size: number;
  uuid: string;
  systemName: string;
  data: number[];
  imageUrl: string;
  constructor(
    id: number,
    fileName: string,
    fileType: string,
    size: number,
    uuid: string,
    systemName: string,
    data: number[],
    imageUrl: string
  ) {
    this.id = id;
    this.fileName = fileName;
    this.fileType = fileType;
    this.size = size;
    this.uuid = uuid;
    this.systemName = systemName;
    this.data = data;
    this.imageUrl = imageUrl;
  }
}
