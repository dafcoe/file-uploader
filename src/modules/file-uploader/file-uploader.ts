import { BaseHTMLElement } from '../shared/base-html-element/base-html-element';
import { template } from './file-uploader.template';
import { style } from './file-uploader.style';
import { FileType } from '../shared/shared.type';
import { UploadFileList } from '../upload-file-list/upload-file-list';

export class FileUploader extends BaseHTMLElement {
  constructor(
    private rootElement: HTMLElement|undefined = undefined,
    private headingElement: HTMLHeadingElement|undefined = undefined,
    private uploadFileListElement: UploadFileList|undefined = undefined,
    private uploadUrl: string = '',
  ) {
    super(template, style);
  }

  connectedCallback(): void {
    this.initDOMElements();
    this.setInitialData();
    this.registerListeners();
  }

  disconnectedCallback() {
    this.unregisterListeners();
  }

  initDOMElements(): void {
    this.rootElement = this.shadowRoot?.querySelector('.fu') as HTMLElement;
    this.headingElement = this.rootElement?.querySelector('.fu__heading') as HTMLHeadingElement;
    this.uploadFileListElement = this.rootElement?.querySelector('upload-file-list') as UploadFileList;
  }

  setInitialData(): void {
    this.setHeading();
    this.setUploadUrl();
  }

  setHeading(): void {
    if (!this.headingElement) return;

    this.headingElement.textContent = this.getAttribute('data-title') || 'File Uploader';
  }

  setUploadUrl(): void {
    this.uploadUrl = this.getAttribute('data-upload-url') || '';
  }

  registerListeners(): void {
    this.registerSelfClickListener();
  }

  unregisterListeners(): void {
    this.unregisterSelfClickListener();
  }

  registerSelfClickListener(): void {
    this.addEventListener(
      'drop-area-input-change',
      (event) => this.onDropAreaInputChange(event as CustomEvent),
    );
  }

  unregisterSelfClickListener(): void {
    this.removeEventListener(
      'drop-area-input-change',
      (event) => this.onDropAreaInputChange(event as CustomEvent),
    );
  }

  onDropAreaInputChange({ detail: { files } }: CustomEvent): void {
    if (!this.uploadFileListElement || !this.uploadUrl.length) return;

    this.uploadFileListElement.addFiles(files);
    this.uploadFiles(files);
  }

  uploadFiles(files: FileType[]): void {
    files.forEach((file) => this.uploadFile(file));
  }

  uploadFile(file: FileType): void {
    const formData = new FormData();
    formData.append('file', file.file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.uploadUrl);
    xhr.upload.addEventListener('progress', (event: ProgressEvent) => this.onFileUploadProgress(file, event));
    xhr.send(formData);
  };

  onFileUploadProgress(file: FileType, { loaded, total }: ProgressEvent): void {
    file.uploadPercentage = Math.floor((loaded / total) * 100);
    this.uploadFileListElement?.updateFile(file);
  };
}
