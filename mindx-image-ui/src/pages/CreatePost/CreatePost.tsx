import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { MainLayout } from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import request from "../../api/request";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

// type Tag = {
//   name: string;
// };

export default function CreatePost() {
  const navigator = useNavigate();
  const [title, setTitle] = useState("");
  // const [tags, setTags] = useState<Tag[]>([]);
  // const [currentTag, setCurrentTag] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  //upload image function cloudinary
  const uploadImage = async (): Promise<string> => {
    if (!image) throw new Error("No image selected");
    const formData = new FormData();
    formData.append("file", image as Blob);

    setIsUploading(true); // ⬅️ START LOADING

    try {
      const res = await request({
        url: "/upload",
        method: "POST",
        data: formData,
      });
      console.log(res);
      return res.url; // Trả về URL của hình ảnh đã tải lên
    } finally {
      setIsUploading(false); // ⬅️ END LOADING (kể cả lỗi)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();

      const res = await request({
        url: "/posts",
        method: "POST",
        data: {
          title,
          // tags,
          description,
          imageUrl: imageUrl, // SỬ DỤNG URL ẢNH Ở ĐÂY
        },
      });

      toast.success("success posts.");
      console.log(res);
      navigator("/");
    } catch (error) {
      console.log(error);
      toast.error("Error posts!");
    }
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="flex justify-center mt-10 pb-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Create Post</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* cần làm chứa năng thêm tag , backend thêm chức năng Create Tags (nếu có rồi thì dùng luôn, chưa có thì tạo tag) */}
            {/* Tag */}
            {/* <div className="space-y-2">
              <Label htmlFor="tags">Tag</Label>
              <Input
                placeholder="Nhập tag rồi Enter"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && currentTag.trim()) {
                    e.preventDefault();
                    setTags([...tags, { name: currentTag.trim() }]);
                    setCurrentTag("");
                  }
                }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted rounded text-sm"
                >
                  #{tag.name}
                </span>
              ))}
            </div> */}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Post description."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>

              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition"
              >
                <span className="text-sm text-muted-foreground">
                  Click to upload image
                </span>
                {image && (
                  <span className="mt-2 text-xs text-primary">
                    {image.name}
                  </span>
                )}
              </label>

              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </MainLayout>
  );
}
