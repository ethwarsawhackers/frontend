import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import ourIcon from "./icon.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "dQuiz",
  description: "Generated by create next app",
  manifest: "/manifest.json",
  icon: { apple: "/icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Link href="/">
            <Image
              priority
              src={ourIcon}
              alt="Magnetify"
              className="nav-icon"
            ></Image>
          </Link>
          <h2 href="/" className="icon-name">
            Magnetify
          </h2>
        </header>
        {children}

        <footer class="footer">
          <div class="waves">
            <div class="wave" id="wave1"></div>
            <div class="wave" id="wave2"></div>
            <div class="wave" id="wave3"></div>
            <div class="wave" id="wave4"></div>
          </div>
          <ul class="social-icon">
            <li class="social-icon__item">
              <a class="social-icon__link" href="#">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li class="social-icon__item">
              <a class="social-icon__link" href="#">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li class="social-icon__item">
              <a class="social-icon__link" href="#">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
            <li class="social-icon__item">
              <a class="social-icon__link" href="#">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
          </ul>
          <ul class="menu">
            <li class="menu__item">
              <a class="menu__link" href="#">
                Home
              </a>
            </li>
            <li class="menu__item">
              <a class="menu__link" href="#">
                About
              </a>
            </li>
            <li class="menu__item">
              <a class="menu__link" href="#">
                Services
              </a>
            </li>
            <li class="menu__item">
              <a class="menu__link" href="#">
                Team
              </a>
            </li>
            <li class="menu__item">
              <a class="menu__link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <p>&copy;2023 Magnetify</p>
        </footer>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        ></script>
      </body>
    </html>
  );
}
