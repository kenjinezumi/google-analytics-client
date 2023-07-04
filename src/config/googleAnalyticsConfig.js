const { format } = require('date-fns');

module.exports = (propertyId, startDate, endDate) => {
  

  return {
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      dimensions: [
        {
          name: 'user_feedback',
        },
      ],
      metrics: [
        {
          name: ['thumb_up', 'thumb_down'],
        },
      ],
  };
};
