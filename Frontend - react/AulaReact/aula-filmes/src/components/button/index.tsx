import React, {InputHTMLAttributes} from 'react';
import './style.css'

interface ButtonProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
}

const Button:React.FC<ButtonProps> = ({name}) => {
  return (
    <div>
        <button className="btn-enviar">{name}</button>
    </div>
  );
}

export default Button;
