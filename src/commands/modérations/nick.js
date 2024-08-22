
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Change le nom d\'utilisateur d\'un membre')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre dont vous voulez changer le nom')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Le nouveau nom d\'utilisateur')
                .setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember('membre');
        const newNickname = interaction.options.getString('nouveau_nom');

        if (!interaction.member.permissions.has('MANAGE_NICKNAMES')) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de changer les noms d\'utilisateur.', ephemeral: true });
        }

        if (!member) {
            return interaction.reply({ content: 'Membre non trouvé.', ephemeral: true });
        }

        try {
            await member.setNickname(newNickname);
            await interaction.reply(`Le nom d'utilisateur de ${member.user.tag} a été changé en ${newNickname}.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors du changement de nom d\'utilisateur.', ephemeral: true });
        }
    },
};
