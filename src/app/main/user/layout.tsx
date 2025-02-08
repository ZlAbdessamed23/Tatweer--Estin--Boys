"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SpanLink({ href, path, children }: { href: string, path: string, children: React.ReactNode }) {
    const isSelected = path === href;
    return (
        <Link href={href}>
            <span className="relative">
                {isSelected && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ width: 0 }}
                        className="absolute -bottom-2 left-0 h-1 bg-purple-600 rounded-xl"
                    />
                )}
                <span className={`relative text-lg font-semibold ${isSelected ? "text-purple-600" : "text-main-blue"} mt-1`}>{children}</span>
            </span>
        </Link>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();
    return (
        <div>
            <div className='border-b border-b-gray-300 h-11 flex justify-start items-end gap-6 mb-4'>
                <SpanLink href="/main/user/profile" path={path}>Edit Profile</SpanLink>
                <SpanLink href="/main/user/settings" path={path}>Preferences</SpanLink>
            </div>
            {children}
        </div>
    );
};

export default Layout;
