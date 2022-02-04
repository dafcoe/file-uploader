import {
  colorPrimaryA,
  colorSecondaryA,
} from '../shared/shared.constant';

export const style = `
  <style>
    .ufli {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      list-style: none;
      background-color: var(--ufli-bg-color, ${colorSecondaryA});
      border-radius: 6px;
      animation: slide-bottom .25s cubic-bezier(.250, .460, .450, .940) both;
    }

    .ufli--loaded {
      animation: blink .35s .4s both;
    }

    .ufli__icon {
      position: relative;
      display: flex;
      align-items: center;
      color: var(--ufli-icon-color, ${colorPrimaryA});
    }

    .ufli__icon::after {
      position: absolute;
      right: 2px;
      bottom: -2px;
      content: '';
      width: 14px;
      height: 14px;
      background-color: var(--ufli-bg-color, ${colorSecondaryA});
      border-radius: 50%;
    }

    .ufli__icon svg {
      height: 40px;
      width: 40px;
    }

    .ufli__status {
      position: absolute;
      right: 0;
      bottom: -8px;
      z-index: 1;
      color: var(--ufli-status-icon-color, #246fff);
    }

    .ufli__status svg {
      height: 18px;
      width: 18px;
      animation: spin 2.5s linear infinite;
    }

    .ufli--loaded .ufli__status {
      color: var(--ufli-status-loaded-icon-color, #589f00);
    }

    .ufli--loaded .ufli__status svg {
      animation: none;
    }

    .ufli__content {
      flex: 1;
      padding: 0 4px 0 10px;
    }

    .ufli__name {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-weight: 500;
    }

    .ufli__progress {
      position: relative;
      margin-top: 6px;
      border-radius: 4px;
      height: 12px;
      width: 100%;
      overflow: hidden;
      z-index: 1;
    }

    .ufli__progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background-color: white;
      height: 100%;
      width: 100%;
      border-left-color: var(--ufli-progress-fill-border-color, ${colorPrimaryA});
    }

    .ufli__progress-fill--over {
      color: white;
      background-color: var(--ufli-progress-fill-over-bg-color, ${colorPrimaryA});
      overflow: hidden;
      border-left-color: white;
      transition: width .25s ease;
    }

    .ufli__progress-info {
      position: absolute;
      top: 0;
      left: 5px;
      bottom: 0;
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      z-index: 3;
    }

    .ufli__progress-percentage {
      margin-left: 10px;
      padding-left: 10px;
      border-left-width: 1px;
      border-left-style: solid;
      transition: opacity .25s ease;;
    }

    .ufli--loaded .ufli__progress-percentage {
      opacity: 0;
    }

    @keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
                transform :rotate(360deg);
      }
    }

    @keyframes slide-bottom {
      0% {
        -webkit-transform: translateY(-100px);
                transform: translateY(-100px);
      }
      100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
      }
    }

    @keyframes blink {
      0%,
      50%,
      100% {
        opacity: 1;
      }
      25%,
      75% {
        opacity: 0;
      }
    }
  </style>
`;
