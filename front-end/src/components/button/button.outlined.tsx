import { ButtonProps } from '.'

export function ButtonOutlined(props: ButtonProps) {
    return (
        <button
            {...props}
            className=' h-[55px] w-full rounded-lg  bg-[#E87E2D] transition-all duration-300 hover:opacity-60'
        />
    )
}
