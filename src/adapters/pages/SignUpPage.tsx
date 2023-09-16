import { User2 } from "lucide-react";
import { Icons } from "../components/ui/icons";
import SignUpForm from "../components/auth/SignUpForm";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../components/ui/button";

export default function SignUpPage() {
  return (
    <>
      <div className="relative h-screen flex flex-col items-center justify-center bg-slate-950 md:grid lg:max-w-none lg:grid-cols-9 lg:px-0">
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 z-20 text-slate-50"
          )}
        >
          Se connecter
        </Link>
        <div className="relative hidden h-screen flex-col p-10 text-white lg:block lg:col-span-5">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="assets/images/img-3.jpg"
            alt=""
          />
          {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white"></div> */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-slate-950"></div>
          <div className="relative z-20  flex items-center text-xl font-medium">
            <Icons.file_sign className="mr-2 h-8 w-8 animate-pulse" />
            MiaCrypt
          </div>
          <div className="absolute text-center bottom-4">
            <p className="text-3xl">
              "Signez... Parce que chaque pixel compte."
            </p>
          </div>
        </div>
        <div className="relative lg:p-8 lg:col-span-4 ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="mx-auto bg-slate-800 rounded-full p-4 mb-4">
                <User2 className="text-slate-100" size={48} strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
                Bienvenue sur MiaCrypt !
              </h1>
              <p className="text-sm text-slate-300">
                Entrez vos informations pour vous inscrire
              </p>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
}
