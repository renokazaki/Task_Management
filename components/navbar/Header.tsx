import React, { Dispatch, SetStateAction } from "react";
import {
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Categories } from "./Categories";
import { Category } from "@/types/category";

const Header = ({
  selectCategory,
  setSelectCategory,
}: {
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
}) => {
  const { user } = useUser();

  return (
    <nav className="flex justify-between items-center px-2 py-2">
      <div className="flex items-center justify-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        {user && (user.username || user.fullName || "User")}
      </div>

      <div className="flex items-end">
        <Categories
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
      </div>
    </nav>
  );
};

export default Header;
