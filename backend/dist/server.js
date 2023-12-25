"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const SnippetsModel_1 = __importDefault(require("./SnippetsModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: "*",
        // methods: ['GET', 'POST'],
    }
});
const MONGODB_URL = "mongodb+srv://saad76:EKrYWkWPUSQHTLLn@cluster0.wgmqb0q.mongodb.net/";
if (MONGODB_URL === undefined) {
    // window.alert("Invalid Mongodb url !");
    console.log("invalid mogodburl : ", MONGODB_URL);
}
else {
    mongoose_1.default.connect(MONGODB_URL, { dbName: "LabSnippets" });
}
io.on('connection', (socket) => {
    console.log('A user connected : ', socket.id);
    // Listen for chat snippets
    socket.on('snippets', (snippet, room) => __awaiter(void 0, void 0, void 0, function* () {
        // Broadcast the snippets to all connected members
        if (room == "") {
            const newSnippet = new SnippetsModel_1.default({
                snippet: snippet.snippet,
                user: snippet.userId
            });
            try {
                yield newSnippet.save();
                console.log("snippet succesfully saved in db !");
            }
            catch (err) {
                console.log('Error saving Snippets to Database !', err);
            }
            io.emit('snippets', snippet);
        }
        else {
            // Broadcast the snippets to only room members
            socket.to(room).emit('snippets', snippet);
        }
    }));
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
