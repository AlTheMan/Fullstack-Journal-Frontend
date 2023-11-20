import Button from "./Button";

interface Props{
    children: string;
    onClick: ()=>void;
    color?: 'primary' | 'secondary' | 'danger';
}

const DoctorButton = ({children, onClick, color = 'primary'}: Props) =>{


    let Button2;
  if (localStorage.getItem("privilege") === "DOCTOR") {
    Button2 =
    <>
        <Button onClick={onClick} color={color}>
            {children}
        </Button>
    </>;
  } else {
    Button2 = <></>;
  }

  return (
    <>
      {Button2} {/* Render the chosen Button */}
      {/* ... rest of your JSX */}
    </>
  );
}

export default DoctorButton;