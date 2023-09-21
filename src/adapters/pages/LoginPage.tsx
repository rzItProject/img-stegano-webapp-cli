import { Lock } from "lucide-react";
import LoginForm from "../components/auth/LoginForm";
import { Icons } from "../components/ui/icons";

export default function LoginPage() {
  return (
    <>
      <div className="relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-9 lg:px-0">
        <div className="relative hidden h-screen flex-col p-10 text-white lg:block lg:col-span-5">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="assets/images/img-2.jpg"
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white"></div>
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
        <div className="lg:p-8 lg:col-span-4">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="mx-auto bg-slate-950 rounded-full p-4 mb-4">
                <Lock className="text-slate-100" size={48} strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Content de vous revoir !
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrez vos informations pour vous connecter
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
