const helloController = (data, callback) => {
  console.log(data);
  callback(200, {
    message: 'Welcome to the world of node apis...'
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