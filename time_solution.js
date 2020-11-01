const fromUTCHours = 4;
const toUTCHours = 9;
const minimumHoursFromNow = 36;
const durationInHours = 4;

const hoursToMilliseconds = (hours) => (1000 * 60 * 60 * hours);
const getMinutes = (d) => d.getUTCHours() * 60 + d.getUTCMinutes();
const randomNumber = (min, max) => Math.random() * (max - min) + min;

const getStartDate = () => {
  const startDate = +new Date() + hoursToMilliseconds(minimumHoursFromNow);
  const startDateMinutes = getMinutes(new Date(startDate));

  switch (true) {
    case startDateMinutes < (fromUTCHours * 60): {
      const d = new Date(startDate);
      d.setUTCHours(4);
      const hoursRange = hoursToMilliseconds(toUTCHours - fromUTCHours - 1);
      return d.getTime() + randomNumber(0, hoursRange);
    }
    case startDateMinutes > (toUTCHours * 60): {
      const d = new Date(startDate);
      d.setUTCDate(d.getUTCDate() + 1);
      d.setUTCHours(4);
      const hoursRange = hoursToMilliseconds(toUTCHours - fromUTCHours - 1);
      return d.getTime() + randomNumber(0, hoursRange);
    }
    case startDateMinutes >= (fromUTCHours * 60) && startDateMinutes <= (toUTCHours * 60):
    default:
      return startDate
  }
}

const rndId = +new Date();
const startDate = getStartDate();
const endDate = startDate + hoursToMilliseconds(durationInHours);

pm.collectionVariables.set('rndID', rndId);
pm.collectionVariables.set('startDate', new Date(startDate).toISOString());
pm.collectionVariables.set('endDate', new Date(endDate).toISOString());
