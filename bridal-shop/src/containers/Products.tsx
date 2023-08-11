'use client';
import { Filter } from "@/components/Filter";
import { Footer } from "@/components/Footer";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import { Product } from "@/types/Products";
import { useEffect, useState } from "react";

const url = 'http://localhost:3333';

interface IProps {
  title: string;
  urlType: string;
  type: string;
}

export function Products({urlType, type, title}: IProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredAccessories = products.filter(a => a.category.includes(category) ? a : '');
  const currentProducts = filteredAccessories.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    async function getProducts(){
      setLoading(true);
      fetch(`${url}/product/${urlType}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(data => {
        setLoading(false);
        if(data) {
          setProducts(data);
        }
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
    getProducts()
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