"use client";
import Image from "next/image";
import Container from "../Container";
import SearchInput from "../SearchInput";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";
interface NavMenuProps {
  currentUser: any | null;
}
const MainNavbar = ({ currentUser }: NavMenuProps) => {
  const router = useRouter();
  return (
    <div className="fixed z-50 top-0 right-0 left-0 bg-black">
      <Container>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push("/store")}
          >
            <Image
              src={"/logo.svg"}
              alt="logo"
              width="30"
              height="30"
              className="aspect-square"
            />
            <div className={"font-bold text-xl  text-white"}>Shopifyclone</div>
          </div>
          <div className="hidden sm:block">
            <SearchInput />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <NavMenu currentUser={currentUser} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MainNavbar;
