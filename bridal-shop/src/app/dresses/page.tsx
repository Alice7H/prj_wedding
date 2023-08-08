'use client';
import { ProductList } from "@/components/ProductList";
import { Footer } from "@/components/Footer";
import { Pagination } from "@/components/Pagination";
import { Product } from "@/types/Products";
import { useEffect, useState } from "react";

const url = 'http://localhost:3333';

export default function Dresses() {
  const [dresses, setDresses] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = dresses.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    async function getProducts(){
      setLoading(true);
      fetch(`${url}/product/dresses`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(data => {
        setLoading(false);
        if(data) {
          setDresses(data);
        }
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
    getProducts()
  }, [])

  const paginateFront = () => {
    if(indexOfLastProduct < dresses.length){
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
        <h1 className="text-main text-center text-title font-bold mt-8 mb-4">Vestidos</h1>
        <ProductList loading={loading} products={currentProducts}/>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={dresses.length}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={currentPage}
        />
      </main>
      <Footer />
    </>
  );
}