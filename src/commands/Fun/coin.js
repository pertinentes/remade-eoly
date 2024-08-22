
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('Lance une pièce'),

    async execute(interaction) {
        const author = interaction.user;
        const result = Math.random() < 0.5 ? 'Pile' : 'Face';
        const imageUrl = result === 'Pile' 
            ? 'https://media.discordapp.net/attachments/967341416340680764/1272725619830034442/pile-removebg-preview.png?ex=66c88bd9&is=66c73a59&hm=cd006052483261b58844ecb5822c9c61656a5a48c3a32eb7582d92fec81511bb&format=webp&quality=lossless&'
            : 'https://media.discordapp.net/attachments/967341416340680764/1272725610556428370/face-removebg-preview.png?ex=66c88bd7&is=66c73a57&hm=be47401d7656753bb785dc0ff3ba4e0045ee4cfb856ff30ef3841ff31b133604&format=webp&quality=lossless&';

        const embed = {
            color: 0x3498db,
            title: '💸 Résultat du pile ou face',
            description: `Vous avez obtenu un **${result}** !`,
            image: {
                url: imageUrl
            },
            timestamp: new Date(),
            footer: {
                text: `Exécuté par ${author.globalName || author.username}`,
                iconURL: author.displayAvatarURL({ dynamic: true })
            }
        };

        await interaction.reply({ embeds: [embed] });
    },
};
