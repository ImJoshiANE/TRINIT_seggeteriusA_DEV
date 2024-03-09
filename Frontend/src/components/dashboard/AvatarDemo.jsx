import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarDemo({picPath, className}) {
    return (
      <Avatar className={`${className}`}>
        <AvatarImage src={picPath} alt="@shadcn" />
      </Avatar>
    )
  }
  