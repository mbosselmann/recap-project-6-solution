import dbConnect from "@/db/dbConnect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    if (!places) {
      return response.status(404).json({ status: "Not found" });
    }
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const place = await Place.create(request.body);
      return response.status(201).json(place);
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ status: "Bad request", error: error.message });
    }
  }
}
