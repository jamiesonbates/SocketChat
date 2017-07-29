import moment from 'moment';

function timeDisplay(time) {
  const nowMil = moment(Date.now()).valueOf();
  const timeMil = moment(time).valueOf();
  const diff = nowMil - timeMil;
  const midnight = moment().startOf('day').valueOf();
  const weekAgoDiff = nowMil - moment(Date.now()).subtract(6, 'days').valueOf();

  if (diff < 60000) {
    return 'Now';
  }
  else if (diff < 3600000) {
    return Math.floor(diff / 60000) + 'm';
  }
  else if (timeMil > midnight) {
    return moment(timeMil).format('h:mm A');
  }
  else if (timeMil < midnight && diff > weekAgoDiff) {
    return moment(timeMil).format('MMM D');
  }
  else if (diff < weekAgoDiff) {
    return moment(timeMil).format('ddd');
  }
  else {
    return moment(timeMil).format('M/D/YY');
  }
}

export default timeDisplay;
