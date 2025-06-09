const fs = require('fs');
const readline = require('readline');

const mode = process.argv[2]; // Ex: node diary.js show

if (mode === 'show') {
  // Visa tidigare anteckningar
  fs.readFile('entries.txt', 'utf8', (err, data) => {
    if (err) {
      console.error("❌ Kunde inte läsa filen.");
    } else {
      console.log("📖 Dina dagboksanteckningar:\n");
      console.log(data);
    }
  });
} else {

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const today = new Date().toLocaleDateString();
let logEntry = `\n[${today}]\n`;

console.log("📘 Skriv dina dagboksanteckningar. Skriv 'exit' för att avsluta.\n");

rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        fs.appendFile("entries.txt", logEntry, (err) => {
            if (err) {
                console.error("❌ Kunde inte spara inlägget.");
            } else {
                console.log("✅ Inlägg sparat i entries.txt!");
            }
            rl.close();
        });
    } else {
        logEntry += `${input}\n`;
    }
});

rl.on('close', () => {
    console.log("👋 Tack för att du skrev i din dagbok!");
}); 
}
// Om inget mode anges, skriv en ny anteckning
