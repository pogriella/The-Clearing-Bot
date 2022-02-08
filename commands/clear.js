const { SlashCommandBuilder } = require('@discordjs/builders');
const { clearingChannelIds } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearing')
        .setDescription('Purges the server.'),
    async execute(interaction) {
        await interaction.guild.channels.cache.filter(channel => channel.isText())
            .filter(channel => clearingChannelIds.includes(channel.id))
            .forEach(async channel => {
                const textChannel = channel.guild.channels.cache.get(channel.id);
                const messageFetch = await channel.messages.fetch({ limit: 100 });
                let messageSize = 1;
                let i = 0;
                while (await messageSize > 0) {
                    await textChannel.bulkDelete(100, true);
                    messageSize = messageFetch.size;
                    console.log(messageSize);
                    i++;
                    if (i >= 30) return console.log('Error: timed out!');
                }
            });

        await interaction.editReply('Done.').then(() => {
            interaction.guild.channels.cache.filter(channel => channel.isText())
                .filter(channel => clearingChannelIds.includes(channel.id))
                .forEach(channel => {
                    channel.guild.channels.cache.get(channel.id).send('https://tenor.com/view/maid-clapping-singing-anime-gif-8700993');
                });
        });
    }
}