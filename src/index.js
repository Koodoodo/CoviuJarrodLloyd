const AWS = require("aws-sdk");

const dotenv = require('dotenv');
dotenv.config();
  
console.log(process.env.COVIU_AWS_REGION);
console.log(process.env.COVIU_AWS_ACCESS_KEY);
console.log(process.env.COVIU_AWS_SECRET_ACCESS_KEY);

AWS.config.update({
  region: process.env.COVIU_AWS_REGION,
  accessKeyId: process.env.COVIU_AWS_ACCESS_KEY,
  secretAccessKey: process.env.COVIU_AWS_SECRET_ACCESS_KEY
});

const coviuBucketName = process.env.COVIU_BUCKET_NAME;
const callsPath = process.env.COVIU_CALLS_PATH;
const teamsPath = process.env.COVIU_TEAMS_PATH;
const usersPath = process.env.COVIU_USERS_PATH;

const s3 = new AWS.S3();

calculate();

async function calculate()
{
  try
  {
    const calls = await getObject(coviuBucketName, callsPath);
    const teams = await getObject(coviuBucketName, teamsPath);
    const users = await getObject(coviuBucketName, usersPath);

    const usersInCalls = calls.reduce(function (counter, item) {
      item.participants.forEach(participant => {
        const user_id = participant.user_id;
        counter[user_id] = counter.hasOwnProperty(user_id) ? counter[user_id] + 1 : 1; 
      });
      return counter;
    }, {});

    const userWithMostCalls = users[Object.keys(usersInCalls).reduce((a, b) => usersInCalls[a] > usersInCalls[b] ? a : b)];
    console.log(`User with most calls is ${userWithMostCalls.first_name} ${userWithMostCalls.last_name}`);
    
    const teamsInCalls = calls.filter(call => call.started_at >= '2019-03-01T00:00:00-00:00' && call.started_at < '2019-04-01T00:00:00-00:00')
    .reduce(function (counter, item) {
      const p = item.team_id;
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
      return counter;
    }, {});

    const teamWithLeastCalls = teams[Object.keys(teamsInCalls).reduce((a, b) => teamsInCalls[a] < teamsInCalls[b] ? a : b)];
    console.log(`Team with least calls in March 2019 is ${teamWithLeastCalls.name}`);

    const usersInShortCalls = calls.filter(call => call.duration < 120000).reduce(function (counter, item) {
      item.participants.forEach(participant => {
        const user_id = participant.user_id;
        counter[user_id] = counter.hasOwnProperty(user_id) ? counter[user_id] + 1 : 1; 
      });
      return counter;
    }, {});

    const userWithMostShortCalls = users[Object.keys(usersInShortCalls).reduce((a, b) => usersInShortCalls[a] > usersInShortCalls[b] ? a : b)];
    console.log(`User with most short calls is ${userWithMostShortCalls.first_name} ${userWithMostShortCalls.last_name}`);
  }
  catch(err)
  {
    console.log(err);
  }
}

async function getObject (bucket, filePath) 
{
  return new Promise((resolve, reject) => {
      s3.getObject({
          Bucket: bucket,
          Key: filePath
      }, (err, data) => {
          if ( err ) reject(err)
          else resolve(JSON.parse(data.Body.toString()))
      })
  })
}