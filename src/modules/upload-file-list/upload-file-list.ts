import { BaseHTMLElement } from '../shared/base-html-element/base-html-element';
import { template } from './upload-file-list.template';
import { style } from './upload-file-list.style';
import { FileType } from '../shared/shared.type';

export class UploadFileList extends BaseHTMLElement {
  private rootElement: HTMLUListElement|undefined = undefined;

  private _files: FileType[] = [];

  constructor() {
    super(template, style);
  }

  set files(files: FileType[]) {
    this._files = files;
    this.renderFileList();
  }

  get files() {
    return this._files;
  }

  initDOMElements(): void {
    this.rootElement = this.shadowRoot?.querySelector('.ufl') as HTMLUListElement;
  }

  addFiles(files: FileType[]) {
    this.files = files;
    this.scrollToTop();
    this.renderFileList();
  }

  scrollToTop(): void {
    if (!this.rootElement) return;

    this.rootElement.scrollTop = 0;
  }

  renderFileList(): void {
    this.files.forEach((file) => {
      if (!this.isFileInList(file)) {
        this.addFileListItem(file);
      }
    });
  }

  isFileInList(file: FileType): boolean {
    const listItemElement = this.rootElement?.querySelector(`[data-id="${file.id}"]`);

    return !!listItemElement;
  }

  addFileListItem(file: FileType): void {
    this.rootElement?.prepend(this.createFileListItem(file));
  }

  createFileListItem(file: FileType): HTMLElement {
    const listItemElement = document.createElement('upload-file-list-item');

    listItemElement.setAttribute('class', 'ufli');
    listItemElement.setAttribute('data-id', file.id);
    listItemElement.setAttribute('data-name', file.file.name);
    listItemElement.setAttribute('data-size', `${file.file.size}`);
    listItemElement.setAttribute('data-upload-percentage', `${file.uploadPercentage}`);

    return listItemElement;
  }

  updateFile(updatedFile: FileType): void {
    this.files = this.files.map((file) => file.id === updatedFile.id ? file : updatedFile);

    const listItemElement = this.rootElement?.querySelector(`[data-id="${updatedFile.id}"]`);
    listItemElement?.setAttribute('data-upload-percentage', `${updatedFile.uploadPercentage}`);
  }

  connectedCallback(): void {
    this.initDOMElements();
  }
}
