import { Separator } from "@/components/ui/separator";
import { MovingWords } from "./(components)/MovingWords";
import { HeroHighlightDemo } from "./(components)/HeroHighlightDemo";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <hr />
      <Separator className="py-5" />
      <HeroHighlightDemo />
      <div className="text-center">
        <p>send form to email with upload file as pdf + form zod validation</p>
        <Link href={"/form-zod"} className="underline hover:text-orange-500">
          to the form page
        </Link>
      </div>
    </main>
  );
}
