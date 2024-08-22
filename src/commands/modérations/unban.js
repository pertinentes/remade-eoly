const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Débannir un utilisateur du serveur')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('L\'ID de l\'utilisateur à débannir')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('id');

        try {
            await interaction.guild.members.unban(userId);

            const embed = {
                color: 0x00ff00,
                title: 'Utilisateur débanni',
                description: `L'utilisateur avec l'ID \`${userId}\` a été débanni avec succès.`,
                timestamp: new Date(),
                footer: {
                    text: `Exécuté par ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                }
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const errorEmbed = {
                color: 0xff0000,
                title: 'Erreur',
                description: 'Une erreur est survenue lors du débannissement de l\'utilisateur. Vérifiez que l\'ID est correct et que l\'utilisateur est bien banni.',
                timestamp: new Date(),
                footer: {
                    text: `Exécuté par ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                }
            };

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
