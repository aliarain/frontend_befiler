import { useI18n } from "../../contexts/i18n";

const Button = ({ children, className, disabled, ...props }) => {
    const i18n = useI18n()
    return (
        <button {...props}
            disabled={disabled}
            className={`btn-taxants text-white px-4 py-2.5 text-sm rounded font-medium text-wra disabled:bg-main2 disabled:bg-opacity-40 ${className}`}
            style={{ whiteSpace: 'nowrap' }}>{!!i18n.t && typeof children === 'string' ? i18n.t(children) : children}</button>
    )
}
export default Button