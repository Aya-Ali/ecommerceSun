import { PagePlaceholder } from "@/components/shared/page-placeholder";
import Login from "./Login";

export default function LoginPage() {
  return <>


    <div className="container  mx-auto">
      <div className="flex justify-around">
        <div className="w-6/12"><PagePlaceholder title="Sign in" description="Customer authentication screen." /></div>
        <div className="w-4/12 p-8 rounded-3xl shadow bg-white ">
          <Login />
        </div>
      </div>
    </div>
  </>;
}
