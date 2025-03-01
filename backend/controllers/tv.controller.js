import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)]; // random select movie

    res.json({
      succuss: true,
      content: randomMovie,
    });
  } catch (error) {
    res.this.status(500).json({
      succuss: false,
      message: "Internal server Error",
    });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ succuss: true, trailers: data.results });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ succuss: false, message: "Internal server Error" });
  }
}

export async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-U`
    );
    res.status(200).json({ succuss: true, content: data });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({
      succuss: false,
      message: "Internal Server Error",
    });
  }
}

export async function getSimilarTv(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({
      succuss: true,
      similar: data.results,
    });
  } catch (error) {
    res.status(500).json({
      succuss: false,
      message: "Internal server Error",
    });
  }
}

export async function getTvByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ succuss: true, content: data.results });
  } catch (error) {
    res.status(500).json({
      succuss: false,
      message: "Internal server Error",
    });
  }
}
