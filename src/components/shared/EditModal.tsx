import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
    setShowEditPopup: (value: boolean) => void;
    editBlogTitle: string;
    editBlogContent: string;
    setEditBlogTitle: (value: string) => void;
    setEditBlogContent: (value: string) => void;
    blogEdit: (value: string) => void
    editBlogId: string
};

const EditModal = ({setShowEditPopup,editBlogTitle,editBlogContent,setEditBlogTitle,setEditBlogContent,blogEdit,editBlogId}: Props) => {

  const token = localStorage.getItem("token")

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card className="p-6 w-6/12 flex flex-col gap-6 ">
        <div className="flex flex-col gap-4">
          <Label>Title</Label>
          <Input onChange={(e) => setEditBlogTitle(e.target.value)} value={editBlogTitle} />
          <Label>content</Label>
          <Textarea onChange={(e) => setEditBlogContent(e.target.value)} value={editBlogContent} className="h-96"/>
        </div>

        <div className="flex gap-2">
            <Button onClick={() => {blogEdit(token,editBlogId,editBlogTitle,editBlogContent)}} >Edit</Button>
            <Button onClick={() => {setShowEditPopup(prev => !prev)}} variant={"secondary"}>Cancel</Button>
        </div>
      </Card>
    </div>
  );
};

export default EditModal;
