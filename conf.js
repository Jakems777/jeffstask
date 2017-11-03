const conf = function () {
    this.connStr = "postgres://jevgenim:12345678@localhost:5432/client";
    this.appPort = '3000';
    this.algorithm = 'aes-256-ctr';
    this.password = 'd6F3Efeq';
};
module.exports = new conf();
