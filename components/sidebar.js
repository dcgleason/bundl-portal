import React, { useState, useEffect } from "react";
import Router from "next/router";
import Image from "next/image";
import bundleLogo from "../images/bundlelogo.png";
export default function Home() {
    const [sidebar, Setsidebar] = useState(false);
    const [sidebarMobile, SetsidebarMobile] = useState(false);
    const [query, setQuery] = useState("");
    useEffect(() => {
        if (Router.router.asPath) {
            const item = Router.router.asPath;
            setQuery(item);
        }
    }, [Router]);
    const checkActive = () => {
        if (query.indexOf("events") !== -1) {
            return "events";
        } else if (query.indexOf("sales") !== -1) {
            return "sales";
        } else if (query.indexOf("analytics") !== -1) {
            return "analytics";
        } else if (query.indexOf("calender-month-view") !== -1) {
            return "calender-month-view";
        }
        return "dashboard";
    };
    return (
        <>
            <div onClick={() => SetsidebarMobile(!sidebarMobile)} className="flex items-center justify-center rounded-r-md bg-gray-800 ml-0 cursor-pointer absolute inset-0 mt-4 md:mt-6 m-auto w-8 h-8 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                    <path d="M3.33337 6.66667H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.33337 13.3332H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div onClick={() => Setsidebar(!sidebar)} className="flex items-center justify-center rounded-r-md bg-gray-800 ml-0 cursor-pointer absolute inset-0 mt-4 md:mt-6 m-auto w-8 h-8 hidden lg:block">
                <svg className="m-auto mt-1" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                    <path d="M3.33337 6.66667H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.33337 13.3332H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="hidden lg:block">
                <div className={sidebar ? "hidden" : "overflow-y-scroll lg:overflow-y-auto fixed lg:sticky h-screen lg:min-h-screen z-40 top-0 bg-gray-800 pt-7 w-64"}>
                    <div className="px-7">
                        <div className="flex items-center justify-between">
                            <div className="w-32">
                                <Image className="w-full" src={bundleLogo} width="100" height="20" alt="logo" />
                            </div>
                            <div onClick={() => Setsidebar(!sidebar)} className="text-gray-700 ml-8 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M3.33337 6.66667H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.33337 13.3332H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-16">
                            <a href="/">
                                <div className={checkActive() === "events" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in"}>
                                    <div className={checkActive() === "events" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.8333 10H17.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.5 10H4.16667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 15.8333V17.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 2.5V4.16667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.4853 14.4853L15.8333 15.8333" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.16667 4.16667L5.51472 5.51472" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.4853 5.51472L15.8333 4.16667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.16667 15.8333L5.51472 14.4853" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </div>
                                    <p className="ml-2">Control Panel</p>
                                </div>
                            </a>
                            <a href="./cover">
                                <div className={checkActive() === "analytics" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in mt-5" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in mt-5"}>
                                    <div className={checkActive() === "analytics" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                        <path d="M2.5 3.3335H17.5V16.6668H2.5V3.3335Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.66663 3.3335V16.6668" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                    </div>
                                    <p className="ml-2">Choose My Cover</p>
                                </div>
                            </a>
                          
                            <a href="./review">
                                <div className={checkActive() === "review" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in mt-5" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in mt-5"}>
                                    <div className={checkActive() === "review" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                        {/* You can replace the following SVG with an icon of your choice */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                            <path d="M10 2.5C5.858 2.5 2.5 5.858 2.5 10C2.5 14.142 5.858 17.5 10 17.5C14.142 17.5 17.5 14.142 17.5 10C17.5 5.858 14.142 2.5 10 2.5ZM10 15.8333C6.324 15.8333 3.333 12.8423 3.333 9.16667C3.333 5.49033 6.324 2.5 10 2.5C13.676 2.5 16.667 5.49033 16.667 9.16667C16.667 12.8423 13.676 15.8333 10 15.8333Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 7.5V10L11.667 11.667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                    <p className="ml-2">Review My Bundl</p>
                                </div>
                            </a>
                            <a href="/submit">
                                <div className={checkActive() === "calender-month-view" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in mt-5" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in mt-5"}>
                                    <div className={checkActive() === "calender-month-view" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                        <path d="M2.5 2.5L10 7.5L17.5 2.5L10 12.5L2.5 2.5Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.5 2.5L10 7.5L17.5 2.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 12.5L10 7.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </div>
                                    <p className="ml-2">Submit My Bundl</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <div className={sidebarMobile ? "overflow-y-scroll lg:overflow-y-auto fixed lg:sticky h-screen lg:min-h-screen z-40 top-0 bg-gray-800 pt-7 w-64" : "hidden"}>
                    <div className="px-7">
                        <div className="flex items-center justify-between">
                            <div className="w-32">
                                <img className="w-full" src="https://cdn.tuk.dev/assets/templates/virtual-event-management/logo.png" alt="logo" />
                            </div>
                            <div onClick={() => Setsidebar(!sidebar)} className="text-gray-700 ml-8 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M3.33337 6.66667H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.33337 13.3332H16.6667" stroke="#A0AEC0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-16">
                            <a href="/">
                                <div className={checkActive() === "sales" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in mt-5" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in mt-5"}>
                                    <div className={checkActive() === "sales" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.8333 10H17.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.5 10H4.16667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 15.8333V17.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 2.5V4.16667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.4853 14.4853L15.8333 15.8333" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.16667 4.16667L5.51472 5.51472" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.4853 5.51472L15.8333 4.16667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.16667 15.8333L5.51472 14.4853" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="ml-2">Control Panel </p>
                                </div>
                            </a>
                            <a href="./cover">
                                <div className={checkActive() === "analytics" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in mt-5" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in mt-5"}>
                                    <div className={checkActive() === "analytics" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                        <path d="M2.5 3.3335H17.5V16.6668H2.5V3.3335Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.66663 3.3335V16.6668" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    </div>
                                    <p className="ml-2">Choose My Cover</p>
                                </div>
                            </a>
                            <a href="./review">
                                <div className={checkActive() === "review" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in mt-5" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in mt-5"}>
                                    <div className={checkActive() === "review" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                        {/* You can replace the following SVG with an icon of your choice */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                            <path d="M10 2.5C5.858 2.5 2.5 5.858 2.5 10C2.5 14.142 5.858 17.5 10 17.5C14.142 17.5 17.5 14.142 17.5 10C17.5 5.858 14.142 2.5 10 2.5ZM10 15.8333C6.324 15.8333 3.333 12.8423 3.333 9.16667C3.333 5.49033 6.324 2.5 10 2.5C13.676 2.5 16.667 5.49033 16.667 9.16667C16.667 12.8423 13.676 15.8333 10 15.8333Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 7.5V10L11.667 11.667" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                    <p className="ml-2">Review My Bundl</p>
                                </div>
                            </a>
                            <a href="/submit">
                                <div className={checkActive() === "calender-month-view" ? "flex items-center cursor-pointer font-normal text-sm text-red-400 duration-150 ease-in mt-5" : "flex items-center cursor-pointer font-normal text-sm text-gray hover:text-red-400 duration-150 ease-in mt-5"}>
                                    <div className={checkActive() === "calender-month-view" ? "px-1 py-1 rounded-sm bg-red-400" : "px-1 py-1 rounded-sm hover:bg-red-400"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                        <path d="M2.5 2.5L10 7.5L17.5 2.5L10 12.5L2.5 2.5Z" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.5 2.5L10 7.5L17.5 2.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 12.5L10 7.5" stroke="#CBD5E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    </div>
                                    <p className="ml-2">Submit My Bundl</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
