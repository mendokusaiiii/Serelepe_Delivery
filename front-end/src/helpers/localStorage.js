export const readLocal = (key) => JSON.parse(localStorage.getItem(key));

export const saveLocal = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

export const checkLocal = (key) => {
  if (!readLocal(key)) {
    saveLocal(key, []);
  }
  return readLocal(key);
};

export const clearLocal = () => localStorage.clear();
