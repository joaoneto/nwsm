var localStorage = window.localStorage;

module.exports = {
  get: function (key) {
   return localStorage.getItem(key);
  },

  save: function (key, data) {
   localStorage.setItem(key, JSON.stringify(data));
  },

  remove: function (key) {
    localStorage.removeItem(key);
  },

  clearAll: function () {
    localStorage.clear();
  }
};