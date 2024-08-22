const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Lance un dé et affiche le résultat'),

    async execute(interaction) {
        const author = interaction.user;
        const result = Math.floor(Math.random() * 6) + 1;

        const diceImages = [
            'https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312625_1280.png',
            'https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312627_1280.png',
            'https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312624_1280.png',
            'https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312623_1280.png',
            'https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312622_1280.png',
            'https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312621_1280.png'
        ];

        const embed = {
            color: 0x3498db,
            title: '🎲 Résultat du lancer de dé',
            description: `Vous avez obtenu un **${result}** !`,
            image: {
                url: diceImages[result - 1]
            },
            timestamp: new Date(),
            footer: {
                text: `Exécuté par ${author.globalName || author.username}`,
                iconURL: author.displayAvatarURL({ dynamic: true })
            }
        };

        await interaction.reply({ embeds: [embed] });
    },
};
