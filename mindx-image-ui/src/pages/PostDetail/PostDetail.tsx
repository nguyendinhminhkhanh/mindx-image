import { MainLayout } from "../../components/Layout";
import { useParams } from "react-router-dom";
export default function PostDetail() {
  const { id } = useParams();
  return (
    <div>
      <MainLayout>
        {" "}
        <div>Đay là trang postDetail {id}</div>
      </MainLayout>
    </div>
  );
}
