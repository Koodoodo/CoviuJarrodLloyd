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

async function getData()
{
  try
  {
    const callData = await getObject(coviuBucketName, callsPath);
    const teamData = await getObject(coviuBucketName, teamsPath);
    const userData = await getObject(coviuBucketName, usersPath);

    console.log(`Here ${callData}`);

    return {calls: callData, teams:teamData, users:userData};
  }
  catch(err)
  {
    console.log(`Error : ${err}`);
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

module.exports = getData;