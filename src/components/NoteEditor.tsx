import { useEffect, useState } from "react";
import { NoteType } from "../utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import CryptoCore from "crypto-js/core";

import "react-quill/dist/quill.snow.css";

const NoteEditor = ({
	activeNote,
	onActiveNoteBodyChange,
}: {
	activeNote: NoteType;
	onActiveNoteBodyChange: (value: string, htmlValue: string) => void;
}) => {
	const queryClient = useQueryClient();
	const [editorText, setEditorText] = useState(activeNote.note_html_body);
	const debouncedNoteMutationHandler = useDebouncedCallback(
		(obj: NoteType) => updateNoteMutation.mutate(obj),
		1000
	);
	const updateNoteMutation = useMutation({
		mutationFn: sendUpdatedNoteBodyToDB,
		onSuccess: function (e) {
			queryClient.invalidateQueries({ queryKey: ["getCollections"] });
		},
	});

	async function sendUpdatedNoteBodyToDB(obj: NoteType) {
		const { data } = await axios.put("/api/collection/note", obj);
		return data;
	}

	function noteChangeHandler(value: string, htmlValue: string) {
		onActiveNoteBodyChange(value, htmlValue);
		const newNote: NoteType = {
			collection_created_at: activeNote.collection_created_at,
			created_at: activeNote.created_at,
			note_body: value,
			note_html_body: htmlValue,
		};
		debouncedNoteMutationHandler(newNote);
	}

	useEffect(() => {
		setEditorText(activeNote.note_html_body);
	}, [activeNote]);

	return (
		<div className="w-4/6 sm:w-full">
			<ReactQuill
				key={activeNote.created_at}
				className="h-full w-full resize-none p-4 pt-0 outline-none 
          dark:text-[var(--secondary-text-color)]"
				value={editorText}
				onChange={(value, delta, source, editor) => {
					setEditorText(value);
					let editorText = editor.getText();
					if (editorText.includes("\n")) {
						const idx = editorText.indexOf("\n");
						editorText = editorText.slice(0, idx) + editorText.slice(idx + 1);
					}

					const data = CryptoCore.enc.Utf8.parse(editorText);
					const decryptedData = CryptoCore.enc.Utf8.stringify(data);
					console.log(data.toString(), decryptedData);

					// noteChangeHandler(editorText, editor.getHTML());
				}}
			/>
		</div>
	);
};

export default NoteEditor;
