import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

// footer에 총 도서의 수를 표시하기
async function Footer() {
  // request memoization으로 동일한 주소로의 api 요청은 한 번만 이루어짐
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );
  if (!response.ok) {
    return <footer>제작 @zzionie</footer>;
  }
  const books: BookData[] = await response.json();
  const bookCount = books.length;
  return (
    <footer>
      <div>제작 @zzionie</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
