import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeContextProvider } from "../context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DarkThemeContextProvider } from "../context/DarkThemeContext";
import { SidebarContextProvider } from "../context/SidebarContent";
import { ThemeProvider } from "@/components/theme-provider";

function MyApp({
    Component,
    pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SidebarContextProvider>
                        <Component {...pageProps} />
                    </SidebarContextProvider>
                </ThemeProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
