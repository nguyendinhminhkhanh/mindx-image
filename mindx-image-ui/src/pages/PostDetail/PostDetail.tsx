import { MainLayout } from "../../components/Layout";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "@radix-ui/react-menubar";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Heart } from "lucide-react";
import { Badge } from "../../components/ui/badge";
export default function PostDetail() {
  const { id } = useParams();
  const product = {
    imageUrl: "https://picsum.photos/200/300",
    title: "test 100",
    description: "Vien nam",
    likeCount: 0,
    tags: [],
    createdBy: "693ada92b9146a5afebe991d",
    _id: "695a8f84ca6e0cea67ea65c0",
    createdAt: "2026-01-04T16:04:20.348Z",
    updatedAt: "2026-01-04T16:04:20.348Z",
  };

  const [likeCount, setLikeCount] = useState(product.likeCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);

    // Giả lập gọi API
    setTimeout(() => {
      setLikeCount((prev) => prev + 1);
      setLoading(false);
    }, 800);
  };

  return (
    <div>
      <MainLayout>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Xem chi tiết</Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Chi tiết sản phẩm</DialogTitle>
            </DialogHeader>

            {/* Layout 2 cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT: Image */}
              <div className="flex justify-center items-start">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full max-w-sm rounded-lg border object-cover"
                />
              </div>

              {/* RIGHT: Info */}
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <p className="text-sm text-muted-foreground">Tên sản phẩm</p>
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-muted-foreground">Mô tả</p>
                  <p>{product.description}</p>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.length ? (
                      product.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          #{tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Không có tag
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Like */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleLike}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Heart
                      className={`w-4 h-4 ${loading ? "animate-pulse" : ""}`}
                    />
                    {loading ? "Đang like..." : "Like"}
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    {likeCount} lượt thích
                  </span>
                </div>

                <Separator />

                {/* Meta */}
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Người tạo:</span>{" "}
                    {product.createdBy}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Ngày tạo:</span>{" "}
                    {new Date(product.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </MainLayout>
    </div>
  );
}
