import { cn } from "@/utils/utils";
import {
    ButtonHTMLAttributes,
    ForwardRefExoticComponent,
    LegacyRef,
    forwardRef,
} from "react";

const ButtonItem: ForwardRefExoticComponent<
    ButtonHTMLAttributes<HTMLButtonElement>
> = forwardRef(
    ({ children, className, title, ...props }, ref: LegacyRef<HTMLButtonElement>) => {
        return (
            <button {...props} ref={ref} className={cn(
                "group flex items-center w-full px-3.5 py-1.5 rounded-full border-2 border-transparent base2 font-semibold transition-colors hover:bg-n-2 tap-highlight-color dark:hover:bg-n-6 dark:hover:text-n-1 text-n-4 !border-primary-1 text-n-7 !bg-n-1 dark:!bg-transparent dark:text-n-1",
                className
            )}>
                <h1 className="text-xl font-bold">{title}</h1>
                {children}
            </button>
        );
    }
);

export default ButtonItem;
