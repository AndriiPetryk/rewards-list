import delay from './delay';

var users = [{ id: 1, name: 'Joe Smith' }, { id: 1, name: 'Sue Mae' }];
var rewards = [
    {
        id: 1,
        user: users[0].name,
        experience: 'Trip to Hawaii',
        date: '10/23/2014',
        status: 'new'
    },
    {
        id: 2,
        user: users[0].name,
        experience: 'The Bond Experience',
        date: '2/23/2015',
        status: 'redeemed'
    },
    {
        id: 3,
        user: users[1].name,
        experience: 'Cruise around Alaska',
        date: '4/17/2014',
        status: 'completed'
    },
    {
        id: 4,
        user: users[1].name,
        experience: 'Bladesmithing',
        date: '8/20/2015',
        status: 'scheduled'
    },
    {
        id: 5,
        user: users[1].name,
        experience: 'Yerba Mate Tasting in Napa',
        date: '7/23/2015',
        status: 'completed'
    },
    {
        id: 6,
        user: users[1].name,
        experience: 'Super Bowl Tickets',
        date: '1/2/2014',
        status: 'redeemed'
    },
    {
        id: 7,
        user: users[1].name,
        experience: 'Warriors Tickets',
        date: '1/2/2014',
        status: 'redeemed'
    },
    {
        id: 8,
        user: users[1].name,
        experience: 'Drive Bugatti Veyron',
        date: '1/2/2014',
        status: 'redeemed'
    },
    {
        id: 9,
        user: users[0].name,
        experience: 'Kite Surfing Lessons',
        date: '1/2/2014',
        status: 'redeemed'
    },
    {
        id: 10,
        user: users[0].name,
        experience: 'Something cool',
        date: '11/11/2011',
        status: 'redeemed'
    },
    {
        id: 11,
        user: users[1].name,
        experience: 'Drive Lamborghini',
        date: '6/20/2013',
        status: 'redeemed'
    },
    {
        id: 12,
        user: users[1].name,
        experience: 'World Food Tour',
        date: '1/1/2010',
        status: 'redeemed'
    },
    {
        id: 13,
        user: users[1].name,
        experience: 'Sharks Tickets',
        date: '1/2/2014',
        status: 'scheduled'
    },
    {
        id: 14,
        user: users[1].name,
        experience: 'Electric Daisy Carnival',
        date: '1/2/2014',
        status: 'redeemed'
    },
    {
        id: 15,
        user: users[0].name,
        experience: 'Olympics',
        date: '2/2/2013',
        status: 'new'
    },
    {
        id: 16,
        user: users[1].name,
        experience: 'Great Barrier Reef Snorkeling',
        date: '1/2/2014',
        status: 'new'
    },
    {
        id: 17,
        user: users[1].name,
        experience: 'Wine Tasting',
        date: '10/17/2014',
        status: 'completed'
    },
    {
        id: 18,
        user: users[0].name,
        experience: 'Biergarten',
        date: '1/2/2014',
        status: 'completed'
    },
    {
        id: 19,
        user: users[1].name,
        experience: 'Trip to Europe',
        date: '11/2/2014',
        status: 'new'
    },
    {
        id: 20,
        user: users[0].name,
        experience: 'Fishing Trip',
        date: '1/23/2015',
        status: 'redeemed'
    }
];

class RewardApi {
    static getAllRewards() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], rewards));
            }, delay);
        });
    }

    static saveReward(reward) {
        reward = Object.assign({}, reward);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (reward.id) {
                    const existingRewardIndex = rewards.findIndex(a => a.id === reward.id);
                    rewards.splice(existingRewardIndex, 1, reward);
                }

                resolve(reward);
            }, delay);
        });
    }


    static getReward(rewardId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingRewardIndex = rewards.filter(reward => {
                    return reward.id === Number(rewardId)
                })[0];
                const rewardFound = Object.assign({}, existingRewardIndex);
                resolve(rewardFound);

            }, delay);
        });
    }

}

export default RewardApi;
