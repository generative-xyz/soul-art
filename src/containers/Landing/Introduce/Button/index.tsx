import s from './style.module.scss';

const Button: React.FC = () => {
  return (
    <div className={`${s.button} ${s.init}`}>
      <span>Example</span>
    </div>
  );
};

export default Button;
