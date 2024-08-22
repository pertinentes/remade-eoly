
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Obtenir le lien d\'invitation pour le support du bot'),

    async execute(interaction) {
        const embed = {
            color: 0x3498db,
            title: 'Invitation au support du bot',
            description: 'Rejoignez notre serveur de support pour obtenir de l\'aide et des informations sur le bot !',
            fields: [
                {
                    name: 'Lien d\'invitation',
                    value: 'https://discord.gg/G5raAuW9mR',
                    inline: false
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `Exécuté par ${interaction.user.globalName || interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }
        };

        const button = {
            type: 2,
            style: 5,
            label: 'Rejoindre le support',
            url: 'https://discord.gg/G5raAuW9mR'
        };

        await interaction.reply({
            embeds: [embed],
            components: [{
                type: 1,
                components: [button]
            }]
        });
    },
};
