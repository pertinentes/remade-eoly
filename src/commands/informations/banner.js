const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Donner la bannière d\'un utilisateur')
        .addUserOption(option => 
            option.setName('membre')
                .setDescription('L\'utilisateur pour sa bannière')
                .setRequired(false)),

    async execute(interaction) {
        const target = interaction.options.getUser('membre') || interaction.user;
        const user = await interaction.client.users.fetch(target.id, { force: true });
        const bannerUrl = user.bannerURL({ size: 1024, dynamic: true });

        const embed = new EmbedBuilder()
            .setTitle(`La bannière de ${target.username}`)
            .setFooter({ text: `Exécuté par ${interaction.user.username}` })
            .setTimestamp();

        if (bannerUrl) {
            embed.setImage(bannerUrl);
            await interaction.reply({ 
                embeds: [embed], 
                ephemeral: true 
            });
        } else {
            embed.setDescription("Cet utilisateur n'a pas de bannière.");
            await interaction.reply({ 
                embeds: [embed], 
                ephemeral: true 
            });
        }
    },
};
