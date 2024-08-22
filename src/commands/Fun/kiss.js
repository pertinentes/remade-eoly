const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Permet de faire un bisous à quelqu\'un')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('La personne visée pour faire un bisous')
                .setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('membre');
        const author = interaction.user;

        try {
            const response = await axios.get('https://nekos.life/api/v2/img/kiss');
            const kissGif = response.data.url;

            const embed = {
                color: 0x3498db,
                title: '😘 Bisous',
                description: `${author} vient de faire un bisous à ${target} !`,
                image: { url: kissGif },
                timestamp: new Date(),
                footer: { text: 'Bisous' }
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération du GIF:', error);
        }
    },
};
