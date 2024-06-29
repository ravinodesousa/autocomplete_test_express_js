const { z } = require("zod");
const fs = require("fs");
const path = require("path");
const dataStorePath = path.join(__dirname, "..", "assets", "data.json");

const searchData = (req, res) => {
  try {
    const results = [];

    const searchSchema = z.object({
      search: z.string().min(3, "search keyword should be more then 3 letters"),
    });

    // console.log("req", req.query);
    searchSchema.parse(req.query); // This will throw an error if validation fails

    const searchParam = (req.query?.search ?? "").toLowerCase();

    const parsedData = JSON.parse(fs.readFileSync(dataStorePath, "utf-8"));

    if (parsedData) {
      parsedData?.map((artist) => {
        let artistName = (artist?.name ?? "").toLowerCase();
        if (artistName.includes(searchParam)) {
          results.push({ title: artist?.name, type: "artist" });
        }
        artist?.albums?.map((album) => {
          let albumName = (album?.title ?? "").toLowerCase();
          if (albumName.includes(searchParam)) {
            results.push({ title: album?.title, type: "album" });
          }

          album?.songs?.map((song) => {
            let songName = (song?.title ?? "").toLowerCase();
            if (songName.includes(searchParam)) {
              results.push({ title: song?.title, type: "song" });
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

module.exports = { searchData };
