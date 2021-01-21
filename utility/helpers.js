export function combineReducers(reducers) {
  let state = Object.keys(reducers).reduce(
    (acc, key) => ({...acc, [key]: reducers[key][0]}),
    {},
  );
  const dispatch = async (action) =>
    typeof action === 'function'
      ? await action(dispatch, state)
      : Object.keys(reducers).forEach((key) => {
          return reducers[key][1](action);
        });

  return [state, dispatch];
}

export async function sendRequest(
  url,
  method = 'GET',
  body,
  headers = {},
  token,
) {
  return await fetch(url, {
    method: method,
    body: method.toLowerCase() === 'get' ? undefined : JSON.stringify(body),
    headers: {
      'Content-Type': headers.contentType || 'application/json',
      Accept: headers.accept || 'application/json',
      Authorization: 'Bearer ' + token,
      ...headers,
    },
  });
}

export function getTime(date = new Date()) {
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  hour = ('' + hour).length < 2 ? `0${hour}` : hour;
  min = ('' + min).length < 2 ? `0${min}` : min;
  sec = ('' + sec).length < 2 ? `0${sec}` : sec;

  return `${hour}:${min}:${sec}`;
}

export function getDate(date = new Date()) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();

  return `${year}-${month}-${day}`;
}

export const getMonth = (val) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[val - 1];
};

export const reformatDate = (date) => {
  date = date.split('-');
  return new Date(date[2], date[1] - 1, date[0]);
};

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function trimString(str, len = 10) {
  return str.length > len ? str.substring(0, len - 2) + '...' : str;
}

export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}
