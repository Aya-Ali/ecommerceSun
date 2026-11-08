import { PagePlaceholder } from "@/components/shared/page-placeholder";
import SignUp from "./SignUp";

export default function SignupPage() {
  return <>
    {/* <PagePlaceholder title="Create account" description="New customer registration screen." /> */}


  <div className="container  mx-auto">
      <div className="flex justify-around">
      <div className="w-6/12"><PagePlaceholder title="Create account" description="New customer registration screen." /></div>
      <div  className="w-4/12 p-8 rounded-3xl shadow bg-white ">
        <SignUp   />
      </div>
    </div>
  </div>

  </>;
}
