export type NoteType = {
	created_at: number;
	note_body: string;
	note_html_body: string;
	collection_created_at: number;
};

export type CollectionType = {
	created_at: number;
	folder_name: string;
	notes_list: NoteType[];
	isDefault: boolean;
	added_by: User;
};

export type SidebarType = {
	onEnter: (value: string) => void;
	children: React.ReactNode;
	isEnterSuccess: boolean;
};

export type User = {
	email: string;
	name: string;
	image: string;
};
