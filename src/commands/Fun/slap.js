
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Permet de faire une claque à quelqu\'un')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('La personne visée pour faire la claque')
                .setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('membre');
        const author = interaction.user;

        try {
            const response = await axios.get('https://nekos.life/api/v2/img/slap');
            const slapGif = response.data.url;

            const embed = {
                color: 0x3498db,
                title: '🤚 Claque',
                description: `${author} vient de faire une claque à ${target} !`,
                image: { url: slapGif },
                timestamp: new Date(),
                footer: { text: 'Claque' }
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération du GIF:', error);
        }
    },
};
