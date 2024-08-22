const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Donne les commandes du bot'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bienvenue sur la page d\'accueil')
            .setDescription('Le préfix du bot fonctionne que avec les **slashcommande**\n> Les __**commandes**__ vont être indiqués de cette façon : </nomdelacommande:1033148801759838268>\n> Ces commandes peuvent être accompagné de fonctions obligatoires ou non. \n\n  **Exemple : /user-info [membre] (nomdel\'utilisateur)**\n\n> La fonction membre est alors obligatoire dans ce cas pour obtenir les informations d\'un membre précis.')
            .setThumbnail('https://media.discordapp.net/attachments/967341416340680764/1272616164887101491/Plan_de_travail_1.png?ex=66c825e9&is=66c6d469&hm=22a056ac439f35d03f50cfcdc5322d8fecc700ec1162f39e08d9f15b779ccd80&')
            .setFooter({ text: `Exécuté par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        const selectMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Sélection des catégories')
                    .addOptions([
                        {
                            label: 'Accueil',
                            value: 'g',
                            emoji: '🏠',
                        },
                        {
                            label: 'Modération',
                            description: 'Commandes de modération',
                            value: 'first_option',
                            emoji: '🔒',
                        },
                        {
                            label: 'Informations',
                            description: 'Commandes pour les informations',
                            value: 'second_option',
                            emoji: '📚',
                        },
                        {
                            label: 'Fun',
                            description: 'Commandes amusantes',
                            value: 'fun',
                            emoji: '⚽',
                        },
                        {
                            label: 'Ticket',
                            description: 'Commande pour créer un ticket',
                            value: 'test',
                            emoji: '📩',
                        },
                        {
                            label: 'Eoly',
                            description: 'Commandes pour avoir des informations sur le bot',
                            value: 't',
                            emoji: '🤖',
                        },
                        {
                            label: 'Fermer',
                            description: 'Fermeture du menu',
                            value: 'close',
                            emoji: '❌',
                        },
                    ]),
            );

        await interaction.reply({ embeds: [helpEmbed], components: [selectMenu] });

        const filter = i => i.customId === 'select' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.values[0] === 'g') {
                helpEmbed.setTitle('Bienvenue sur la page d\'accueil')
                    .setDescription('Le préfix du bot fonctionne que avec les **slashcommande**\n> Les __**commandes**__ vont être indiqués de cette façon : </nomdelacommande:1033148801759838268>\n> Ces commandes peuvent être accompagné de fonctions obligatoires ou non. \n\n  **Exemple : /user-info [membre] (nomdel\'utilisateur)**\n\n> La fonction membre est alors obligatoire dans ce cas pour obtenir les informations d\'un membre précis.')
                    .setFields([]);
            } else if (i.values[0] === 'first_option') {
                helpEmbed.setTitle('Liste des commandes de la catégorie :  Modération 🚨')
                    .setDescription('> </kick:1056868052458807336> : Exclure un membre \n> </ban:1018269038318735440> : Bannir un membre\n> </unban:1018578725308207264> : Débannir un membre\n> </banlist:1056237621917007993> : Liste des membres bannis\n> </mute:1022153219826270350> : Rendre muet un membre\n> </unmute:1022158999124197387> : Demute un membre\n> </lock:1023387905412038668> : Vérouiller un salon\n> </unlock:1023387905412038669> : Déverouiller un salon\n> </embed-builder:1022092106036158534> : Création un message personnalisé\n> </find:1084888010610446457> : Cherche un membre dans un vocale\n> </nick:1054385464569774170> : Changer le pseudo du membre\n> </nuke:1029462218653302905> : Refaire un salon\n> </clear:1019289559881748580> : Supprimer un certain nombre de messages\n> </close:1155128970891763759> : Fermer un thread \n> </finish:1155128970891763760> : Vérouiller un thread\n> </open:1268880119573905519> : Déverouiller un thread\n> </suggestion:1028740785878876233> : Créer une suggestion')
                    .setFields([]);
            } else if (i.values[0] === 'second_option') {
                helpEmbed.setTitle('Liste des commandes de la catégorie : Informations 📑')
                    .setDescription('> </help:1037110901905555498> : Donne les commandes du bot\n> </avatar:1019298600653688872> : Vise un utilisateur pour obtenir son avatar\n> </banner:1028740785878876232> : Donne la bannière dun utilisateur\n> </user-info:1155128970891763756> : Donne toutes les informations du membre\n> </server-info:1037110901905555501> : Affiche les informations du serveur\n> </ping:1017805187974434927> : Affiche la latence du bot')
                    .setFields([]);
            } else if (i.values[0] === 'fun') {
                helpEmbed.setTitle('Liste des commandes de la catégorie : Fun 😜')
                    .setDescription('> </8ball:1019668307474919494> : Posez des questions au bot\n> </slap:1037110901905555500> : Permet de faire une claque à une personne\n> </kiss:1273352265180385310> : Permet de faire un bisous à une personne\n> </qi:1040997904749449318> : Permet de connaître son qi\n> </say:1018266520616452186> : Permet de faire parler le bot\n> </roll:1272720406880452785> : Lance un dé et affiche le résultat\n> </coin:1272724907658186833> : Lance une pièce')
                    .setFields([]);
            } else if (i.values[0] === 'test') {
                helpEmbed.setTitle('Liste des commandes de la catégorie : Ticket 🎫')
                    .setDescription('> </ticket:1040714763124084776> : Envoie le message des tickets')
                    .setFields([]);
            } else if (i.values[0] === 't') {
                helpEmbed.setTitle('Liste des commandes de la catégorie : Eoly 🤖')
                    .setDescription('> </vote:1155128970891763757> : Envoie le liens du bot pour voter\n> </avis:1155128970891763754> : Permet de donner son avis au créateur\n> </invite:1155128970891763755> : Accès au serveur support du bot')
                    .setFields([]);
            } else if (i.values[0] === 'close') {
                await i.update({ content: 'Menu d\'aide fermé.', embeds: [], components: [] });
                return;
            }

            await i.update({ embeds: [helpEmbed], components: [selectMenu] });
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: 'Le temps est écoulé. Utilisez à nouveau la commande /help si nécessaire.', components: [] });
            }
        });
    },
};
