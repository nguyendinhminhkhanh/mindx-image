import { useEffect, useState } from "react";
import { MainLayout } from "../../components/Layout";

// import PostCard from "../../components/PostCard";
import request from "../../api/request";
import PostCard from "../../components/PostCard";
import LoadingPost from "../../components/LoadingPost";
import ServerNotFound from "../../components/ErrorPage/serverNotFound";
import PaginationPage from "../../components/Pagination";
const PAGE_SIZE = 4;

interface Post {
  _id: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  createdBy?: {
    _id: string;
    username: string;
  };
  // bạn có thể thêm các field khác nếu cần
}

export default function PostList() {
  const limit = 4;
  const [status, setStatus] = useState("ilde");
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const maxPage = Math.ceil(total / limit);
  const fetchPosts = async (page: number) => {
    const skip = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    try {
      setStatus("loading");
      const res = await request({
        method: "GET",
        url: "/posts",
        params: {
          skip,
          limit,
        },
      });

      console.log(res);

      if (res?.data?.data) {
        setStatus("Done");
        setTotal(res.data.total);
        setPosts(res.data.data);
        return;
      }
      setStatus("error");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  //Không thể viết như này
  // useEffect(() => {
  //   fetchPosts(1);
  // });
  //Sửa lại như này vì useEffect không trực tiếp gọi hàm chứa setState.
  useEffect(() => {
    const run = async () => {
      await fetchPosts(currentPage);
    };
    run();
  }, [currentPage]);

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  };

  const renderPosts = () => {
    if (status === "error") return <ServerNotFound></ServerNotFound>;
    if (status === "idle" || status === "loading")
      return <LoadingPost></LoadingPost>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            title={post.title}
            description={post.description}
            imageUrl={post.imageUrl}
            createdBy={post.createdBy?.username}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <MainLayout>{renderPosts()}</MainLayout>

      <PaginationPage
        currentPage={currentPage}
        maxPage={maxPage}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleChangePage={handleChangePage}
      ></PaginationPage>
    </div>
  );
}
