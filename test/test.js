const calculate = require("../src/calculate");
const expect = require('chai').expect;

const calls = [
    {
        team_id:1,
        participants:[
            {user_id:1},
            {user_id:2},
            {user_id:3}            
        ],
        started_at:'2019-05-05T00:00:00-00:00',
        duration:1345678
    },
    {
        team_id:1,
        participants:[
            {user_id:7},
            {user_id:2},
            {user_id:5} 
        ],
        started_at:'2019-06-09T00:00:00-00:00',
        duration:3565434
    },
    {
        team_id:1,
        participants:[
            {user_id:1},
            {user_id:2},
            {user_id:3} 
        ],
        started_at:'2019-03-09T00:00:00-00:00',
        duration:1111111
    },
    {
        team_id:6,
        participants:[
            {user_id:4},
            {user_id:2}  
        ],
        started_at:'2019-03-09T00:00:00-00:00',
        duration:343
    },
    {
        team_id:6,
        participants:[
            {user_id:4},
            {user_id:6},
            {user_id:7} 
        ],
        started_at:'2019-03-09T00:00:00-00:00',
        duration:3443
    }
];

const users = [
    {
        user_id:1,
        first_name:'Allan',
        last_name:'Alda'
    },
    {
        user_id:2,
        first_name:'Ben',
        last_name:'Baker'
    },
    {
        user_id:3,
        first_name:'Chris',
        last_name:'Coleman'
    },
    {
        user_id:4,
        first_name:'Dennis',
        last_name:'Danno'
    },
    {
        user_id:5,
        first_name:'Eric',
        last_name:'Ento'
    },
    {
        user_id:6,
        first_name:'Fred',
        last_name:'Flintstone'
    },
    {
        user_id:7,
        first_name:'Gary',
        last_name:'Gomes'
    },
    {
        user_id:8,
        first_name:'Harry',
        last_name:'Holmes'
    }
];

const teams = [
    {
        team_id:1,
        name:'ATeam'
    },
    {
        team_id:2,
        name:'BTeam'
    },
    {
        team_id:3,
        name:'CTeam'
    },
    {
        team_id:4,
        name:'DTeam'
    },
    {
        team_id:5,
        name:'ETeam'
    },
    {
        team_id:6,
        name:'FTeam'
    }
];

const assert = require('assert');
describe('Users With Most Calls Test', () => {
    it('should equal 2', async () => {
        const result = await calculate.calculateUsersWithMostCalls(calls, users);
        expect(result.user_id).to.equal(2);
    });
    it('should equal 1', async () => {
        const result = await calculate.calculateTeamWithLeastCalls(calls, teams);
        expect(result.team_id).to.equal(1);
    });
    it('should equal 4', async () => {
        const result = await calculate.calculateUsersInShortCalls(calls, users);
        expect(result.user_id).to.equal(4);
    });
});