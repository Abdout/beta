import { LoginButton } from "@/component/auth/login-button";
import MdButton from "@/component/atom/button/md";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-4 text-center">
        <h1>Databayt</h1>
        <p>Business Automation</p>
        <div className="pt-6">
          <LoginButton asChild>
            <MdButton placeholder="Get started" />
          </LoginButton>
        </div>
      </div>
    </div>
  )
}