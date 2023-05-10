import commander from "commander";

/**
 * Be able to use Command with rawArgs property
 */
export class CommandWithRawArgs extends commander.Command {
    rawArgs: string[];
}
