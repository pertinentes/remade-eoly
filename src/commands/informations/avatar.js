const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Donner l\'avatar d\'un utilisateur')
        .addUserOption(option => 
            option.setName('membre')
                .setDescription('L\'utilisateur pour son avatar')
                .setRequired(false)),

    async execute(interaction) {
        const target = interaction.options.getUser('membre') || interaction.user;
        const avatarUrl = target.displayAvatarURL({ size: 1024, dynamic: true });

        const embed = new EmbedBuilder()
            .setTitle(`L'avatar de ${target.username}`)
            .setImage(avatarUrl)
            .setFooter({ text: `Exécuté par ${interaction.user.username}` })
            .setTimestamp();

        const pngButton = new ButtonBuilder()
            .setLabel('PNG')
            .setStyle(ButtonStyle.Link)
            .setURL(target.displayAvatarURL({ size: 1024, format: 'png' }));

        const jpgButton = new ButtonBuilder()
            .setLabel('JPG')
            .setStyle(ButtonStyle.Link)
            .setURL(target.displayAvatarURL({ size: 1024, format: 'jpg' }));

        const jpegButton = new ButtonBuilder()
            .setLabel('JPEG')
            .setStyle(ButtonStyle.Link)
            .setURL(target.displayAvatarURL({ size: 1024, format: 'jpeg' }));

        const row = new ActionRowBuilder()
            .addComponents(pngButton, jpgButton, jpegButton);

        await interaction.reply({ 
            embeds: [embed], 
            components: [row], 
            ephemeral: true 
        });
    },
};
