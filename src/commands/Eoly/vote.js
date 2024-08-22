const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Votez pour le bot Eoly'),
    
    async execute(interaction) {
        const voteEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Votez pour Eoly')
            .setDescription('Votre soutien est important pour nous !')
            .addFields(
                { name: 'Lien de vote', value: '[Cliquez ici pour voter](https://top.gg/bot/YOUR_BOT_ID/vote)' },
                { name: 'Pourquoi voter ?', value: 'Voter nous aide à gagner en visibilité et à améliorer le bot.' }
            )
            .setFooter({ text: 'Merci pour votre soutien !' });

        await interaction.reply({ embeds: [voteEmbed] });
    },
};
