import PageHead from "@/components/commons/PageHead"
import { ReactNode } from "react"
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar"

interface PropTypes {
    title: string
    children: ReactNode
}

const LandingPageLayout = ({ children, title }: PropTypes) => {
    return (
        <>
            <PageHead title={title} />
            <LandingPageLayoutNavbar />
            <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
                {children}
            </div>
        </>
    )
}

export default LandingPageLayout 