import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner/Banner";

const AdminBannerPage = () => {
    return (
        <DashboardLayout
            title="Banner"
            description="List of all banners, create new category, and manage existing banners"
            type="admin"
        >
            <Banner />
        </DashboardLayout>
    )
}

export default AdminBannerPage;