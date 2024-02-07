const { exec } = require("child_process");

function handleCommand(req, res, config)
{
    const command = config.command;
    if (typeof (command) != "string")
        throw `command of command endpoint must be a string, got ${command}(${typeof (command)})`;

    exec(command, (error, stdout, stderr) => {
        const ret = {
            worked: true,
            error: error,
            stdout: stdout,
            stderr: stderr
        }

        res.status(200)
            .json(ret);
    });
}

exports.handleAny = (req, res, config) =>
{
    const type = config.type;
    if (typeof (type) != "string")
        throw `Type of endpoint must be a string, got ${type}(${typeof(type)})`;

    if (type == "command")
        handleCommand(req, res, config);
    else {
        throw `Unknown command type ${type}.`;
    }
};


exports.handleAnySecured = (req, res, config) => {
    try {
        handleAny(req, res, config);
    } catch (e) {
        console.log(`Catching error: ${e}`)
        res.status(400)
            .json({
                worked: false,
                error: e
            })
    }
};

