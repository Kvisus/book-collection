"use client";
import { useCart } from "@/components/CartContext";
import ProductList from "@/components/ProductList";

export default function Home() {
  const { state } = useCart();
  console.log(state);
  return (
    <div>
      <h1 className="text-3xl flex justify-center">
        Welcome to The Random Book Store
      </h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, nemo,
        sequi eum omnis voluptates minus vero ipsam ab enim reiciendis rerum
        facere. Esse sunt accusamus reiciendis. Nihil atque consequatur placeat
        illo cum recusandae nesciunt temporibus nostrum? Repellat natus ipsum
        fugiat reiciendis, tempora maxime incidunt tenetur ducimus. Molestiae
        vitae numquam sed.
      </p>
      <ProductList />
    </div>
  );
}
