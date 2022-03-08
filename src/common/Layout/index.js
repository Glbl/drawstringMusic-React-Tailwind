import {Fragment, useMemo, useState, useContext} from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  MenuAlt2Icon,
  PencilAltIcon,
  XIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import PlayerController from "../PlayerController";
import { ConnectContext } from "../../ConnectProvider";

import album from "../../assets/album.png"
import {useSelector} from "react-redux";

const path = window.location.pathname;
const navigation = [
  { name: "Discover", href: "/", icon: HomeIcon, current: path === "/" },
  // {
  //   name: "Mint",
  //   href: "/mint",
  //   icon: PencilAltIcon,
  //   current: path === "/mint",
  // },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout(props) {
  const songs = useSelector(state=>state.player.songs)
  const currentlyPlaying = useSelector(state=>state.player.currentlyPlaying)
  const currentSong = useMemo(() => songs.find(item => item.id === currentlyPlaying), [currentlyPlaying])

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    accountId,
    walletConnection,
    contract,
    login,
    logout,
  } = useContext(ConnectContext);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
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
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex justify-center items-center h-24 border-b border-gray-700">
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-white font-semibold text-xl">
                      Drawstring
                    </h1>
                    <h1 className="text-primary font-normal text-sm">MUSIC</h1>
                  </div>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "font-bold" : "font-normal",
                          "group text-white flex relative place-items-center pl-5 py-4 text-lg rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? "text-white" : "text-secondary",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        {item.current ? (
                          <div
                            className="w-2 h-full rounded-full absolute left-0"
                            style={{
                              background:
                                "linear-gradient(228.9deg, #AD1FDA -29.56%, #8468F0 31.02%, #54C3FF 87.23%), #4CBEFC",
                            }}
                          ></div>
                        ) : null}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
            <div className="flex items-center h-24 flex-shrink-0 px-4 bg-gray-900 border-b border-gray-700">
              <div className="flex flex-col w-full justify-center items-center">
                <h1 className="text-white font-semibold text-xl">Drawstring</h1>
                <h1 className="text-primary font-normal text-sm">MUSIC</h1>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 py-4 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? "font-bold" : "font-normal",
                      "group text-white flex relative place-items-center pl-5 py-4 text-lg rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? "text-white" : "text-secondary",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.current ? (
                      <div
                        className="w-2 h-full rounded-full absolute left-0"
                        style={{
                          background:
                            "linear-gradient(228.9deg, #AD1FDA -29.56%, #8468F0 31.02%, #54C3FF 87.23%), #4CBEFC",
                        }}
                      ></div>
                    ) : null}
                  </a>
                ))}
              </nav>
              {
                currentSong &&
                  <div className="pb-24 w-full">
                    <img className="h-64 w-64 bg-blend-color" src={currentSong?.links?.images[0]?.url} alt="album"/>
                  </div>
              }

            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col">
          <div className="top-0 z-10 flex-shrink-0 flex py-4 bg-background px-4 sm:px-6 md:px-8">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between">
              <div className="flex-1 flex gap-2">
                <form
                  className="w-full md:ml-0 bg-gray-900 rounded-full max-w-2xl hidden"
                  action="#"
                  method="GET"
                >
                  <div className="relative w-full text-gray-400 px-6">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full bg-transparent h-full pl-8 pr-3 py-2 border-transparent text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search songs, albums"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs text-white border-2 border-secondary font-bold text-sm py-4 px-7 flex items-center rounded-full">
                      {
                        walletConnection && walletConnection.isSignedIn() ?
                          <>
                            {accountId}
                            <ChevronDownIcon className="ml-6 w-4 text-white" />
                          </> :
                          <div onClick={() => login()}>
                            <span className="font-light pr-1">Login with</span> NEAR
                          </div>
                      }
                    </Menu.Button>
                  </div>
                  {
                    walletConnection && walletConnection.isSignedIn() && <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                onClick={() => {
                                  if(item.name === 'Sign out') {
                                    logout();
                                  }
                                }}
                                className={classNames(
                                  active ? "text-white" : "text-secondary",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  }
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 text-white">
            <div className="py-6 px-4 sm:px-6 md:px-8">{props.children}</div>
          </main>
        </div>
        <PlayerController />
      </div>
    </>
  );
}
