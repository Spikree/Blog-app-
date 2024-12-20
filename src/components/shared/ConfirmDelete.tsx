import { Button } from "../ui/button"
import { Card } from "../ui/card"


type Props = {
  setShowDeletePopUp: (value: boolean) => void; 
  blogDelete: (blogId: string) => Promise<void>;
  blogId: string
}

const ConfirmDelete = ({setShowDeletePopUp, blogDelete,blogId}: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card className="p-8 flex flex-col gap-4">
            <h1>Do you wanna delete this blog??</h1>
            <div className="flex gap-3">
                <Button variant={"destructive"} onClick={() => {blogDelete(blogId)}}>Delete</Button>
                <Button onClick={() => {setShowDeletePopUp((prev) => !prev)}}>Cancel</Button>
            </div>
        </Card>
    </div>
  )
}

export default ConfirmDelete