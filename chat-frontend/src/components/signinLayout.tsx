import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="background flex flex-col items-center justify-center w-full h-screen"
            style={{ backgroundImage: "url('/jvai.webp')" }}>
            <div className="background flex flex-col items-center justify-center bg-black/60">

                <div className="box1 flex flex-col items-center justify-center bg-[rgb(231,237,245)] rounded-xl w-full xl:w-[30vw] lg:w-[40vw] md:w-[60vw] p-8">
                    {children}

                </div>
            </div>
        </div>   
    );
}
