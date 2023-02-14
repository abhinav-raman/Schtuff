import dynamic from "next/dynamic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Sidebar = dynamic(() => import("./Sidebar"));
const ListItem = dynamic(() => import("./ListItem"));
import { CollectionType, User } from "../utils/types";

const CollectionsList = ({
	collectionsList,
	activeCollectionId,
	setActiveCollectionId,
	user,
}: {
	collectionsList: CollectionType[];
	activeCollectionId: number | null;
	setActiveCollectionId: (e: number | null) => void;
	user: User;
}) => {
	const queryClient = useQueryClient();
	const createCollectionMutation = useMutation({
		mutationFn: createNewCollectionHandler,
		onSuccess: function (e) {
			queryClient.invalidateQueries({ queryKey: ["getCollections"] });
		},
	});
	const deleteCollectionMutation = useMutation({
		mutationFn: clickDeleteCollectionHandler,
		onSuccess: () => {
			const indexOfNote = collectionsList.indexOf(
				collectionsList.filter((e) => e.created_at === activeCollectionId)[0]
			);
			setActiveCollectionId(
				indexOfNote > 0 ? collectionsList[indexOfNote - 1].created_at : null
			);
			queryClient.invalidateQueries({ queryKey: ["getCollections"] });
		},
	});

	async function clickDeleteCollectionHandler(collectionCreatedAt: number) {
		const { data } = await axios.delete(
			`/api/collection?id=${collectionCreatedAt}`
		);
		return data as { aknowledged: boolean; deletedCount: number };
	}

	async function createNewCollectionHandler(collectionBody: CollectionType) {
		const { data } = await axios.post("/api/collection", collectionBody);
		return data as { aknowledged: boolean; inserted_id: number };
	}

	function onSidebarEnter(value: string) {
		createCollectionMutation.mutate({
			created_at: Date.now(),
			folder_name: value,
			notes_list: [],
			isDefault: false,
			added_by: user || null,
		});
	}

	return (
		<Sidebar
			onEnter={onSidebarEnter}
			isEnterSuccess={createCollectionMutation.isSuccess}
		>
			{collectionsList.length === 0 && (
				<p className="m-4 font-Satoshi text-[var(--primary-text-color)] dark:text-[var(--secondary-text-color)]">
					No collections yet!
				</p>
			)}
			{collectionsList.length >= 0 &&
				collectionsList.map((collection) => (
					<ListItem
						key={collection.created_at}
						isActive={activeCollectionId === collection.created_at}
						itemId={collection.created_at}
						onClickHandler={() =>
							activeCollectionId !== collection.created_at &&
							setActiveCollectionId(collection.created_at)
						}
						onDeleteClickHandler={() =>
							deleteCollectionMutation.mutate(collection.created_at)
						}
						title={collection.folder_name}
						isDeletable={!collection.isDefault}
					/>
				))}
		</Sidebar>
	);
};

export default CollectionsList;
