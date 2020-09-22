export const sortByLink = (a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};
export const sortFunction = (previousValue, addedValue) => {
  return JSON.parse(JSON.stringify(previousValue))
    .concat(addedValue)
    .sort(sortByLink);
};

export function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

export const getDateDifference = () => {
  function isLastDay(dt) {
    var test = new Date(dt.getTime());
    test.setDate(test.getDate() + 1);
    return test.getDate() === 1;
  }
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(2020, 9, 7);
  const secondDate = new Date();
  let mlsvId = 1409336;
  const difference = Math.round(Math.abs((secondDate - firstDate) / oneDay));
  const a = difference % 7; //나머지
  const b = (difference - a) / 7; //나머지를 뺸 나눈거
  mlsvId += b * 5;
  if (a < 6) {
    mlsvId += a;
  } else if (a === 6) {
    mlsvId += a - 1;
  } else if (a === 7) {
    mlsvId += a - 2;
  }
  console.log({ a, b, mlsvId });
  return mlsvId;
};

/*
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(2020, 9, 7);
  const secondDate = new Date();
  secondDate.setMinutes(0);
  secondDate.setHours(0);
  secondDate.setSeconds(0);
  const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));
  
  const mlsvId = 1409336 + diffDays;
  return mlsvId;*/
