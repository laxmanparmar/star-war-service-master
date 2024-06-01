const { StarWarService } = require('./server');

const service = new StarWarService();
service.getHttpServer();
