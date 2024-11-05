import Link from "@/components/base/Link";
import { SearchBar } from "@/components/base/SearchBar";
import { getDatasets } from "@/services/dataset_service";
import { getUser } from "@/utils/get_user";
import { ButtonBase } from "@/components/base/ButtonBase";

export default async function NotFound() {
  const datasets = await getDatasets();
  const user = await getUser();
  return (
    <>
      <div className="container text-center min-h-screen  text-primary flex justify-center items-center flex-col py-8">
        <h1 className="text-5xl font-bold">Welcome To Summary AI</h1>
        <br />
        <Link href="/login">
          <ButtonBase>{user ? "View Dashboard" : "Log In"}</ButtonBase>
        </Link>
      </div>
    </>
  );
}
