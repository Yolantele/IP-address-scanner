var cron = require('node-cron');

cron.schedule('* * * * *', function () {
    console.log('should save parsed map');
});