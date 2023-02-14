import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoteType } from "../utils/types";
import ListItem from "./ListItem";
import axios from "axios";

import Sidebar from "./Sidebar";

const NotesList = ({
	notesList,
	activeNoteId,
	activeCollectionId,
	setActiveNoteId,
}: {
	notesList: NoteType[];
	activeNoteId: number | null;
	activeCollectionId: number;
	setActiveNoteId: (e: number | null) => void;
}) => {
	const queryClient = useQueryClient();
	const deleteNoteMutation = useMutation({
		mutationFn: deleteNoteHandler,
		onSuccess: function (e) {
			const indexOfNote = notesList.indexOf(
				notesList.filter((e) => e.created_at === activeNoteId)[0]
			);
			setActiveNoteId(
				indexOfNote > 0 ? notesList[indexOfNote - 1].created_at : null
			);
			queryClient.invalidateQueries({
				queryKey: ["getCollections"],
			});
		},
	});
	const createNoteMutation = useMutation({
		mutationFn: createNewNoteHandler,
		onSuccess: function (e) {
			queryClient.invalidateQueries({
				queryKey: ["getCollections"],
			});
		},
	});

	async function onSidebarEnter(value: string) {
		createNoteMutation.mutate({
			collection_created_at: activeCollectionId,
			created_at: Date.now(),
			note_body: value,
			note_html_body: value,
		});
	}

	async function createNewNoteHandler(noteBody: NoteType) {
		const { data } = await axios.post("/api/collection/note", noteBody);
		return data as { aknowledged: boolean; inserted_id: number };
	}

	async function deleteNoteHandler({
		collectionCreatedAt,
		noteCreatedAt,
	}: {
		collectionCreatedAt: number;
		noteCreatedAt: number;
	}) {
		const { data } = await axios.delete(
			`/api/collection/note?collectionId=${collectionCreatedAt}&noteId=${noteCreatedAt}`
		);
		return data as { aknowledged: boolean; deleted_count: number };
	}

	return (
		<Sidebar
			onEnter={onSidebarEnter}
			isEnterSuccess={createNoteMutation.isSuccess}
		>
			{notesList.length === 0 && (
				<p className="m-4 font-Satoshi text-gray-600  text-[var(--primary-text-color)] dark:text-[var(--secondary-text-color)]">
					No notes yet!
				</p>
			)}
			{notesList.length >= 0 &&
				notesList.map((note) => (
					<ListItem
						key={note.created_at}
						isActive={activeNoteId === note.created_at}
						itemId={note.created_at}
						onClickHandler={() => setActiveNoteId(note.created_at)}
						onDeleteClickHandler={function () {
							deleteNoteMutation.mutate({
								noteCreatedAt: note.created_at,
								collectionCreatedAt: activeCollectionId,
							});
						}}
						title={note.note_body}
						isDeletable={true}
					/>
				))}
		</Sidebar>
	);
};

export default NotesList;
