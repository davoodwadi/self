import ReactCountryFlag from "react-country-flag";

interface FlagProps {
  country: string;
}

const COUNTRY_MAP: Record<string, string> = {
  USA: "US",
  "USA 🇺🇸": "US",
  China: "CN",
  "China 🇨🇳": "CN",
  Canada: "CA",
  "Canada 🇨🇦": "CA",
  France: "FR",
  "France 🇫🇷": "FR",
  US: "US",
  CN: "CN",
  CA: "CA",
  FR: "FR",
};

export function Flag({ country }: FlagProps) {
  const code = COUNTRY_MAP[country] || country;
  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      style={{
        width: "1.25em",
        height: "1.25em",
        borderRadius: "50%",
        objectFit: "cover",
        verticalAlign: "middle",
        display: "inline-block",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
      }}
      title={country}
    />
  );
}
