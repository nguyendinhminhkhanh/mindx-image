import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

interface PostCardProps {
  imageUrl?: string;
  title?: string;
  description: React.ReactNode;
  createdBy: React.ReactNode;
  postId: React.ReactNode;
  createdAt?: string;
}

export default function PostCard({
  imageUrl,
  title,
  description,
  createdBy,
  postId,
  createdAt,
}: PostCardProps) {
  const [likeCount, setLikeCount] = useState(0);
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
    <Card className="w-full max-w-sm overflow-hidden rounded-2xl shadow-md">
      {/* Ảnh */}
      <div className="w-full h-48 overflow-hidden">
        <Link to={`/posts/${postId}`}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Nội dung */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold line-clamp-1">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-justify line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-medium text-gray-700">Created by:</span>{" "}
          {createdBy}
        </p>
      </CardContent>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Xem chi tiết</Button>
        </DialogTrigger>

        <DialogContent
          className="max-w-5xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Chi tiết sản phẩm</DialogTitle>
            <DialogDescription className="sr-only">
              Xem thông tin chi tiết, bình luận và lượt thích của sản phẩm
            </DialogDescription>
          </DialogHeader>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: Image + Actions */}
            <div className="space-y-6">
              {/* Image */}
              <div className="rounded-xl border bg-muted/20 p-4 flex justify-center">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full max-w-sm rounded-lg object-cover"
                />
              </div>
            </div>
            {/* RIGHT: Info */}
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div>
                <p className="text-sm text-muted-foreground">Tên sản phẩm</p>
                <h2 className="text-2xl font-semibold leading-tight">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          <Separator />
          {/* Description */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Mô tả</p>
            <p className="text-sm leading-relaxed text-justify">
              {description}
            </p>
          </div>

          <Separator />

          {/* Like */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLike}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Heart className={`w-4 h-4 ${loading ? "animate-pulse" : ""}`} />
              {loading ? "Đang like..." : "Like"}
            </Button>
            <span className="text-sm text-muted-foreground">
              {likeCount} lượt thích
            </span>
            <p>
              <span className="text-muted-foreground">Người tạo:</span>{" "}
              {createdBy}
            </p>
          </div>
          {/* Meta */}
          <div className="text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">Ngày tạo:</span>{" "}
           
                {createdAt
                  ? new Date(createdAt).toLocaleString("vi-VN")
                  : "Chưa có thời gian"}
           
            </p>
          </div>
          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <Zap className="w-4 h-4" /> Mua ngay
            </Button>
            <Button className="gap-2">
              <ShoppingCart className="w-4 h-4" /> Giỏ hàng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
