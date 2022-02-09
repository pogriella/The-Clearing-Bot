const { clearingChannelIds } = require('../config.json');

module.exports = {
    commandName: "clear",
    async execute (message) {
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
                    const messageFetch = await channel.messages.fetch({ limit: 100 });
                    console.log(`ORIGINAL SIZE: ${channel.name} HAS ${messageSize} MESSAGES`);
                    await textChannel.bulkDelete(100, true);
                    messageSize = messageFetch.size
                    console.log(`AFTER SIZE: ${channel.name} HAS ${messageSize} MESSAGES`);
                    i++;
                    if (i >= 30) return console.log('Error: timed out!');
                }
            });
    }
}