import { iconCloud } from '../shared/shared.constant';

export const template = `
  <form class="da">
    ${iconCloud}
    <div class="da__label">
      Browse Files to Upload
    </div>
    <input
      type="file"
      multiple
      class="da__input"
    >
  </form>
`;
