import { Dialog, Transition } from "@headlessui/react";
import { FlagIcon, HomeIcon, LogoutIcon, UserGroupIcon, XIcon } from "@heroicons/react/solid";

import { Fragment } from "react";

import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";

import { auth } from "../firebase";
import { classNames } from "../utils/classnames.utils";
import { CustomMenu } from "./dropdown";

const navigation = [
  { name: "Overview", link: "/", icon: HomeIcon },
  { name: "Goals", link: "/goal", icon: FlagIcon }
];

export const Sidebar: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-sky-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-0 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4 py-5 bg-sky-900">
                  <img className="h-8 w-auto" src="./assets/logo-wide.svg" alt="Unravel Carbon" />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map(item => (
                    <NavLink
                      key={item.name}
                      to={item.link}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-sky-800 text-white"
                            : "text-white hover:bg-sky-600 hover:bg-opacity-75",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )
                      }
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-sky-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <UserNavItem />
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-sky-700">
          <div className="flex-1 flex flex-col pt-0 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 py-5 bg-sky-900">
              <img className="h-8 w-auto" src="./assets/logo-wide.svg" alt="Unravel Carbon" />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map(item => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-sky-800 text-white"
                        : "text-white hover:bg-sky-600 hover:bg-opacity-75",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )
                  }
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-sky-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <UserNavItem />
        </div>
      </div>
    </div>
  );
};

const UserNavItem = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-shrink-0 flex border-t border-sky-800 p-4">
      <CustomMenu
        direction="up"
        label={
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://avatars.githubusercontent.com/u/9788221?v=4"
                  alt=""
                />
              </div>
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-white">Zain Zafar</p>
                <p className="text-xs font-medium text-sky-200 group-hover:text-white">Developer</p>
              </div>
            </div>
          </div>
        }
        items={[
          {
            key: "logout",
            label: "Logout",
            icon: <LogoutIcon className="w-5 h-5 mr-2" />,
            onClick: () => handleLogout()
          }
        ]}
      />
    </div>
  );
};
