interface Props {
  icon: React.ElementType;
  text: string;
  onClick?(): void;
  iconColor?: string;
  textColor?: string;
}
function ContextMenuItem({ icon, iconColor, text, textColor, onClick }: Props) {
  const Icon = icon;

  return (
    <li
      onClick={onClick}
      className="flex gap-2 items-center focus:outline-none focus-visible:shadow-sm focus-visible:ring-[0.5px] focus-visible:ring-[#2F72E2] focus-visible:ring-offset-0 focus-visible:rounded-sm"
      tabIndex={0}
    >
      <span style={{ color: iconColor }}>
        <Icon size="13" />
      </span>
      <span className="text-sm" style={{ color: textColor }}>
        {text}
      </span>
    </li>
  );
}

export default ContextMenuItem;
