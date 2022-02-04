import {
  iconFile,
  iconSync,
} from '../shared/shared.constant';

export const template = `
  <li class="ufli">
    <div class="ufli__icon">
      ${iconFile}
      <div class="ufli__status">
        ${iconSync}
      </div>
    </div>

    <div class="ufli__content">
      <div class="ufli__name"></div>
      <div class="ufli__progress">
        <div class="ufli__progress-fill">
          <div class="ufli__progress-info">
            <div class="ufli__progress-size"></div>
            <div class="ufli__progress-percentage"></div>
          </div>
        </div>
        <div class="ufli__progress-fill ufli__progress-fill--over">
          <div class="ufli__progress-info">
            <div class="ufli__progress-size"></div>
            <div class="ufli__progress-percentage"></div>
          </div>
        </div>
      </div>
    </div>
  </li>
`;
