import { Header } from "@/components/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="px-3 lg-px-14">
                {children}
            </main>
        </>
    )
}

export default HomeLayout;