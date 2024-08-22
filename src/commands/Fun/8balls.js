const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Pose des questions au bot')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('text à dire')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const responses = [
            "Certainement",
            "Sans aucun doute",
            "Oui, définitivement",
            "Vous pouvez compter dessus",
            "Très probablement",
            "Oui",
            "Les signes pointent vers oui",
            "Réponse floue, essayez à nouveau",
            "Demandez à nouveau plus tard",
            "Mieux vaut ne pas vous le dire maintenant",
            "Impossible de prédire maintenant",
            "Concentrez-vous et demandez à nouveau",
            "N'y comptez pas",
            "Ma réponse est non",
            "Mes sources disent non",
            "Les perspectives ne sont pas si bonnes",
            "Très douteux",
            "Bien-sûr"
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .addFields(
                { name: '🎱 Question :', value: `\`\`\`${question}\`\`\``, inline: false },
                { name: 'Réponse :', value: `\`\`\`${response}\`\`\``, inline: false }
            )
            .setFooter({ text: `Exécuté par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
