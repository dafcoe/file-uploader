import { colorPrimaryA } from '../shared/shared.constant';

export const style = `
  <style>
    .da {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 20px;
      padding: 20px;
      border: 2px dashed var(--da-border-color, ${colorPrimaryA});
      border-radius: 6px;
      height: 132px;
      cursor: pointer;
      opacity: .75;
      transition: opacity .25s ease;
    }

    .da:hover {
      opacity: 1;
    }

    .da svg {
      height: 80px;
      width: 80px;
      color: var(--da-icon-color, ${colorPrimaryA});
      transition: all .25s ease;
    }

    .da:hover svg {
      height: 100px;
      width: 100px;
    }

    .da__label {
      margin-bottom: 10px;
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--da-label-color, #666);
    }

    .da__input {
      display: none;
    }
  </style>
`;
