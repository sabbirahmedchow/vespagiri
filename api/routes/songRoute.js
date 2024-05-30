const { Router } = require("express");
const songController = require("../controller/songController");
const { authenticateToken } = require("../controller/authController");

const route = Router();

route.post("/new_song", authenticateToken, songController.newSong);
route.post("/getYoutubeMp3", authenticateToken, songController.getYoutubeMp3);
route.post("/saveSong", authenticateToken, songController.saveSong);
route.post("/getSongs", authenticateToken, songController.getSongs);
route.post("/getGenre", songController.getGenre);
route.post("/getSongsByGenre", songController.getSongsByGenre);
route.post("/getRandomSongs", songController.getRandomSongs);
route.post("/getPartialSongsHome", songController.getPartialSongsHome);
route.post("/checkIfSongExist", songController.checkIfSongExist);
route.post("/findSongandSave", authenticateToken, songController.findSongandSave);
route.post("/delSong", songController.delSong);
route.post("/searchSong", songController.searchSong);

module.exports = route;