import { Separator } from "@/components/ui/separator";
import FormFileTemplate from "./(component)/FormFileTemplate";
import FormTemplate from "./(component)/FormTemplate";

export default function FormPage() {
  return (
    <div>
      <h1>Form</h1>
      {/* FormTemplate without file upload function + zod */}
      <FormTemplate />
      {/* FormFileTemplate with file but without zod */}
      <br />
      <Separator className="py-4 bg-orange-300" />
      <br />
      <FormFileTemplate />
    </div>
  );
}
