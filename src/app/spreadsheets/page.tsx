import { Button } from "@/components/ui/button";
import { getSheetData } from "@/lib/google-sheets.action";

export default function Page() {
  const handleOnGetSheetDataClick = async () => {
    const response = await getSheetData();
    console.log(response);
  };

  return <Button onClick={handleOnGetSheetDataClick}>Get Sheet Data</Button>;
}
