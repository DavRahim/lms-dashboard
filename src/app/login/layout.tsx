import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Learning Login | RS LMS",
    description: "E-Learning is platform for student to learn and get help form teachers",
    keywords: "Programming, Redux, Next js, Javascript"
};


type Props = {};

const LoginLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <>{children}</>;
};

export default LoginLayout;
