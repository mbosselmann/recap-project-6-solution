import dbConnect from "@/db/dbConnect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  const { id } = request.query;

  await dbConnect();

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);

    response.status(200).json({ status: "OK. Place " + id + " updated." });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ status: "OK. Place " + id + " deleted." });
  }
}
