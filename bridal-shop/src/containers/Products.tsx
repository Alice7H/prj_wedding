'use client';
import { Filter } from "@/components/Filter";
import { Footer } from "@/components/Footer";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/Products";
import { useEffect, useState } from "react";

interface IProps {
  title: string;
  urlType: string;
  type: string;
}

export function Products({urlType, type, title}: IProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredAccessories = products.filter(a => a.category.includes(category) ? a : '');
  const currentProducts = filteredAccessories.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    async function getDressesOrAccessories(){
      try{
        const data = await getProducts(urlType);
        if(data) setProducts(data);
      } catch(err) {
        console.error(err);
      };
      setLoading(false);
    }
    getDressesOrAccessories()
  }, [urlType])

  const paginateFront = () => {
    if(indexOfLastProduct < products.length){
      setCurrentPage(currentPage + 1);
    }
  }
  const paginateBack = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  if (loading) {
    return <h2 className="text-center text-main font-bold">Carregando...</h2>;
  }

  return (
    <>
      <main>
        <h1 className="text-main text-center text-title font-bold mt-8 mb-4">{title}</h1>
        <Filter category={category} handleCategory={setCategory} type={type}/>
        <ProductList
          loading={loading}
          products={currentProducts}
          urlType={urlType}
        />
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={currentPage}
        />
      </main>
      <Footer />
    </>
  );
}