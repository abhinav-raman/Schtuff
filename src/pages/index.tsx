import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Header from "../components/Header";
import CollectionsList from "../components/CollectionsList";
import NotesList from "../components/NotesList";
import LoadingIndicator from "../components/LoadingIndicator";
import { CollectionType, NoteType, User } from "../utils/types";
import NoteEditor from "../components/NoteEditor";
import UserLogin from "../components/UserLogin";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { BASE_PATH } from "../utils/constants";
import { SidebarContext } from "../context/SidebarContent";
import MobileMenu from "../components/MobileMenu";

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { req, res } = context;

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );

    const user = await unstable_getServerSession(req, res, authOptions);

    if (!user || !user.user || !user.user.email) {
        return {
            props: {
                user: null as User | null,
                collectionsListData: [],
            },
        };
    }
    const { email } = user.user;
    const fetchURL = new URL(`${BASE_PATH}/api/collection`);
    fetchURL.searchParams.append("email", email);
    try {
        const data = await (
            await fetch(fetchURL, {
                method: "GET",
            })
        ).json();
        return {
            props: {
                user: user.user as User | null,
                collectionsListData: data as CollectionType[],
            },
        };
    } catch (e) {
        console.log(e);
        return {
            props: {
                user: user.user as User | null,
                collectionsListData: [] as CollectionType[],
            },
        };
    }
};

const Home = ({
    collectionsListData,
    user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const queryClient = useQueryClient();
    const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

    const [isMobileMenuVisible, setIsMobileMenuVisible] =
        useState<boolean>(false);
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["getCollections"],
        initialData: collectionsListData,
        queryFn: async () => {
            if (!user?.email) return [];

            const { email } = user;
            const fetchURL = new URL(`${BASE_PATH}/api/collection`);
            fetchURL.searchParams.append("email", email);
            const { data } = await axios.get(fetchURL.toString());
            return data as CollectionType[];
        },
    });
    const [activeCollectionId, setActiveCollectionId] = useState<number | null>(
        collectionsListData?.[0]?.created_at
    );
    const [activeNoteId, setActiveNoteId] = useState<number | null>(
        collectionsListData?.[0]?.notes_list[0]?.created_at
    );

    function activeNoteBodyChangeHandler(
        noteBody: string,
        noteHtmlBody: string
    ) {
        queryClient.setQueryData(
            ["getCollections"],
            data.map((c) => {
                return c.created_at === activeCollectionId
                    ? {
                          ...c,
                          notes_list: c.notes_list.map((n) => {
                              return n.created_at === activeNoteId
                                  ? {
                                        ...n,
                                        note_body: noteBody,
                                        note_html_body: noteHtmlBody,
                                    }
                                  : n;
                          }),
                      }
                    : c;
            })
        );
    }

    return (
        <>
            <Head>
                <title>Schtuff</title>
                <meta name="description" content="A modern note taking app" />
            </Head>

            <main className="flex h-screen w-full overflow-hidden">
                {isMobileMenuVisible && (
                    <MobileMenu
                        showMenu={isMobileMenuVisible}
                        user={user || null}
                    />
                )}
                {user ? (
                    <>
                        <LoadingIndicator />
                        <div
                            className={`sidebar-container flex w-1/3 snap-x gap-x-4 p-4 backdrop-blur-sm transition-all duration-200 sm:absolute sm:z-10 sm:w-full sm:overflow-x-scroll ${
                                isSidebarOpen ? "left-0" : "left-[-160vw]"
                            }`}
                        >
                            <CollectionsList
                                collectionsList={data}
                                activeCollectionId={activeCollectionId}
                                setActiveCollectionId={(collId) => {
                                    setActiveCollectionId(collId);
                                    setActiveNoteId(null);
                                }}
                                user={user}
                            />
                            {activeCollectionId && (
                                <NotesList
                                    notesList={
                                        data.filter(
                                            (i) =>
                                                i.created_at ===
                                                activeCollectionId
                                        )[0]?.notes_list || ([] as NoteType[])
                                    }
                                    activeNoteId={activeNoteId}
                                    activeCollectionId={activeCollectionId}
                                    setActiveNoteId={setActiveNoteId}
                                />
                            )}
                        </div>

                        <section className="flex w-2/3 h-full flex-col gap-y-4 py-4 pr-4">
                            <Header
                                user={user}
                                onMenuBtnClick={() =>
                                    setIsMobileMenuVisible(!isMobileMenuVisible)
                                }
                            />
                            {activeNoteId && (
                                <NoteEditor
                                    activeNote={
                                        data
                                            .filter(
                                                (i) =>
                                                    i.created_at ===
                                                    activeCollectionId
                                            )?.[0]
                                            ?.notes_list.filter(
                                                (j) =>
                                                    j.created_at ===
                                                    activeNoteId
                                            )[0] || ({} as NoteType)
                                    }
                                    onActiveNoteBodyChange={
                                        activeNoteBodyChangeHandler
                                    }
                                />
                            )}
                        </section>
                    </>
                ) : (
                    <UserLogin />
                )}
            </main>
        </>
    );
};

export default Home;
