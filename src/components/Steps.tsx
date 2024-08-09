'use client'
import React from "react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import Image from "next/image";

const STEPS = [
    {
        name: 'Step 1: Course Information',
        description: 'Enter Information',
        url: '/instructions',
    },
    {
        name: 'Step 2: Course Options',
        description: 'Enter Options',
        url: '/registration',
    },
    {
        name: 'Step 3: Course Content',
        description: 'Enter Content',
        url: '/payment',
    },
    {
        name: 'Step 4: Course Preview',
        description: 'Your Course',
        url: '/payment',
    },
]

const Steps = () => {
    const pathname = usePathname()
    return (
        <ol className='rounded-md bg-gradient-to-r from-green-200 to-red-200 lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200'>
            {STEPS.map((step, i) => {
                const isCurrent = pathname.endsWith(step.url)
                const isCompleted = STEPS.slice(i + 1).some((step) =>
                    pathname.endsWith(step.url)
                )
                const imgPath = `/steps-${i + 1}.png`
                return (
                    <li key={step.name} className='relative overflow-hidden lg:flex-1'>
                        <div>
                            <span
                                className={cn(
                                    'absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                                    {
                                        'bg-gradient-to-r from-pink-500 to-rose-500': isCurrent,
                                        'bg-primary': isCompleted,
                                    }
                                )}
                                aria-hidden='true'
                            />

                            <span
                                className={cn(
                                    i !== 0 ? 'lg:pl-9' : '',
                                    'flex items-center px-6 py-4 text-sm font-medium'
                                )}>
                                <span className='flex-shrink-0'>
                                    <Image
                                        src={imgPath}
                                        alt="steps"
                                        className={cn(
                                            'flex h-6 w-6 object-contain items-center justify-center',
                                            {
                                                'border-none': isCompleted,
                                                'border-green-700': isCurrent,
                                            }
                                        )}
                                        width={24}
                                        height={24}
                                    />
                                </span>

                                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                                    <span
                                        className={cn('text-[12px] font-semibold text-zinc-700', {
                                            'text-primary': isCompleted,
                                            'text-green-700': isCurrent,
                                        })}>
                                        {step.name}
                                    </span>
                                    <span className='text-[10px] text-zinc-500'>
                                        {step.description}
                                    </span>
                                </span>
                            </span>

                            {/* separator */}
                            {i !== 0 ? (
                                <div className='absolute inset-0 hidden w-3 lg:block'>
                                    <svg
                                        className='h-full w-full text-gray-300'
                                        viewBox='0 0 12 82'
                                        fill='none'
                                        preserveAspectRatio='none'>
                                        <path
                                            d='M0.5 0V31L10.5 41L0.5 51V82'
                                            stroke='currentcolor'
                                            vectorEffect='non-scaling-stroke'
                                        />
                                    </svg>
                                </div>
                            ) : null}
                        </div>
                    </li>
                )
            })}
        </ol>

    );
};

export default Steps;
