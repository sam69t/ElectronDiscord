const { Client, MessageEmbed } = require("discord.js");
const { Notification, ipcMain } = require("electron");
const robot = require("robotjs");

class DiscordBot {
  constructor(
    win,
    token = "ODE1ODYyODIyNjM3Nzk3Mzg4.YDyldg.kt48FRMAfskKJMm3WWZPgROnXIc"
  ) {
    this.win = win;
    this.token = token;
    this.client = new Client();

    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
  }

  onReady() {
    console.log("I am ready!");
  }

  showNotification(message = "Notification from the Main process") {
    const notification = {
      title: "Basic Notification",
      body: message,
    };
    new Notification(notification).show();
  }

  onMessage(message) {
    /**
     * EXEMPLE
     */
    if (message.content.includes("🍩")) {
      this.showNotification("donuts have been sent from discord");
      const donuts = message.content.split("🍩");
      console.log(donuts);
      const count = donuts.length;
      // We can create embeds using the MessageEmbed constructor
      // Read more about all that you can do with the constructor
      // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
      const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle("YOU SEEM TO LIKE DONUTS !")
        // Set the color of the embed
        .setColor(0xffffff)
        // Set the main content of the embed
        .setDescription("I've counted, " + (count - 1) + " 🍩. Bon appetit");
      // Send the embed to the same channel as the message
      message.channel.send(embed);
    }

    if (message.content.includes("start")) {
      console.log("robot");

      // this.showNotification("Robot rocks!");
      this.win.webContents.send("start", "whoooooooh!");
    }

    if (message.content.includes("Q")) {
      console.log("robot");

      // this.showNotification("Robot rocks!");
      this.win.webContents.send("filter1", "whoooooooh!");
    }

    if (message.content.includes("W")) {
      console.log("robot");

      // this.showNotification("Robot rocks!");
      this.win.webContents.send("filter2", "whoooooooh!");
    }

    if (message.content.includes("E")) {
      console.log("robot");

      // this.showNotification("Robot rocks!");
      this.win.webContents.send("filter3", "whoooooooh!");
    }

    if (message.content.includes("R")) {
      console.log("robot");

      // this.showNotification("Robot rocks!");
      this.win.webContents.send("filter4", "whoooooooh!");
    }

    if (message.content.includes("1")) {
      console.log("robot");

      // this.showNotification("Robot rocks!");
      this.win.webContents.send("1", "whoooooooh!");
    }

    if (message.content.includes("2")) {
      console.log("pomme");

      // this.showNotification("Robot rocks!");
      this.win.webContents.send("2", "wooush!");
    }

    if (message.content.includes("3")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("3");
    }

    //
    ///

    if (message.content.includes("4")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("4");
    }
    if (message.content.includes("5")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("5");
    }
    if (message.content.includes("6")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("6");
    }

    if (message.content.includes("7")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("7");
    }
    if (message.content.includes("8")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("8");
    }
    if (message.content.includes("9")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("9");
    }
    if (message.content.includes("10")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("10");
    }
    if (message.content.includes("11")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("11");
    }
    if (message.content.includes("12")) {
      this.showNotification("Like from discord");

      this.win.webContents.send("12");
    }
  }
}

module.exports = { DiscordBot };
