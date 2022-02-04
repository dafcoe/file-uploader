export const dispatchCustomEvent = (target: EventTarget, name: string, payload: any = undefined) => {
  target.dispatchEvent(new CustomEvent(
    name,
    {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: payload,
    }
  ));
};

export const convertBytesToKilobytes = (bytes: number): number => {
  return +(bytes / 1024).toFixed(1);
};
