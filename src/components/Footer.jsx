import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Github, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-[100px] w-full border-t border-dashed border-[#fff]/15 bg-[#282932] px-2 md:px-4">
      <div className="mx-auto grid max-w-[1570px] gap-12 pb-[40px] pt-[60px] md:grid-cols-[1.5fr_0.5fr_0.5fr]">
        <div className="not-prose flex flex-col gap-6">
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-[120px] transition-all hover:opacity-75 dark:invert"
            />
          </Link>

          <div className="flex flex-col gap-2">
            <p className="max-w-[600px] text-muted-foreground">
              33 New Montgomery St. CA, USA
            </p>
            <p className="max-w-[600px] text-muted-foreground">
              artistic@exampledemo.com
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="mb-[1rem] text-white">Menu</h5>
          <Link href="/" className="text-muted-foreground">
            Blog
          </Link>
          <Link href="/" className="text-muted-foreground">
            Authors
          </Link>
          <Link href="/" className="text-muted-foreground">
            Categories
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="mb-[1rem] text-white">Legal</h5>
          <Link href="/privacy-policy" className="text-muted-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-muted-foreground">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="text-muted-foreground">
            Cookie Policy
          </Link>
        </div>
      </div>
      <div className="not-prose mx-auto flex max-w-[1570px] flex-col justify-between gap-6 border-t border-dashed border-[#9a9ca9] py-[24px] md:flex-row md:items-center md:gap-2">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Github />
          </Button>

          <Button variant="outline" size="icon">
            <Twitter />
          </Button>

          <Button variant="outline" size="icon">
            <Facebook />
          </Button>
        </div>

        <p className="text-muted-foreground">
          © Shohan. All rights reserved. 2024-present.
        </p>
      </div>
    </footer>
  );
}
