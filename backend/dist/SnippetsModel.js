"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const snippetSchema = new mongoose_1.default.Schema({
    userId: String,
    snippet: String,
    timestamp: { type: Date, default: new Date().toLocaleDateString('en-US') },
});
const SnippetModel = mongoose_1.default.model('Snippet', snippetSchema);
exports.default = SnippetModel;
