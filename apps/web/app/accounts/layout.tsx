import { Header } from "../../components/header";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="px-3 lg-px-14">
                {children}
            </main>
        </>
    )
}

export default AccountLayout;