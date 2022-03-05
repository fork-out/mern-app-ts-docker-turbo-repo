import { Menu, Transition } from "@headlessui/react";

import { Fragment } from "react";

import { classNames } from "../utils/classnames.utils";

export type MenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

type Props = {
  items: MenuItem[];
  label: React.ReactNode;
  direction?: "up" | "down";
};

export const CustomMenu = (props: Props = { label: "", items: [], direction: "down" }) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button>{props.label}</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            props.direction === "up" ? "bottom-full left-0" : "right-0",
            "absolute w-56 mt-2 origin-bottom-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          )}
        >
          <div className="px-1 py-1">
            {props.items.map(item => (
              <Menu.Item key={item.key}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={`${
                      active ? "bg-sky-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
