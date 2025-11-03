import { Link } from "react-router-dom";
import { paths } from "@/config/paths";

export default function Home() {
  return (
    <div className="flex gap-3 justify-center p-6">
      <Link to={paths.admin.getHref()}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          어드민 페이지로 이동
        </button>
      </Link>
      <Link to={paths.user.getHref()}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          유저 페이지로 이동
        </button>
      </Link>
    </div>
  );
}
