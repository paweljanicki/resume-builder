export const createTemplate = (style, html) => {
  return `<html>
  <head>
    <meta charset="utf8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
    <style>
      ${defaultStyles}
      ${style}
    </style>
  </head>
  <body>
    ${html}
  </body>
  </html>
  `;
}

export const defaultStyles = `
  h1 {
    font-size: 40px;
  }
  #page {
    overflow: hidden;
    height: 100%;
  }
`