import Link from "@/components/base/Link";
import { SearchBar } from "@/components/base/SearchBar";
import { getDatasets } from "@/services/dataset_service";
import { getUser } from "@/utils/get_user";

export default async function NotFound() {
  const datasets = await getDatasets();
  const user = await getUser();
  return (
    <>
      <div className="container text-center min-h-screen text-lg flex justify-center items-center flex-col py-8">
        Oops! You seem to have lost your way. Let&apos;s get you back on track.
        <br />
        <Link href="/" className="text-primary">
          Return home
        </Link>
      </div>
    </>
  );
}
