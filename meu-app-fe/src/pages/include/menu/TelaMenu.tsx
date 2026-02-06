import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import music from "../../../assets/img/music.png";

const navigation = [
    { name: 'Artista', href: '/artista/naologado', current: false },
    { name: 'Album', href: '/album/naologado', current: false },
    { name: 'Login', href: '/', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TelaMenu() {
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="p-0 m-0 w-full">
                <Disclosure as="nav" className="bg-blue-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img
                                        alt="Artistas e Albuns"
                                        src={music}
                                        className="size-8"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current ? 'bg-blue-700 text-white' : 'text-blue-300 hover:bg-white/5 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Disclosure>

            </div>
        </>
    )
}
