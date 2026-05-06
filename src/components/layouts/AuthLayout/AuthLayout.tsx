import PageHead from "@/components/commons/PageHead";

interface PropTypes {
    children: React.ReactNode;
    title?: string;
}

const AuthLayout = ({ children, title }: PropTypes) => {
    return (
        <>
            <PageHead title={title} />
            <section className="max-w-screen-3xl 3xl:container p-6">
                {children}
            </section>
        </>
    )
}

export default AuthLayout;