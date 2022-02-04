import { BaseHTMLElement } from '../shared/base-html-element/base-html-element';
import { template } from './upload-file-list-item.template';
import { style } from './upload-file-list-item.style';
import { convertBytesToKilobytes } from '../shared/shared.util';
import { iconCheck } from '../shared/shared.constant';

export class UploadFileListItem extends BaseHTMLElement {
  constructor(
    private rootElement: HTMLElement|undefined = undefined,
    private nameElement: HTMLDivElement|undefined = undefined,
    private sizeElements: HTMLDivElement[]|undefined = undefined,
    private percentageElements: HTMLDivElement[]|undefined = undefined,
    private percentageFillElement: HTMLDivElement|undefined = undefined,
    private statusIconHolderElement: HTMLDivElement|undefined = undefined,
  ) {
    super(template, style);
  }

  static get observedAttributes() {
    return ['data-upload-percentage'];
  }

  connectedCallback(): void {
    this.initDOMElements();
    this.setInitialData();
    this.registerListeners();
  }

  disconnectedCallback() {
    this.unregisterPercentageFillTransitionendListener();
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    if (name === 'data-upload-percentage') {
      this.onUploadPercentageChanged(newValue as string);
    }
  }

  initDOMElements(): void {
    this.rootElement = this.shadowRoot?.querySelector('.ufli') as HTMLElement;
    this.nameElement = this.rootElement?.querySelector('.ufli__name') as HTMLDivElement;
    this.sizeElements = [...this.rootElement?.querySelectorAll('.ufli__progress-size')] as HTMLDivElement[];
    this.percentageElements = [...this.rootElement?.querySelectorAll('.ufli__progress-percentage')] as HTMLDivElement[];
    this.percentageFillElement = this.rootElement?.querySelector('.ufli__progress-fill--over') as HTMLDivElement;
    this.statusIconHolderElement = this.shadowRoot?.querySelector('.ufli__status') as HTMLDivElement;
  }

  setInitialData(): void {
    this.setId();
    this.setName();
    this.setSize();
    this.setUploadPercentage();
  }

  setId(): void {
    this.rootElement?.setAttribute('id', this.getAttribute('data-id') || '');
  }

  setName(): void {
    if (!this.nameElement) return;

    const name = this.getAttribute('data-name') || '';

    this.nameElement.textContent = name;
    this.nameElement.setAttribute('title', name);
  }

  setSize(): void {
    if (!this.sizeElements) return;

    const size = convertBytesToKilobytes(+(this.getAttribute('data-size') || 0));

    this.sizeElements.forEach((sizeElement) => {
      sizeElement.textContent = `${size} KB`;
    });
  }

  setUploadPercentage(percentage: string|null = null): void {
    if (!this.percentageElements || !this.percentageFillElement) return;

    const uploadPercentage = percentage || this.getAttribute('data-upload-percentage') || '0';

    this.percentageElements.forEach((uploadPercentageElement) => {
      uploadPercentageElement.textContent = `${uploadPercentage}%`;
    });
    this.percentageFillElement.setAttribute('style', `width: ${uploadPercentage}%`)
  }

  onUploadPercentageChanged(percentage: string): void {
    this.setUploadPercentage(percentage);
  }

  registerListeners(): void {
    this.registerPercentageFillTransitionendListener();
  }

  registerPercentageFillTransitionendListener(): void {
    this.percentageFillElement?.addEventListener('transitionend', this.onPercentageFillTransitionend.bind(this))
  }

  unregisterPercentageFillTransitionendListener(): void {
    this.percentageFillElement?.removeEventListener('transitionend', this.onPercentageFillTransitionend.bind(this))
  }

  onPercentageFillTransitionend(): void {
    const uploadPercentage = this.getAttribute('data-upload-percentage') || '0';

    if (uploadPercentage === '100') {
      this.rootElement?.classList.add('ufli--loaded');

      if (this.statusIconHolderElement) {
        this.statusIconHolderElement.innerHTML = iconCheck;
      }
    }
  }
}
