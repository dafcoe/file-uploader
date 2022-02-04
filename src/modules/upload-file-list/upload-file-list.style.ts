export const style = `
  <style>
    .ufl {
      margin: 20px 0 0;
      padding: 0;
      max-height: 200px;
      overflow-y: auto;
      scroll-behavior: smooth;
    }

    .ufl::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }

    .ufl:empty {
      margin: 0;
    }

    .ufli {
      display: block;
    }

    .ufli:not(:first-of-type) {
      margin-top: 10px;
    }
  </style>
`;
