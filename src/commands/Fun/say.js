
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Permet de mettre un message à dire')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message à écrire')
                .setRequired(true)),

    async execute(interaction) {
        const message = interaction.options.getString('message');
        const author = interaction.user;

        const embed = {
            color: 0x3498db,
            fields: [
                {
                    name: 'Votre Message :',
                    value: `\`\`\`${message}\`\`\``,
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
