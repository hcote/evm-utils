"use client";

import Container from "@/ui/Container";
import TextInput from "@/ui/TextInput";
import Button from "@/ui/Button";
import { useEthPrice } from "@/hooks/use-eth-price";
import { formatUSD } from "@/utils/formatUSD";
import { useUnitConverter } from "@/hooks/use-unit-converter";

export default function Page() {
  const { values, handleUpdate, clear } = useUnitConverter();
  const { data: priceUSD } = useEthPrice();

  const hasInput = values.wei || values.gwei || values.eth;

  const renderPrice = () => {
    if (!values.eth || Number(values.eth) === 0 || !priceUSD) return "$0.00";
    const price = parseFloat(values.eth) * parseFloat(priceUSD);
    return price < 0.01 ? "<$0.01" : `$${formatUSD(price.toFixed(2))}`;
  };

  return (
    <Container>
      {(["wei", "gwei", "eth"] as const).map((field) => (
        <TextInput
          key={field}
          id={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          placeholder={field}
          value={values[field]}
          onChange={(e) => handleUpdate(field, e.target.value)}
        />
      ))}

      <div className="pt-2 flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">
          ≈ {renderPrice()}
        </p>
        <Button
          label="Clear Form"
          variant="inverse"
          size="sm"
          onClick={clear}
          className={
            hasInput
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }
        />
      </div>
    </Container>
  );
}
