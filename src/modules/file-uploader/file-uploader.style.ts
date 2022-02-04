import { colorPrimaryA } from '../shared/shared.constant';

export const style = `
  <style>
    .fu {
      padding: 20px;
      width: 400px;
      background-color: var(--fu-bg-color, white);
      border-radius: 10px;
      box-shadow: rgba(255, 255, 255, .1) 0 1px 1px 0 inset, rgba(50, 50, 93, .25) 0 50px 100px -20px, rgba(0, 0, 0, .3) 0 30px 60px -30px;
    }

    .fu__heading {
      margin: 0;
      text-align: center;
      color: var(--fu-heading-color, ${colorPrimaryA});
    }
  </style>
`;
