const { clearingChannelIds } = require('../config.json');

module.exports = {
    commandName: "clear",
    async execute (message) {
        message.guild.roles.cache.forEach(role => console.log(`${role.name} AND ${role.id}`));
        console.log(message.member.roles.cache.some(role => role.id === '921442764825174047'));
        if (message.member.roles.cache.some(role => role.id === '921442764825174047') === false 
            && message.member.roles.cache.some(role => role.id === '921444172894961704') === false) {
                return message.reply(`No, ${message.member}, you cunt.`);
            }

        await message.guild.channels.cache.filter(channel => channel.isText())
            .filter(channel => clearingChannelIds.includes(channel.id))
            .forEach(async channel => {
                const textChannel = channel.guild.channels.cache.get(channel.id);
                let messageSize = 1;
                let i = 0;
                while (await messageSize > 0) {
                    await textChannel.bulkDelete(100, true);
                    messageSize = messageSize - 100;
                    console.log(messageSize);
                    i++;
                    if (i >= 30) return console.log('Error: timed out!');
                }
            });
    }
}