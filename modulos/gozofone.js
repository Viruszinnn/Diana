const ms = require("parse-ms");
const e = {
  positivo: "โ",
  negativo: "โ",
  aviso: "๐",
  seta1: "โก",
  anel: "๐",
  dinheiro: "๐ธ",
  tempo: "๐",
  tempodelete: 10 * 1000
};

let Tempo = 30 * 60000;

module.exports = {
  name: "gozofone",
  aliases: ["gozofone", "gf"],
  async execute(client, message, args, database) {
    database
      .ref(`Servidores/Cooldown/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        var { body } = await require("snekfetch").get(
          require("../firebase.json").databaseURL +
            "/Servidores/Cooldown/" +
            message.author.id +
            ".json"
        );

        if (body === null) body = "undefined";
        if (body === "undefined") body = 0;
        var prostituir = body.prostituir;
        if (prostituir !== null && Tempo - (Date.now() - prostituir) > 0) {
          const time = ms(Tempo - (Date.now() - prostituir));

          message.channel.send({
            embed: {
              title: message.author.tag,
              description:
                e.tempo +
                " | Aguarde **" +
                `${time.minutes}m ${time.seconds}s` +
                " ** para fazer outro Gozofone novamente"
            }
          });
        } else {
          let Dinheirรฃo = Math.round(Math.random() * 200) + 1000;

          var { body } = await require("snekfetch").get(
            require("../firebase.json").databaseURL +
              "/Servidores/Casamento/" +
              message.author.id +
              ".json"
          );

          if (body === null) body = "undefined";
          if (body === "undefined") body = 0;
          var casado = body.casado;
          var dataCasamento = body.dataCasamento;
          var datanow = body.datanow;
          const time = require("parse-ms")(Date.now() - datanow);
          let Casado = client.users.get(casado);

          if (casado < 1)
            return message.channel.send({
              embed: {
                title: message.author.tag,
                description:
                  e.negativo + ` | vocรช nรฃo estรก casado(a) no momento`
              }
            });

          const random_prostituir = [
            "๐ | Vocรช fez Gozofone com <@" +
              Casado.id +
              "> e ganhou" +
              ` **R$ ${Dinheirรฃo}** `
          ];

          var { body } = await require("snekfetch").get(
            require("../firebase.json").databaseURL +
              "/Servidores/Cooldown/" +
              message.author.id +
              ".json"
          );

          if (body === null) body = "undefined";
          if (body === "undefined") body = 0;
          var prostituir = body.prostituir;

          database
            .ref(`Servidores/Cooldown/${message.author.id}`)
            .update({
              prostituir: (prostituir = Date.now())
            });
          database
            .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
            .once("value")
            .then(async function(snap) {
              database
                .ref(
                  `Servidores/Banco/${message.guild.id}/${message.author.id}`
                )
                .update({
                  dinheiro: snap.val().dinheiro + Dinheirรฃo
                });
              message.channel.send({
                embed: {
                  timestamp: new Date(),
                  title: "๐ | Gozofone",
                  description:
                    random_prostituir[
                      Math.floor(Math.random() * random_prostituir.length)
                    ],
                  footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                  }
                }
              });
            });
        }
      });
  }
};


