interface PageDescriptionProps {
  children: React.ReactNode;
  spaced?: boolean;
}

export default function PageDescription({
  children,
  spaced = true,
}: PageDescriptionProps) {
  return <p className={spaced ? "mt-3" : undefined}>{children}</p>;
}
