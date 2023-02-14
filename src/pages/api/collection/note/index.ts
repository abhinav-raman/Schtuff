import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { NoteType } from "../../../../utils/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { db } = await connectToDatabase();

	switch (req.method) {
		// case "GET": {
		// 	try {
		// 		const response = await db.collection("notes").find().toArray();
		// 		res.status(200).json(response);
		// 	} catch (e) {
		// 		console.log(e);
		// 		res.status(404).json({ message: e });
		// 	}
		// 	break;
		// }

		case "POST": {
			const note = req.body;
			const parentCollectionid = note.collection_created_at;

			try {
				const sample = await db
					.collection("notes")
					.updateOne(
						{ created_at: parentCollectionid },
						{ $push: { notes_list: note } }
					);
				res.status(200).json(sample);
			} catch (e) {
				console.log(e);
				res.status(404).json({ message: e });
			}
			break;
		}

		case "PUT": {
			const body: NoteType = req.body;

			try {
				const response = await db.collection("notes").updateOne(
					{
						created_at: body.collection_created_at,
					},
					{
						$set: {
							"notes_list.$[elem].note_body": body.note_body,
							"notes_list.$[elem].note_html_body": body.note_html_body,
						},
					},
					{
						arrayFilters: [{ "elem.created_at": body.created_at }],
					}
				);
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
			const { collectionId, noteId } = req.query;
			if (
				typeof collectionId === "undefined" ||
				typeof collectionId === "object" ||
				typeof noteId === "undefined" ||
				typeof noteId === "object"
			) {
				res.status(404).json({ message: "Invalid id" });
				return;
			}

			const payload = { created_at: parseInt(collectionId) };
			try {
				const response = await db
					.collection("notes")
					.updateOne(
						{ created_at: parseInt(collectionId) },
						{ $pull: { notes_list: { created_at: parseInt(noteId) } } }
					);
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
