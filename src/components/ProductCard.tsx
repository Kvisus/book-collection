import { Book } from "@/data/books";
import { FC } from "react";
import { useCart } from "./CartContext";
import { log } from "console";
const ProductCard: FC<Book> = (book) => {
  const { state, dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: book });
  };
  // console.log(state);
  return (
    <div className="card md:w-96 bg-base-300 shadow-xl" key={book.isbn}>
      <figure className="mt-4">
        <img src={book.thumbnailUrl} alt="Book Picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center">{book.title}</h2>
        <p>
          {book.shortDescription ||
            "There is no description, but we hope that this book is awesome"}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              console.log("clicked", book.isbn);
              // console.log(state);
              handleAddToCart();
            }}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
