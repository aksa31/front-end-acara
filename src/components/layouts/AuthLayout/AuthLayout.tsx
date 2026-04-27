import PageHead from "@/components/commons/PageHead";

interface PropTypes {
    title? : string;
    children: React.ReactNode;
}

const AuthLayout = ({title, children} : PropTypes) => {
    return (
        <>
        <PageHead title={title}/>
        <section className="max-w-screen-3xl 3xl:container p-6">
            {children}
        </section>
        </>
    )
}

export default AuthLayout;