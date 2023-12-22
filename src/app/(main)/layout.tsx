import AnnouncementsBanner from "@modules/layout/components/announcements-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnnouncementsBanner />
      <Nav />
      {children}
      <Footer />
    </>
  )
}
