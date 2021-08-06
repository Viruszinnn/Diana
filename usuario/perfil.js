const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const fs = require("fs");
//const Canvas = require("canvas");
const firebase = require("../firebase.json");
const db = firebase.databaseURL;
module.exports = {
  name: "perfil",
  aliases: ["perfil", "profile"],
  async execute(client, message, args, database, mdk) {
    let user =
      message.guild.members.get(args[0]) ||
      message.mentions.users.first() ||
      message.author;

    let av = user.avatarURL || "https://loritta.website/assets/img/unknown.png";

    var { body } = await snekfetch.get(
      db + "/Servidores/Perfil2/" + `${user.id ? user.id : user}` + ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var imagemperfil = body.imagemperfil;
    var sobremim = body.sobremim;

    var { body } = await snekfetch.get(
      db +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        `${user.id ? user.id : user}` +
        ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var dinheiro = body.dinheiro;
    var dindin = body.dindin;

    var { body } = await snekfetch.get(
      db +
        "/Servidores/Perfil/" +
        message.guild.id +
        "/" +
        `${user.id ? user.id : user}` +
        ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    let mensagens = body.mensagens;
    let level = body.level;
    let xp = body.xp;
    let baseado = body.baseados;

    var { body } = await snekfetch.get(
      db +
        "/Servidores/Criminal/" +
        message.guild.id +
        "/" +
        `${user.id ? user.id : user}` +
        ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    let batalhas = body.batalhas;
    let duelos = body.duelos;

    var { body } = await snekfetch.get(
      db +
        "/Servidores/Profissão/" +
        message.guild.id +
        "/" +
        `${user.id ? user.id : user}` +
        ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    let profissão = body.trabalho;

    if (profissão === "1") profissão = "Lixeiro";
    if (profissão === "2") profissão = "Jornaleiro";
    if (profissão === "3") profissão = "Sorveteiro";
    if (profissão === "4") profissão = "Fotográfo";
    if (profissão === "5") profissão = "PizzaBoy";
    if (profissão === "6") profissão = "Barman";
    if (profissão === "7") profissão = "Taxista";
    if (profissão === "8") profissão = "Transportador";
    if (profissão === "9") profissão = "Motorista Particular";
    if (profissão === "10") profissão = "Petroleiro";
    if (profissão === "11") profissão = "Transportador de Drogas";
    if (profissão === "12") profissão = "Mecânico";
    if (profissão === "13") profissão = "Bombeiro";
    if (profissão === "14") profissão = "Terrorista";
    if (profissão === "15") profissão = "Assassino";
    if (profissão === "16") profissão = "Chefe da Mafia";
    if (profissão === "17") profissão = "Advogado";
    if (profissão === "18") profissão = "Polícia Militar";
    if (profissão === "19") profissão = "Delegado";
    if (profissão === "20") profissão = "Motorista de Carro Forte";
    if (profissão === "666") profissão = "Criador da Diana";

    var { body } = await snekfetch.get(
      db + "/Servidores/Casamento/" + `${user.id ? user.id : user}` + ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var casado = body.casado;

    var { body } = await snekfetch.get(
      db + "/Duckets/" + `${user.id ? user.id : user}` + ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    let duckets = body.duckets;

    var { body } = await snekfetch.get(
      db +
        "/Servidores/Armas/" +
        message.guild.id +
        "/" +
        `${user.id ? user.id : user}` +
        ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    let Arma = body.arma;
    if (Arma === 1) Arma = "Revolver 38";
    if (Arma === 2) Arma = "Pistola Desert Eagle";
    if (Arma === 3) Arma = "Escopeta Shotgun";
    if (Arma === 4) Arma = "Fuzil AK-47";

    if (user.bot)
      return message.channel.send("❌" + " | Bots não possui um perfil");

    let random_imgperfil = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQyWZ68ZRO_rfcPG0Qea8XBrgP7NmSx5ok6thOCoIgZnOrZOaWq&usqp=CAU",
      "https://i.imgur.com/n2Smalz.jpg",
      "https://i0.wp.com/lendasdeazeroth.com.br/wp-content/uploads/2018/06/Warchief-Sylvanas-Correventos-01.jpg?fit=1917%2C795&ssl=1"
    ];
/*
    const canvas = Canvas.createCanvas(1020, 420);
    const c = canvas.getContext("2d");
    const bg = await Canvas.loadImage(
      `${
        imagemperfil
          ? imagemperfil
          : random_imgperfil[
              Math.floor(Math.random() * random_imgperfil.length)
            ]
      }`
    );
    c.drawImage(bg, 0, 0, 1020, 420);
    const Attachment = new Discord.Attachment(canvas.toBuffer(), "profile.png");
*/
    const membro = client.users.get(`${user.id ? user.id : user}`);

    message.channel.send({"embed":{
      title: "Perfil",
      fields: [
        {name: "💵 | **Carteira:**","value": `${dinheiro ? `${require("currency-formatter").format(dinheiro, { code: "de-DE", symbol: "R$ ", precision: 0})}` : "R$ 0"}`,"inline": true},
        {name: "💵 | **Banco:**","value": `${dindin ? `${require("currency-formatter").format(dindin, { code: "de-DE", symbol: "R$ ", precision: 0})}` : "R$ 0"}`,"inline": true},
        {name: "🔆 | **Level:**","value": `${level ? `${require("currency-formatter").format(level, { code: "de-DE", precision: 0})}` : "0"}`,"inline": true},
        {name: "💠 | **Duckets:**","value": `${duckets ? `${require("currency-formatter").format(duckets, { code: "de-DE", precision: 0})}` : "0"}`,"inline": true},
        {name: "💼 | **Profissão:**","value": `${profissão ? `${profissão}` : "Mendigo(a)"}`,"inline": true},
        {name: `💍 | ${casado ? "**Casado(a) com:**" : "**Relacionamento:**"}`,"value": `${casado ? `<@${casado}>` : "Solteiro(a)"}`,"inline": true},
        {name: "🔫 | **Arma:**","value": `${Arma ? `${Arma}` : "Desarmado(a)"}`,"inline": true},
        {name: "💭 | **Sobre Mim:**","value": `${sobremim ? `${sobremim}` : "Mendreik é o meu Criador ❤️"}`,"inline": false}         
        ]/*,      
        file: Attachment,
        image: {
          url: "attachment://profile.png"
        }*/,
      footer: {
        text: "use: imgperfil ou sobremim para personalizar"
      }
    }})
  }
};
