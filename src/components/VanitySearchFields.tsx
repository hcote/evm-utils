import TextInput from "@/ui/TextInput";

interface VanitySearchFieldsProps {
  prefix: string;
  setPrefix: (v: string) => void;
  contains: string;
  setContains: (v: string) => void;
  suffix: string;
  setSuffix: (v: string) => void;
  startingNonce: string;
  setStartingNonce: (v: string) => void;
}

export default function VanitySearchFields({
  prefix,
  setPrefix,
  contains,
  setContains,
  suffix,
  setSuffix,
  startingNonce,
  setStartingNonce,
}: VanitySearchFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      <TextInput
        label="Starts with"
        placeholder="Prefix"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))}
      />
      <TextInput
        label="Contains"
        placeholder="Contains"
        value={contains}
        onChange={(e) =>
          setContains(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
        }
      />
      <TextInput
        label="Ends with"
        placeholder="Suffix"
        value={suffix}
        onChange={(e) => setSuffix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))}
      />
      <TextInput
        label="Starting Nonce"
        placeholder="Start nonce"
        value={startingNonce}
        onChange={(e) => setStartingNonce(e.target.value.replace(/\D/g, ""))}
      />
    </div>
  );
}
