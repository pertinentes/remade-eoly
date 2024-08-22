
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un nombre spécifié de messages dans le salon')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Nombre de messages à supprimer')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger('nombre');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Vous devez spécifier un nombre entre 1 et 100.', ephemeral: true });
        }

        try {
            const messages = await interaction.channel.bulkDelete(amount, true);
            
            const embed = {
                color: 0x3498db,
                description: `✅ ${messages.size} message(s) ont été supprimés.`,
                timestamp: new Date(),
                footer: {
                    text: `Exécuté par ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                }
            };

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression des messages.', ephemeral: true });
        }
    },
};
