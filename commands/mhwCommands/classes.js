const request = require("request");
const util = require("./util.js");
const Discord = require("discord.js");
const sqlite3 = require("sqlite3");

class Loadout {
	constructor(name, user) {
		this.userId = user.id;
		this.name = name;
		this.note = " ";
	}

	get userId() {
		return this._userId;
	}

	set userId(userId) {
		this._userId = userId;
	}

	get note() {
		return this._note;
	}

	set note(note) {
		this._note = note;
	}

	checkLoadoutNumber(database) {
		database.get("SELECT COUNT(loadoutId) FROM Loadouts WHERE userId = ?", [this.userId], function(err, result) {
			console.log(result['COUNT(loadoutId)']);
		});
	}

	registerLoadout(database) {
		this.checkLoadoutNumber(database);
		var argsArray = [this.userId,this.name,this.note];
		database.run("INSERT INTO Loadouts(userId,name,note) VALUES(?,?,?)", argsArray, function(err) {
			if(err) return console.log(err.message);
			console.log(`Insertion d'un loadout. Id: ${this.lastID}`);
		});
	}

	static rowToString(row) {
		return `${row.name} - ${Loadout.getSlots(row)}\n`;
	}

	static getSlots(row) {
		var usedSlots = new Array();
		if(row.weapon) usedSlots.push("weapon");
		if(row.charm) usedSlots.push("charm");
		if(row.head) usedSlots.push("head");
		if(row.chest) usedSlots.push("chest");
		if(row.gloves) usedSlots.push("gloves");
		if(row.waist) usedSlots.push("waist");
		if(row.legs) usedSlots.push("legs");

		if(usedSlots.length == 0) return `Loadout is empty. [${row.note}]`;
		else return `Contains: ${usedSlots.join(", ")}. [${row.note}]`
	}
}

module.exports = {
	Loadout: Loadout
}

module.exports.run = async(client, message, args) => {
	//Cette commande doit rester vide
	//C'est un fichier qui contient des commandes utiles
}

module.exports.config = {
	command: "classes"
}