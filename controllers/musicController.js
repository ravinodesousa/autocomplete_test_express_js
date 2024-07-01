const { z } = require("zod");
const fs = require("fs");
const path = require("path");
const dataStorePath = path.join(__dirname, "..", "assets", "data.json");

const getAutocompleteSuggestions = (req, res) => {
  try {
    const results = [];

    const searchSchema = z.object({
      keyword: z
        .string()
        .min(3, "search keyword should be more then 3 letters"),
    });

    // console.log("req", req.query);
    searchSchema.parse(req.query); // This will throw an error if validation fails

    const searchKeyword = (req.query?.keyword ?? "").toLowerCase();

    const parsedData = JSON.parse(fs.readFileSync(dataStorePath, "utf-8"));

    if (parsedData) {
      parsedData?.map((artist) => {
        let artistName = (artist?.name ?? "").toLowerCase();
        if (artistName.startsWith(searchKeyword)) {
          results.push({
            title: artist?.name,
            type: "artist",
          });
        }
        artist?.albums?.map((album) => {
          let albumName = (album?.title ?? "").toLowerCase();
          if (albumName.startsWith(searchKeyword)) {
            results.push({
              title: album?.title,
              type: "album",
            });
          }

          album?.songs?.map((song) => {
            let songName = (song?.title ?? "").toLowerCase();
            if (songName.startsWith(searchKeyword)) {
              results.push({
                title: song?.title,
                type: "song",
              });
            }
          });
        });
      });
    }

    return res.status(200).json({
      data: results,
    });
  } catch (e) {
    console.error("Validation error:", e); // can be replaced with a remote error loggin service
    return res.status(500).json({ message: "Error occured. Please try again" });
  }
};

const getSearchedData = (req, res) => {
  try {
    let result = null;

    const searchSchema = z.object({
      keyword: z.string().min(1, "search keyword is required"),
      type: z.string().min(1, "type is required"),
    });

    // console.log("req", req.query);
    searchSchema.parse(req.query); // This will throw an error if validation fails

    const searchKeyword = (req.query?.keyword ?? "").toLowerCase();
    const searchType = req.query?.type ?? "";

    const parsedData = JSON.parse(fs.readFileSync(dataStorePath, "utf-8"));

    if (parsedData) {
      parsedData?.map((artist) => {
        if (searchType == "artist") {
          let artistName = (artist?.name ?? "").toLowerCase();
          if (artistName.startsWith(searchKeyword)) {
            result = {
              artistName: artist?.name,
              albums: artist?.albums,
              type: "artist",
            };
          }
        }
        artist?.albums?.map((album) => {
          if (searchType == "album") {
            let albumName = (album?.title ?? "").toLowerCase();
            if (albumName.startsWith(searchKeyword)) {
              result = {
                artistName: artist?.name,
                album: album,
                type: "album",
              };
            }
          }

          album?.songs?.map((song) => {
            if (searchType == "song") {
              let songName = (song?.title ?? "").toLowerCase();
              if (songName.startsWith(searchKeyword)) {
                result = {
                  artistName: artist?.name,
                  albumName: album?.title,
                  song: song,
                  type: "song",
                };
              }
            }
          });
        });
      });
    }

    return res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.error("Validation error:", e); // can be replaced with a remote error loggin service
    return res.status(500).json({ message: "Error occured. Please try again" });
  }
};

module.exports = { getAutocompleteSuggestions, getSearchedData };
