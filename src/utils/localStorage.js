/*global chrome*/
export const saveData = (key, value) => {
  if (isChromeExtension()) {
    try {
      return chrome.storage.local.set({ key: value });
    } catch (error) {
      console.error("Error Saving to local state", error);
    }
  } else {
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }
};

export const loadData = (key) => {
  if (isChromeExtension()) {
    try {
      return chrome.storage.local.get([key]).then((data) => data[key]);
    } catch (error) {}
  } else {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
};

const isChromeExtension = () => {
  return !!chrome?.storage;
};
