import React, {InputHTMLAttributes} from 'react';
import './style.css'

interface ButtonProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    onClick: any;
}

const Button:React.FC<ButtonProps> = ({name, onClick}) => {
  return (
    <div>
        <button className="btn-enviar" onClick={onClick}>{name}</button>
    </div>
  );
}

export default Button;
