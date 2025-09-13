interface IBtnProps {
  text: string;
  className?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export type { IBtnProps };
