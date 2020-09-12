const helloController = (data, callback) => {
  callback(200, {
    data: 'Welcome to hello world'
  });
}

const notFoundController = (data, callback) => {
  callback(404);
}

const routes = {
  'hello': helloController,
  'notFound': notFoundController
}

module.exports = routes;