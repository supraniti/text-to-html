export const applyHtmlTemplate = (tailwind:string) => `
<!DOCTYPE html>
<html>
  <head>
    <title>UI on the fly mockup, made with openAI gpt3.5 and tailwindCSS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width<% if (ctx.mode.cordova || ctx.mode.capacitor) { %>, viewport-fit=cover<% } %>">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
    [data-id=root] {
      transition:all 0.2s;
      height: fit-content !important;
      width: fit-content !important;
      max-width:500px;
    }
    .fit-screen [data-id=root] {
        height: auto !important;
        width: auto !important;
        max-width: 100%;
    }
    </style>
  </head>
  <body>${tailwind}</body>
</html>
`
