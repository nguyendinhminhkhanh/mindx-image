import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

interface PostCardProps {
  imageUrl?: string;
  title?: string;
  description: React.ReactNode;
  createdBy: React.ReactNode;
}
export default function PostCard({
  imageUrl,
  title,
  description,
  createdBy,
}: PostCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-2xl shadow-md">
      {/* Ảnh */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nội dung */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-medium text-gray-700">Created by:</span>{" "}
          {createdBy}
        </p>
      </CardContent>
    </Card>
  );
}
