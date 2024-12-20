import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
    setShowEditPopup: (value: boolean) => void;
};

const EditModal = ({setShowEditPopup}: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card className="p-6 w-6/12 flex flex-col gap-6 ">
        <div className="flex flex-col gap-4">
          <Label>Title</Label>
          <Input />
          <Label>content</Label>
          <Textarea className="h-96"/>
        </div>

        <div className="flex gap-2">
            <Button >Edit</Button>
            <Button onClick={() => {setShowEditPopup(prev => !prev)}} variant={"secondary"}>Cancel</Button>
        </div>
      </Card>
    </div>
  );
};

export default EditModal;
