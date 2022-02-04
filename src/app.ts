import { FileUploader } from './modules/file-uploader/file-uploader';
import { DropArea } from './modules/drop-area/drop-area';
import { UploadFileList } from './modules/upload-file-list/upload-file-list';
import { UploadFileListItem } from './modules/upload-file-list-item/upload-file-list-item';

customElements.define('file-uploader', FileUploader);
customElements.define('drop-area', DropArea);
customElements.define('upload-file-list', UploadFileList);
customElements.define('upload-file-list-item', UploadFileListItem);
