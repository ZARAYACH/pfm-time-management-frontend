import {ApiContextRef} from "@/app/ApiContext";
import {Api} from "@/app/Api";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ApiContextRef.Provider value={new Api()}>
            <html lang="en">
            <body>
            {children}
            </body>
            </html>

        </ApiContextRef.Provider>
    );
}
