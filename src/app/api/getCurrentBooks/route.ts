import { books } from "@/data/books";

export async function GET(request: Request) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomBooks = books.sort(() => Math.random() - 0.5).slice(0, 12);
      const response = new Response(JSON.stringify(randomBooks), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
      resolve(response);
    }, 1000);
  });
}
