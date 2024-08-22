const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription('Affiche la liste des utilisateurs bannis du serveur')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const bans = await interaction.guild.bans.fetch();

            if (bans.size === 0) {
                return interaction.editReply('Il n\'y a aucun utilisateur banni sur ce serveur.');
            }

            const banList = bans.map(ban => {
                const user = ban.user;
                return `> **${user.username}** (ID: ${user.id})\n> Raison: ${ban.reason || 'Aucune raison spécifiée'}`;
            }).join('\n\n');

            const embed = {
                color: 0xFF0000,
                title: `Liste des utilisateurs bannis (${bans.size})`,
                description: banList,
                timestamp: new Date(),
                footer: {
                    text: `Exécuté par ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                }
            };

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération de la liste des bans:', error);
            await interaction.editReply('Une erreur est survenue lors de la récupération de la liste des bans.');
        }
    },
};
