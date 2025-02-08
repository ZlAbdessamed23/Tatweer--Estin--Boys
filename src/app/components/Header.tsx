
import Link from "next/link";
import { cookies } from 'next/headers'

import Image from "next/image";
import DropdownImageMenu from "./Hamb"


const Header = async () => {

  const cookieStore = await cookies()
  const token = cookieStore.get('token')


  const links = ["Our services", "Third party", "Pricing", "signup", "login"]; // Menu links

  return (
    <div className="h-[88px] absolute z-20   py-8 px-[7%] flex justify-center items-center w-full ">

      {/* Logo - Preloaded image for faster load */}
      <div className="gap-2 mr-auto flex justify-center items-center text-[30px] font-bold">

        <Image src={'/logo.png'} height={100} width={180} alt={"logo"} />
      </div>


      {/* Desktop Navigation */}
      <div className="hidden mr-auto lg:block">
        <ul className="menu-list  ">
          {["Our services", "Third party", "Pricing"].map((menuItem, index) => (
            <li key={index} className="menu-item">
              <Link href={`pages/${menuItem}`} className="menu-link">
                {menuItem}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:hidden flex ml-auto">
        <DropdownImageMenu links={links} />
      </div>






      {/* Desktop Buttons */}
      {
        token ?
          <>

            <Link href="/dashboard">
              <button className="relative h-12 w-40 overflow-hidden border border-[#A77DFF] text-white hover:text-[#A77DFF] rounded-[10px]  shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm bg-[#A77DFF]  before:bg-[#110A2E]  before:duration-300 before:ease-out  hover:shadow-[0_4px_20px_#A77DFF] hover:before:h-40 hover:before:w-40 hover:before:opacity-100">
                <span className="relative z-1">dashboard</span>
              </button>
            </Link>
          </>

          :
          <>
            <div className="hidden flex-row gap-6 lg:flex lg:items-center">
              <Link href="/signup">
                <button className="relative h-12 w-40 overflow-hidden border border-[#A77DFF] text-[#A77DFF] shadow-2xl transition-all   rounded-[10px] duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#A77DFF] before:duration-300 before:ease-out hover:text-[#110A2E] hover:shadow-[0_4px_20px_#A77DFF] hover:before:h-40 hover:before:w-40 hover:before:opacity-100">
                  <span className="relative z-1">Sign Up</span>
                </button>
              </Link>
              <Link href="/signin">
                <button className="relative h-12 w-40 overflow-hidden border border-[#A77DFF] text-white hover:text-[#A77DFF] rounded-[10px]  shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm bg-[#A77DFF]  before:bg-[#110A2E]  before:duration-300 before:ease-out  hover:shadow-[0_4px_20px_#A77DFF] hover:before:h-40 hover:before:w-40 hover:before:opacity-100">
                  <span className="relative z-1">Sign In</span>
                </button>
              </Link>
            </div>
          </>
      }







    </div>
  );
};

export default Header;
