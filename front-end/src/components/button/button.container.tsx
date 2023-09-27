import { ComponentProps } from 'react'

export type ButtonProps = ComponentProps<'button'>

export function ButtonContained(props: ButtonProps) {
    return (
        <button
            {...props}
            className='h-[55px] w-full rounded-lg  bg-[#ffb831] transition-all duration-300 hover:opacity-60'
        />
    )
}
