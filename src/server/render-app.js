import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = (title) =>
`<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
    <script defer src="${isProd ? '/static' : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
  </head>
  <body>
    <div class="${APP_CONTAINER_CLASS}"></div>
  </body>
</html>
`;

export default renderApp;
