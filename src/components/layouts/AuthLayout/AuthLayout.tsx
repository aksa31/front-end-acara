import PageHead from "@/components/commons/PageHead";

interface PropTypes {
    children: React.ReactNode;
    title?: string;
}

const AuthLayout = ({ children, title }: PropTypes) => {
    return (
        <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py">
            <PageHead title={title} />
            <section className="max-w-screen-2xl 2xl:container p-6">
                {children}
            </section>
        </div>
    )
}

export default AuthLayout;