const getData = require("./data");

const calculate = require("./calculate");

(async () => {
  data = await getData();
  if(data)
  {
    console.log(data);
    calculate.calculate(data.calls, data.teams, data.users);
  }
})();