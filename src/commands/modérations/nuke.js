const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Permet de recréer un salon')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Recréer le channel')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.options.getChannel('salon');

        if (!channel.deletable) {
            return interaction.reply({ content: "Je ne peux pas supprimer ce salon.", ephemeral: true });
        }

        try {
            const newChannel = await channel.clone();
            await channel.delete();

            const embed = new EmbedBuilder()
                .setTitle('☢️ Nuke')
                .setDescription(`Salon recréer par <@${interaction.user.id}>`)
                .setColor('#3498db');

            await newChannel.send({ embeds: [embed] });
            await interaction.reply({ content: `Le salon ${newChannel} a été nuke avec succès.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Une erreur s'est produite lors de l'exécution de la commande.", ephemeral: true });
        }
    },
};