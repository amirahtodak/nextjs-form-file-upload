import { Separator } from "@/components/ui/separator";
import DropZone from "./DropZone";

export default function FormPage() {
  return (
    <div>
      <h1>DropZone File</h1>

      {/* FormFileTemplate with file and with zod */}
      <DropZone/>
    </div>
  );
}
