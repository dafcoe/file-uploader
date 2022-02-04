import { BaseHTMLElement } from '../shared/base-html-element/base-html-element';
import { template } from './drop-area.template';
import { style } from './drop-area.style';
import { FileType } from '../shared/shared.type';
import { dispatchCustomEvent } from '../shared/shared.util';
import { nanoid } from 'nanoid';

export class DropArea extends BaseHTMLElement {
  constructor(
    private rootElement: HTMLFormElement|undefined = undefined,
    private inputElement: HTMLInputElement|undefined = undefined,
  ) {
    super(template, style);
  }

  connectedCallback(): void {
    this.initDOMElements();
    this.registerListeners();
  }

  disconnectedCallback() {
    this.unregisterListeners();
  }

  initDOMElements(): void {
    this.rootElement = this.shadowRoot?.querySelector('.da') as HTMLFormElement;
    this.inputElement = this.rootElement?.querySelector('.da__input') as HTMLInputElement;
  }

  registerListeners(): void {
    this.registerRootClickListener();
    this.registerInputChangeListener();
  }

  unregisterListeners(): void {
    this.unregisterRootClickListener();
    this.unregisterInputChangeListener();
  }

  registerRootClickListener(): void {
    this.addEventListener('click', this.onClickRoot.bind(this));
  }

  unregisterRootClickListener(): void {
    this.removeEventListener('click', this.onClickRoot.bind(this));
  }

  onClickRoot(): void {
    this.inputElement?.click();
  }

  registerInputChangeListener(): void {
    this.inputElement?.addEventListener('change', this.onChangeInput.bind(this));
  };

  unregisterInputChangeListener(): void {
    this.inputElement?.removeEventListener('change', this.onChangeInput.bind(this));
  };

  onChangeInput(): void {
    const files: FileType[] = [...this.inputElement?.files || []].map((file) => ({
      id: nanoid(),
      file,
      uploadPercentage: 0,
    }));

    if (!files.length) return;

    dispatchCustomEvent(this, 'drop-area-input-change' , { files });
    this.rootElement?.reset();
  };
}
