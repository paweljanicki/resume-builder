const defaultIframeStyles = `
  body {
    background: #ffffff;
  }
  #page {
    overflow: hidden;
    height: 100%;
  }
`;
export const preview = document.getElementById('preview').contentWindow.document;
preview.open();
preview.writeln(`
  <div id="page"></div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
  <style>${defaultIframeStyles}</style>
  <style id="style"></style>
`);
preview.close();
