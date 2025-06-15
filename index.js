const { spawn } = require("child_process");
const logger = require("./utils/log");

function startBot(message) {
    const customAsciiArt = `
░█▀█░█░█░█░█░█▄█░█░█░█▀▀░
░█▀█░█░█░█░█░█░█░█░█░▀▀█░
░▀░▀░░▀░░▀▀░░▀░▀░▀▀▀░▀▀▀░
`;
    if (message) logger(`${customAsciiArt}\n${message}`, "[ Bắt Đầu ]");

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (codeExit) => {
        let x = `${codeExit}`;
        if (codeExit === 1) return startBot("Restarting...");
        else if (x.startsWith("2")) {
            await new Promise(resolve => setTimeout(resolve, parseInt(x.slice(1)) * 1000));
            startBot("Open ...");
        } else return;
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
}

startBot();