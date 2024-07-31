import { NavBar } from "@/components/nav-bar";
import { ModalProvider } from "@/components/providers/modal-provider";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
    return (
        <>
            <NavBar />
            <ModalProvider />
            <main className="w-full pt-[72px]">{children}</main>
        </>
    );
};

export default Layout;
