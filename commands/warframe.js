module.exports.run = async(client, message, args) => {
	//Déclaration des modules à utiliser (NPM)
	const Discord = require("discord.js");
	const WorldState = require('warframe-worldstate-parser');
	const fs = require("fs");
	//Déclaration des modules à utiliser (custom)
	const util = require("./warframeCommands/util.js");
	//Déclaration des bases de données JSON
	const config = require("../json/config.json");
	//Déclaration de la requête URL
	
	//const market = require("./warframeCommands/marketPlace.js");

	if(args[0].match(/sellers[0-9]*/gm)) var element = "sellers";
	else var element = args[0];

	var cmd = client.warcommands.get(element);
	if(cmd) cmd.run(client, message, args);
	else message.channel.send("Erreur de commande");
	
	/*
		switch(element)
		{
			case 'voidtrader':
				message.channel.send(util.voidTrader(ws.voidTrader,ws.timestamp));
			break;

			case 'find':
				if(!args[1]) return message.channel.send("Renseignez une recherche !");
				var search = util.stringifyArray(args.slice(1));
				market.find(client,message,search);
			break;
			
			//supprimer l'underscore dans la regex
			case String(element.match(/sellers[0-9]*_/gm)):

				if(args[0].slice(7) == "") var page = 1;
				else var page = args[0].slice(7);

				if(!args[1]) return message.channel.send("Renseignez un objet à rechercher !");
				var search = util.urlConvert(args.slice(1));

				market.sellers(client, message, search, page);
			break;

			case 'fissures':
				var totalFissures = ws.fissures.length;
				var generatedTime = util.timeString(ws.timestamp);
				var string = `= Etat des fissures (${generatedTime}): ${totalFissures} fissures actives =\n`;
				for(var i=0; i<totalFissures; i++) string+=util.fissureInfo(ws.fissures[i]);

				message.channel.send(util.convertAsciidoc(string));
			break;

			case 'help':
				message.channel.send(util.commandList());
			break;

			default:
				message.channel.send("Commande inconnue.\nEffectuez `"+config.prefix+"warframe` pour afficher la liste des commandes disponibles pour Warframe.");
			break;
		}
		Normalement ça devrait foirer
	*/
}

module.exports.config = {
	command: "warframe",
	syntax: "warframe {élément | optionnel}",
	description: "Affiche l'état actuel du monde de Warframe sur PC."
}