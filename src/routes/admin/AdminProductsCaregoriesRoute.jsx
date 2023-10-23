import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react"
import { useProduct } from "@/hooks/useProduct"

export const AdminProductsCategoriesRoute = () => {
  const { data } = useSWR('/categories')
  const { idProduct } = useParams()
  const [product, setProduct] = useState()
  const { findProduct, addProductCategory, deleteProductCategory } = useProduct()

  useEffect(() => {
    upgetProduct()
  }, [])

  const upgetProduct = () => {
    findProduct(idProduct)
      .then(response => {
        if (response.code) {
          // TODO: redirect to products
          return
        }
        setProduct(response)
      })
  }

  return <div>
    <Card className="mb-5">
      <CardHeader className="text-xl font-semibold capitalize">{product?.name}</CardHeader>
    </Card>
    <div className="flex flex-row gap-5">
      <Card className="flex-1">
        <CardHeader className="text-xl font-semibold capitalize">Categorias</CardHeader>
        <CardBody className="gap-2">
          {
            data
              ?.filter(c => !product?.categories.find(pc => pc.id == c.id))
              ?.map(c => <Button onPress={() => addProductCategory(product.id, c.id).then(_ => upgetProduct())}>{c.name}</Button>)
          }
        </CardBody>
      </Card>
      <Card className="flex-1">
        <CardHeader className="text-xl font-semibold capitalize">Categorias del producto</CardHeader>
        <CardBody className="gap-2">
          {product?.categories?.map(c =>
            <Button onPress={() => deleteProductCategory(product.id, c.id).then(_ => upgetProduct())}>{c.name}</Button>)}
        </CardBody>
      </Card>
    </div>
  </div>
}
