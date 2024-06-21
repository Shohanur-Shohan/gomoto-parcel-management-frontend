import { Package } from "lucide-react";
import { NavLink } from "react-router-dom";

const UserSideNav = () => {
  return (
    <>
      <NavLink
        to={"/"}
        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:bg-muted hover:text-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-current"
          viewBox="0 0 511 511.999"
        >
          <g>
            <path d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024H442.62c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0" />
          </g>
        </svg>
        Home
      </NavLink>
      <NavLink
        to={"/dashboard/my-profile"}
        className={({ isActive }) =>
          `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:bg-muted hover:text-foreground ${
            isActive ? "bg-muted text-primary" : ""
          }`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-current"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zm0 240c-57.897 0-105-47.103-105-105S198.103 30 256 30s105 47.103 105 105-47.103 105-105 105zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805zM61.66 482c7.515-85.086 78.351-152 164.34-152h60c85.989 0 156.825 66.914 164.34 152H61.66z" />
          </g>
        </svg>
        My Profile
      </NavLink>
      <NavLink
        to={"/dashboard/book-parcel"}
        className={({ isActive }) =>
          `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:bg-muted hover:text-foreground ${
            isActive ? "bg-muted text-primary" : ""
          }`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-current"
          viewBox="0 0 32 32"
        >
          <g>
            <g data-name="Layer 2">
              <path d="M27 4h-4V3a1 1 0 0 0-2 0v1H11V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM5 6h22a1 1 0 0 1 1 1v3H4V7a1 1 0 0 1 1-1zm22 22H5a1 1 0 0 1-1-1V12h24v15a1 1 0 0 1-1 1z" />
              <path d="m20.35 15.241-6.3 5.4-2.346-2.345a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.357.052l7-6a1 1 0 1 0-1.3-1.518z" />
            </g>
          </g>
        </svg>
        Book A Parcel
      </NavLink>
      <NavLink
        to={"/dashboard/my-parcels"}
        className={({ isActive }) =>
          `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:bg-muted hover:text-foreground ${
            isActive ? "bg-muted text-primary" : ""
          }`
        }
      >
        <Package className="h-4 w-4" />
        My Parcels
      </NavLink>
    </>
  );
};

export default UserSideNav;
