const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find')
        .setDescription('Trouve un membre dans un salon vocal')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à rechercher')
                .setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getMember('membre');

        if (!member) {
            return interaction.reply({ content: 'Membre non trouvé.', ephemeral: true });
        }

        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: `${member.user.username} n'est pas dans un salon vocal.`, ephemeral: true });
        }

        await interaction.reply({ content: `${member.user.username} est dans le salon vocal: ${voiceChannel.name}`, ephemeral: true });
    },
};
