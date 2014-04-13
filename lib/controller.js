function Controller(scope) {
  if (!scope) {
    throw new Error('State scope not present');
  }

  this.$scope = scope;

  return this;
}

Controller.prototype.set = function set(key, value) {
  this.pub(key, value);
};

Controller.prototype.run = function run() {
  var self = this;

  return this;
};

module.exports = Controller;
