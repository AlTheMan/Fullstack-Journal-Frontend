
interface Props{
    children: string;
    onClick: ()=>void;
    color?: 'primary' | 'secondary' | 'danger';
}

const Button = ({children, onClick, color ='primary'}: Props) =>{
    return (
        <button style={{padding: "5px"}} className={'btn btn-' + color} onClick={onClick}> {children}</button>
    )
}

export default Button;