async function calculate(calls, teams, users)
{
  try
  {
    const userWithMostCalls = await calculateUsersWithMostCalls(calls, users);
    console.log(`User with most calls is ${userWithMostCalls.first_name} ${userWithMostCalls.last_name}`);
    
    const teamWithLeastCalls = await calculateTeamWithLeastCalls(calls, teams);    
    console.log(`Team with least calls in March 2019 is ${teamWithLeastCalls.name}`);

    const userWithMostShortCalls = await calculateUsersInShortCalls(calls, users);
    console.log(`User with most short calls is ${userWithMostShortCalls.first_name} ${userWithMostShortCalls.last_name}`);
  }
  catch(err)
  {
    console.log(`Error : ${err}`);
  }
}

async function calculateUsersWithMostCalls(calls, users)
{
  try
  {
    const usersInCalls = calls.reduce(function (counter, item) {
      item.participants.forEach(participant => {
        const user_id = participant.user_id;
        counter[user_id] = counter.hasOwnProperty(user_id) ? counter[user_id] + 1 : 1; 
      });
      return counter;
    }, {});

    const userIdWithMostCalls = Object.keys(usersInCalls).reduce((a, b) => usersInCalls[a] > usersInCalls[b] ? a : b);
    const userWithMostCalls = users.find(u => u.user_id == userIdWithMostCalls);
    return userWithMostCalls;
  }
  catch(err)
  {
    console.log(`Error : ${err}`);
  }
}

async function calculateTeamWithLeastCalls(calls, teams)
{
  try
  {
    const teamsInCalls = calls.filter(call => call.started_at >= '2019-03-01T00:00:00-00:00' && call.started_at < '2019-04-01T00:00:00-00:00')
    .reduce(function (counter, item) {
      const p = item.team_id;
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
      return counter;
    }, {});

    const teamWithLeastCallsId = Object.keys(teamsInCalls).reduce((a, b) => teamsInCalls[a] < teamsInCalls[b] ? a : b);
    const teamWithLeastCalls = teams.find(t => t.team_id == teamWithLeastCallsId);
    return teamWithLeastCalls;
  }
  catch(err)
  {
    console.log(`Error : ${err}`);
  }
}

async function calculateUsersInShortCalls(calls, users)
{
  try
  {
    const usersInShortCalls = calls.filter(call => call.duration < 120000).reduce(function (counter, item) {
      item.participants.forEach(participant => {
        const user_id = participant.user_id;
        counter[user_id] = counter.hasOwnProperty(user_id) ? counter[user_id] + 1 : 1; 
      });
      return counter;
    }, {});

    const userWithMostShortCallsId = Object.keys(usersInShortCalls).reduce((a, b) => usersInShortCalls[a] > usersInShortCalls[b] ? a : b);
    const userWithMostShortCalls = users.find(u => u.user_id == userWithMostShortCallsId);
    return userWithMostShortCalls;
  }
  catch(err)
  {
    console.log(`Error : ${err}`);
  }
}

module.exports = 
{
    calculate: calculate,
    calculateUsersWithMostCalls:calculateUsersWithMostCalls,
    calculateTeamWithLeastCalls:calculateTeamWithLeastCalls,
    calculateUsersInShortCalls:calculateUsersInShortCalls
};