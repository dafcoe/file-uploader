export class BaseHTMLElement extends HTMLElement {
  constructor(
    private template: string|null = null,
    private styling: string|null = null,
  ) {
    super();

    this.setup();
  }

  setup(): void {
    this.attachShadow({ mode: 'open' });
    this.addTemplate();
    this.addStyling();
  }

  addTemplate(): void {
    if (!this.template) return;

    this.addToShadow(this.template);
  }

  addStyling(): void {
    if (!this.styling) return;

    this.addToShadow(this.styling);
  }

  addToShadow(content: string): void {
    const element = document.createElement('template');

    element.innerHTML = content;
    this.shadowRoot?.appendChild(element.content.cloneNode(true));
  }
}
