// db.js
let data = {};

export const get = (key) => data[key];
export const set = (key, value) => {
  data[key] = value;
};
export const getAll = () => data;
export const clear = () => {
  data = {};
};