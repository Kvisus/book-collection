"use client";
import { useEffect, useState } from "react";
import { books, Book } from "../data/books";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState<Book[]>([]);

  const fetchProducts = async () => {
    try {
      setProducts([]);
      const response = await fetch(`/api/getCurrentBooks`);
      const data = await response.json();
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="my-4 text-2xl text-center">Here are our books</h2>

      <button
        disabled={products.length === 0}
        onClick={fetchProducts}
        className="btn btn-active btn-primary"
      >
        {products.length === 0 ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Randomize"
        )}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 && (
          <span className="loading loading-infinity loading-lg"></span>
        )}
        {products.map((book) => (
          <ProductCard key={book.isbn} {...book} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
