import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px]">
      <div className="ml-auto">
        <Avatar className="size-10">
          <AvatarImage alt="Guest" src="" />
          <AvatarFallback className="bg-blue-500 font-medium text-white">G</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
