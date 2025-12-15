import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { api } from '@/services/api'


export function LoginPage() {
      console.log('Base URL:', api.defaults.baseURL)
  console.log('Login URL:', `${api.defaults.baseURL}/auth/login`)

  return (
    <>
      <h1>Login Page</h1>
      <h1>{import.meta.env.VITE_API_URL}</h1>
      <h2>{api.defaults.baseURL}/auth/login</h2>
      <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
    </>
  )
}
