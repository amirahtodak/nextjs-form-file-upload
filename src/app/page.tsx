import { Separator } from "@/components/ui/separator";
import { MovingWords } from "./(components)/MovingWords";
import { HeroHighlightDemo } from "./(components)/HeroHighlightDemo";

export default function Home() {
  return (
    <main>
      <h1>Hi</h1>
      <p>Component below:</p>
      <hr />
      <MovingWords />
      <Separator className="py-5" />
      <HeroHighlightDemo />
    </main>
  );
}
