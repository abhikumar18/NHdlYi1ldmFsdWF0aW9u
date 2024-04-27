/*
* Write a function that will take a date and compare with today date and return text:
* - Today: same year, same month, same date
* - Yesterday: date = today - 1
* - This week: today - 7 < date < today - 1
* - Last week: today - 14 < date <= today - 7
* - This month: same year, same month, date <= today - 14
* - Last month: month = current month - 1
* - This year: same year
* - last year: year = current year - 1
* - Long time ago: everything else
*
* Lastly, please write a unit test for calculateRelativeDate function
* */

const calculateRelativeDate = (inputDate) => {
  const currentDate = new Date();
  const inputDateObj = new Date(inputDate);
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDateOfMonth = currentDate.getDate();

  const inputYear = inputDateObj.getFullYear();
  const inputMonth = inputDateObj.getMonth();
  const inputDateOfMonth = inputDateObj.getDate();

  // Check if the input date is today
  if (currentYear === inputYear && currentMonth === inputMonth && currentDateOfMonth === inputDateOfMonth) {
    return "Today";
  }

  // Check if the input date is yesterday
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  if (yesterday.getFullYear() === inputYear && yesterday.getMonth() === inputMonth && yesterday.getDate() === inputDateOfMonth) {
    return "Yesterday";
  }

  // Check if the input date is within this week
  const weekAgo = new Date(currentDate);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (inputDateObj > weekAgo && inputDateObj < currentDate) {
    return "This week";
  }

  // Check if the input date is within last week
  const twoWeeksAgo = new Date(currentDate);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  if (inputDateObj > twoWeeksAgo && inputDateObj <= weekAgo) {
    return "Last week";
  }

  // Check if the input date is within this month
  if (currentYear === inputYear && currentMonth === inputMonth && inputDateOfMonth <= currentDateOfMonth - 14) {
    return "This month";
  }

  // Check if the input date is last month
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  if (inputYear === currentYear && inputMonth === lastMonth) {
    return "Last month";
  }

  // Check if the input date is within this year
  if (currentYear === inputYear) {
    return "This year";
  }

  // Check if the input date is last year
  if (currentYear - inputYear === 1 && currentMonth === 0 && inputMonth === 11 && currentDateOfMonth === inputDateOfMonth) {
    return "Last year";
  }

  // If none of the above conditions are met, it's a long time ago
  return "Long time ago";
};

const View = {
  init: () => {
    document.getElementById('relative-date-btn').addEventListener('click', () => {
      const msgElement = document.getElementById('relative-date-msg');
      const inputDateElem = document.getElementById('relative-date-input');
      msgElement.textContent = calculateRelativeDate(inputDateElem.value);
    });
  }
};

document.addEventListener('DOMContentLoaded', View.init);
export {calculateRelativeDate};
