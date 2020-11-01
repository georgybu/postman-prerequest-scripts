// Settings

const fromUTCHours = 4;
const toUTCHours = 9;
const minimumHoursFromNow = 36;
const durationInHours = 4;

// fix global pm
if (typeof pm === 'undefined') {
  pm = {
    collectionVariables: {
      set(key, value) {
      }
    }
  }
}

const hoursToMilliseconds = (hours) => (1000 * 60 * 60 * hours);
const getMinutes = (d) => d.getUTCHours() * 60 + d.getUTCMinutes();
const randomNumber = (min, max) => Math.random() * (max - min) + min;

const getStartDate = () => {
  const startDate = +new Date() + hoursToMilliseconds(minimumHoursFromNow);
  const startDateMinutes = getMinutes(new Date(startDate));

  switch (true) {

    //  -------------------------------------->
    //    start         from         to
    case startDateMinutes < (fromUTCHours * 60): {
      const d = new Date(startDate);
      d.setUTCHours(4);
      const hoursRange = hoursToMilliseconds(toUTCHours - fromUTCHours - 1);
      return d.getTime() + randomNumber(0, hoursRange);
    }

    //  -------------------------------------->
    //    from         to         start
    case startDateMinutes > (toUTCHours * 60): {
      const d = new Date(startDate);
      d.setUTCDate(d.getUTCDate() + 1);
      d.setUTCHours(4);
      const hoursRange = hoursToMilliseconds(toUTCHours - fromUTCHours - 1);
      return d.getTime() + randomNumber(0, hoursRange);
    }

    //  -------------------------------------->
    //    from         start         to
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

console.log('rndID', rndId);
console.log('startDate', new Date(startDate).toISOString());
console.log('endDate', new Date(endDate).toISOString());

// tests
const assert = require('assert').strict;

for (let i = 0; i < 100; i++) {
  let d = getStartDate();
  const now = +new Date();
  console.log(new Date(d).toISOString());

  // start date should be > 36h
  assert.strictEqual(d - now > hoursToMilliseconds(36), true);

  // start date should be > 04:00
  assert.strictEqual(new Date(d).getUTCHours() >= 4, true);

  // start date should be < 09:00
  assert.strictEqual(new Date(d).getUTCHours() <= 9, true);

}
