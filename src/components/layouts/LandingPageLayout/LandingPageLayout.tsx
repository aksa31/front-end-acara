import PageHead from "@/components/commons/PageHead"
import { ReactNode } from "react"
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar"
import LandingPageLayoutFooter from "./LandingPageLayoutFooter"

interface PropTypes {
    title: string
    children: ReactNode
}

const LandingPageLayout = ({ children, title }: PropTypes) => {
    return (
        <>
            <PageHead title={title} />
            <LandingPageLayoutNavbar />
            <div className="py-10">
                {children}
            </div>
            <LandingPageLayoutFooter />
        </>
    )
}

export default LandingPageLayout 