import { getCollectionsList } from "@lib/data"
import FeaturedCategories from "@modules/home/components/featured-categories"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import KeyFeatures from "@modules/home/components/key-features"
import SkeletonHomepageProducts from "@modules/skeletons/components/skeleton-homepage-products"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Kyte City: The Future of Delivery in Los Angeles",
  description:
    "Kyte City is here to provide a whole new level of convenience, speed, and efficiency for your deliveries.",
}

export default async function Home() {
  const { collections, count } = await getCollectionsList(0, 3)

  return (
    <>
      <KeyFeatures />
      <Suspense fallback={<SkeletonHomepageProducts count={count} />}>
        <FeaturedProducts collections={collections} />
        <FeaturedCategories />
      </Suspense>
    </>
  )
}
