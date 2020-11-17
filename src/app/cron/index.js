var CronJob = require('cron').CronJob;
import userModel from '../models/user.model'

exports.job = new CronJob('* * * 1 * *', function() {
    return new Promise(async (resolve,reject)=> {
        try{
            let count = await userModel.count().exec();
            console.log('You will see the count of register user - ',count);
            resolve(count)
        } catch (err) {
            reject(err)
        }
        
    })
  
}, null, true, 'America/Los_Angeles');