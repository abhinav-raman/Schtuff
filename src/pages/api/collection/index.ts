import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";
import { CollectionType } from "../../../utils/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { db } = await connectToDatabase();

	switch (req.method) {
		case "GET": {
			const { email } = req.query;
			try {
				const response = (
					await db
						.collection("notes")
						.find({ "added_by.email": email })
						.toArray()
				).sort((a, b) => b.created_at - a.created_at);
				res.status(200).json(response);
			} catch (e) {
				console.log(e);
				res.status(404).json({ message: e });
			}
			break;
		}

		case "POST": {
			const collection = req.body;

			try {
				const response = await db.collection("notes").insertOne(collection);
				res.status(200).json(response);
			} catch (e) {
				console.log(e);
				res.status(404).json({ message: e });
			}
			break;
		}

		case "PUT": {
			const { id } = req.query;
			const updatedName = req.query.updatedName;

			try {
				const response = await db
					.collection("notes")
					.updateOne({ _id: id }, { $set: { folder_name: updatedName } });
				res.status(200).json(response);
			} catch (e) {
				console.log(e);
				res.status(404).json({ message: e });
			}
			break;
		}

		/* 
      @param {string} id - The id of the collection to delete
    */

		case "DELETE": {
			const { id } = req.query;
			if (typeof id === "undefined" || typeof id === "object") {
				res.status(404).json({ message: "Invalid id" });
				return;
			}
			const payload = { created_at: parseInt(id) };
			try {
				const response = db.collection("notes").deleteOne(payload);
				res.status(200).json(response);
			} catch (e) {
				console.log(e);
				res.status(404).json({ message: e });
			}
			break;
		}
	}

	req.statusCode = 200;
}
