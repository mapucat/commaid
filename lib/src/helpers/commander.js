"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandWithRawArgs = void 0;
const commander_1 = __importDefault(require("commander"));
/**
 * Be able to use Command with rawArgs property
 */
class CommandWithRawArgs extends commander_1.default.Command {
}
exports.CommandWithRawArgs = CommandWithRawArgs;
//# sourceMappingURL=commander.js.map