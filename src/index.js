const getData = require("./data");

const calculate = require("./calculate");

(async () => {
  try
  {
    data = await getData();
    if(data)
    {
      const userWithMostCalls = await calculate.calculateUsersWithMostCalls(calls, users);
      console.log(`User with most calls is ${userWithMostCalls.first_name} ${userWithMostCalls.last_name}`);
      
      const teamWithLeastCalls = await calculate.calculateTeamWithLeastCalls(calls, teams);    
      console.log(`Team with least calls in March 2019 is ${teamWithLeastCalls.name}`);

      const userWithMostShortCalls = await calculate.calculateUsersInShortCalls(calls, users);
      console.log(`User with most short calls is ${userWithMostShortCalls.first_name} ${userWithMostShortCalls.last_name}`);
    }
  }
  catch(err)
  {
    console.log(`Error : ${err}`);
  }
})();