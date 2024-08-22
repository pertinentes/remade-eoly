const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed-builder')
        .setDescription('Crée un embed personnalisé'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('embedBuilderModal')
            .setTitle('Crée ton embed');

        const titleInput = new TextInputBuilder()
            .setCustomId('embedTitle')
            .setLabel("Quel titre voulez-vous mettre ?")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('embedDescription')
            .setLabel("Quelle description voulez-vous mettre ?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const colorInput = new TextInputBuilder()
            .setCustomId('embedColor')
            .setLabel("Quelle couleur voulez-vous mettre ?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Dans ce format : #3dffcc (facultatif)")
            .setRequired(false);

        const footerInput = new TextInputBuilder()
            .setCustomId('embedFooter')
            .setLabel("Quel footer voulez-vous mettre ?")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const timestampInput = new TextInputBuilder()
            .setCustomId('embedTimestamp')
            .setLabel("Voulez-vous mettre le timestamp ?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("oui/non (facultatif)")
            .setRequired(false);

        const titleRow = new ActionRowBuilder().addComponents(titleInput);
        const descriptionRow = new ActionRowBuilder().addComponents(descriptionInput);
        const colorRow = new ActionRowBuilder().addComponents(colorInput);
        const footerRow = new ActionRowBuilder().addComponents(footerInput);
        const timestampRow = new ActionRowBuilder().addComponents(timestampInput);

        modal.addComponents(titleRow, descriptionRow, colorRow, footerRow, timestampRow)
        await interaction.showModal(modal);
    },
};

