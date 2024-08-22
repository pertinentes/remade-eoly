const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Retire le mute d\'un membre')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à unmute')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('membre');
        const member = await interaction.guild.members.fetch(targetUser.id);

        if (!member.isCommunicationDisabled()) {
            return interaction.reply({ content: 'Ce membre n\'est pas mute.', ephemeral: true });
        }

        try {
            await member.timeout(null);

            const embed = {
                color: 0x00ff00,
                title: 'Membre unmute',
                description: `${targetUser.toString()} a été unmute.`,
                fields: [
                    {
                        name: 'Unmute par',
                        value: interaction.user.toString(),
                        inline: true
                    },
                    {
                        name: 'Membre unmute',
                        value: targetUser.toString(),
                        inline: true
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: `ID: ${targetUser.id}`,
                    iconURL: targetUser.displayAvatarURL({ dynamic: true })
                }
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors de l\'unmute du membre.', ephemeral: true });
        }
    },
};
