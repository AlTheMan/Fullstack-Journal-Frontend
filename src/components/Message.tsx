interface Props{
    message: string;
    color?: 'primary' | 'secondary' | 'danger';

}

const Message = ({message, color ='primary'}: Props) =>{
    return (
        <div className={'message' + color}> {message}    </div>
    )
}

export default Message;