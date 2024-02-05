import { cn } from "@/utils/utils";
import React from "react";

type ButtonListProps = {
    children: React.ReactNode;
};

export default function ButtonList({ children}: ButtonListProps) {
    return <div className={cn()}>{children}</div>;
}
