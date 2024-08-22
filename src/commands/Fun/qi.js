const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qi')
        .setDescription('Permet de connaître son qi'),

    async execute(interaction) {
        const author = interaction.user;
        const qi = Math.floor(Math.random() * 201);

        const embed = {
            color: 0x3498db,
            fields: [
                {
                    name: '🧠 Votre Qi est de :',
                    value: `\`\`\`${qi}\`\`\``,
                    inline: false
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `Exécuté par ${author.globalName || author.username}`,
                iconURL: author.displayAvatarURL({ dynamic: true })
            }
        };

        await interaction.reply({ embeds: [embed] });
    },
};
