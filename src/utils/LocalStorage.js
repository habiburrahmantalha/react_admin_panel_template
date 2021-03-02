import moment from "moment";
import _ from "lodash";

const appKey = "TEMPLATE";
export const localStorageKey = {
  SKIP: `${appKey}_SKIP`,
  LIMIT: `${appKey}_TABLE_LIMIT`,
  AUTH_TOKEN: `${appKey}_AUTH_TOKEN`,
  USER: `${appKey}_USER`,
};
export function saveItem(key, value, time) {
  localStorage.setItem(key, JSON.stringify({time: time,
    value: value}));
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function isItemExist(key, time) {
  const data = JSON.parse(localStorage.getItem(key));
  if (data) {
    const savedOn = moment(data.time);
    if (moment().diff(savedOn, 'minutes') > time) {
      localStorage.removeItem(key);
      return false;
    } else
      return !_.isEmpty(data.value);
  } else
    return false;
}

export function getItem(key) {
  const data = JSON.parse(localStorage.getItem(key));
  console.log(key + ":" + JSON.stringify(data));
  return data.value;
}

