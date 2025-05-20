"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import ProductGrid from "../components/ProductGrid"
import { getCollectionByHandle } from "../api/shopifyProducts"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { Skeleton } from "@/components/ui/skeleton"

const fallbackImg = "/fallback-product.png"

function mapShopifyToProductCard(product: any) {
  const mainVariant = product.variants[0] || {}
  return {
    id: product.id,
    name: product.title,
    price: mainVariant.price ? Number.parseFloat(mainVariant.price) : 0,
    image: product.images[0]?.url || fallbackImg,
    hoverImage: product.images[1]?.url || undefined,
    isNew: false,
    isSale: mainVariant.compareAtPrice && mainVariant.compareAtPrice > mainVariant.price,
    salePrice:
      mainVariant.compareAtPrice && mainVariant.compareAtPrice > mainVariant.price
        ? Number.parseFloat(mainVariant.price)
        : undefined,
    itemNo: mainVariant.sku,
    diameter: product.options.find((o: any) => o.name.toLowerCase().includes("size"))?.values[0],
    inStock: mainVariant.quantityAvailable,
    currency: mainVariant.currency || "AED",
    description: product.description,
    handle: product.handle,
  }
}

const Collection = () => {
  const { handle } = useParams<{ handle: string }>()
  const [collection, setCollection] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(30)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchCollection = async () => {
      setIsLoading(true)
      setError(null)
      try {
        if (!handle) {
          throw new Error("Collection handle is required")
        }
        const data = await getCollectionByHandle(handle)
        if (!data) {
          throw new Error("Collection not found")
        }
        setCollection(data)
      } catch (err: any) {
        console.error("Failed to fetch collection:", err)
        setError(err.message || "Failed to fetch collection")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCollection()
  }, [handle])

  // Pagination logic
  const paginatedProducts = useMemo(() => {
    if (!collection?.products) return []
    if (showAll) return collection.products

    const startIndex = (currentPage - 1) * itemsPerPage
    return collection.products.slice(startIndex, startIndex + itemsPerPage)
  }, [collection, currentPage, itemsPerPage, showAll])

  const totalPages = useMemo(() => {
    if (!collection?.products) return 0
    return Math.ceil(collection.products.length / itemsPerPage)
  }, [collection, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleShowAll = () => {
    setShowAll(true)
  }

  // Map products for ProductGrid
  const productGridData = useMemo(() => {
    return paginatedProducts.map(mapShopifyToProductCard)
  }, [paginatedProducts])

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-serif mb-4">Collection Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the collection you're looking for.</p>
          <Link to="/collections" className="fashion-btn">
            Browse All Collections
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/collections" className="text-gray-500 hover:text-brand-green transition-colors">
              Collections
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{collection?.title || "Loading..."}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {isLoading ? (
          // Loading state
          <div className="animate-pulse">
            <div className="h-10 bg-gray-100 w-1/3 mb-4 rounded"></div>
            <div className="h-4 bg-gray-100 w-2/3 mb-12 rounded"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col">
                  <Skeleton className="aspect-square w-full mb-3" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Collection header */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{collection?.title}</h1>
              {collection?.description && (
                <div
                  className="text-gray-600 max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: collection.descriptionHtml || collection.description }}
                />
              )}
            </div>

            {/* Products */}
            {collection?.products?.length > 0 ? (
              <>
                <ProductGrid products={productGridData} columns={4} />

                {/* Pagination controls */}
                {!showAll && collection.products.length > itemsPerPage && (
                  <div className="mt-12">
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      onShowAll={handleShowAll}
                      className="mb-8"
                    />
                  </div>
                )}

                {/* Show message when showing all products */}
                {showAll && collection.products.length > itemsPerPage && (
                  <div className="mt-8 text-center text-sm text-gray-500">
                    Showing all {collection.products.length} products
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">This collection doesn't have any products yet.</p>
                <Link to="/collections" className="fashion-btn">
                  Browse Other Collections
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

export default Collection
