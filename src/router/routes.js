const routes = [];
const files = require.context('@/views', true, /Router.js$/);

files.keys().forEach((fileName) => {
  const content = files(fileName).default;

  if (Array.isArray(content)) {
    return content.forEach((route) => {
      routes.push(route);
    });
  }

  return routes.push(content);
});

export default routes;
