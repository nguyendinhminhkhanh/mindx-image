import { MainLayout } from "../../components/Layout";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { ShoppingCart, Zap } from "lucide-react";
import { Separator } from "@radix-ui/react-menubar";
import { Button } from "../../components/ui/button";
import { Heart } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import request from "../../api/request";
import LoadingPost from "../../components/LoadingPost";
import io from "socket.io-client";
import type { User } from "../../hook/useAuth";
type Post = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  likeCount: number;
  createdBy: {
    username: string;
  };
};

type Comment = {
  _id: string;
  content: string;
  createdBy: {
    _id: string;
    username: string;
  };
  createdAt: string;
};

export default function PostDetail() {
  const socket = io("http://localhost:3000");
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  
  // const [postInfo, setPostInfo] = useState({ status: "idle" });
  const [listCommentInfo, setListCommentInfo] = useState({
    status: "idle",
    comments: [] as Comment[],
  });
  const [loading, setLoading] = useState(true);
  // const product = {
  //   title: "Tai nghe Bluetooth Pro X",
  //   description:
  //     "Tai nghe Bluetooth Pro X mang đến chất lượng âm thanh vượt trội, thời lượng pin dài và thiết kế hiện đại. Phù hợp cho học tập, làm việc và giải trí hàng ngày.",
  //   price: "1.290.000đ",
  //   image: "https://images.unsplash.com/photo-1585386959984-a4155228c0c1",
  //   likeCount: 128,
  //   createdBy: "Admin",
  // };

  useEffect(() => {
    const fetchUserInfor = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const res = await request({
          url: "/auth/me",
          method: "GET",
        });
        if (res.success) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfor();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      setListCommentInfo({ status: "loading", comments: [] });
      try {
        const res = await request({
          method: "GET",
          url: `/posts/${id}/comments`,
        });
        if (res.success) {
          console.log("Danh sách bình luận:", res.data);
          setListCommentInfo({
            status: "done",
            comments: res.data,
          });
          return;
        }

        setListCommentInfo({ status: "error", comments: [] });
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error);
        setListCommentInfo({ status: "error", comments: [] });
      }
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await request({
          method: "GET",
          url: "/posts/" + id,
        });

        // axios interceptor của bạn đã return res.data
        // nên res chính là data backend trả về
        setPost(res.data);
        console.log("Post detail:", res.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    socket.on("data", (data) => {
      console.log("comment hiên thị :   ", data);
      console.log("setlistCOmment", listCommentInfo);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleNewComment = (data: Comment) => {
      setListCommentInfo((prev) => ({
        ...prev,
        status: "done",
        content: [...prev.comments, data],
      }));
    };

    socket.on("data", handleNewComment);

    return () => {
      socket.off("data", handleNewComment);
    };
  }, [socket]);

  if (loading) {
    return (
      <MainLayout>
        <LoadingPost></LoadingPost>
        <div className="text-center py-20">Đang tải dữ liệu...</div>
      </MainLayout>
    );
  }
  if (!post) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-red-500">
          Không tìm thấy bài viết
        </div>
      </MainLayout>
    );
  }

  const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("id bai viet ", id);
    console.log(listCommentInfo);

    const commentContent = formData.get("comment") as string;
    console.log("Nội dung bình luận của socket:", commentContent);

    socket.emit("sendComment", {
      content: commentContent,
      createdBy: {
        _id: user?._id,
        username: user?.username,
      },
      postId: id,
    });

    console.log("sendComment", commentContent);

    e.currentTarget.reset();

    // try {
    //   const res = request({
    //     method: "POST",
    //     url: `/comment`,
    //     data: {
    //       postId: id,
    //       content: commentContent,
    //     },
    //   });
    //   console.log("Kết quả gửi bình luận:", res);
    // } catch (error) {
    //   console.error("Lỗi khi gửi bình luận:", error);
    // }
  };

  return (
    <div>
      <MainLayout>
        <div className="container mx-auto py-10">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-8 space-y-10">
              {/* TOP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* IMAGE */}
                <div className="rounded-xl border bg-muted/20 p-6 flex justify-center">
                  <img
                    src={post?.imageUrl}
                    alt={post?.title}
                    className="w-full max-w-md rounded-xl object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tên sản phẩm
                    </p>
                    <h1 className="text-3xl font-bold leading-tight">
                      {post?.title}
                    </h1>
                  </div>

                  <p className="text-2xl font-semibold text-green-600">
                    1000.000đ
                  </p>

                  <h2 className="font-semibold">Mô tả chi tiết:</h2>
                  <p className="text-sm leading-relaxed text-justify text-muted-foreground">
                    {post?.description}
                  </p>

                  {/* META */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>{post?.likeCount} lượt thích</span>
                    </div>
                    <p>
                      <span className="text-muted-foreground">Người tạo:</span>{" "}
                      {post?.createdBy.username}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button className="gap-2">
                      <Zap className="w-4 h-4" /> Mua ngay
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ShoppingCart className="w-4 h-4" /> Giỏ hàng
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* COMMENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* DESCRIPTION */}
                <div>
                  <h2 className="font-semibold mb-2">Mô tả chi tiết</h2>
                  <p className="text-sm leading-relaxed text-justify text-muted-foreground">
                    {post?.description}
                  </p>
                </div>

                {/* COMMENT BOX */}
                <div className="space-y-4">
                  <h2 className="font-semibold">Bình luận</h2>
                  <form onSubmit={submitComment} className="flex gap-2">
                    <Input
                      name="comment"
                      placeholder="Viết bình luận..."
                      required
                    />
                    <Button>Gửi</Button>
                  </form>
                  <div className="h-48 space-y-3 overflow-y-auto rounded-md border p-4 text-sm">
                    {listCommentInfo.comments.map((c) => (
                      <div key={c._id} className="border-b pb-2">
                        <p className="font-medium">
                          {c.createdBy.username} -{" "}
                          <span className="text-sm text-muted-foreground">
                            {new Date(c.createdAt).toLocaleString("vi-VN")}
                          </span>{" "}
                        </p>
                        <div>
                          <p
                            className={`text-muted-foreground ${
                              expanded ? "" : "line-clamp-2"
                            }`}
                          >
                            {c.content}
                          </p>

                          {c.content.length > 100 && (
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="text-sm hover:underline mt-1 font-bold text-muted-foreground"
                            >
                              {expanded ? "- Thu gọn" : "+ Xem thêm"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </div>
  );
}
