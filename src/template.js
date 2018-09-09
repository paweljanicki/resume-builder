export const createTemplate = (style, html) => {
  return `<html>
  <head>
    <meta charset="utf8">
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