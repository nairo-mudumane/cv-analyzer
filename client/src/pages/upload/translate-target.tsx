import React from "react";
import { Switch, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import database from "../../database";
import { useSelectedFile } from "../../hooks";

export default function TranslateTarget() {
  const { setTranslateTo } = useSelectedFile();

  const defaultLang = React.useMemo<string>(() => {
    const lang = database.languages.codes.find((lang) =>
      lang[0].toLowerCase().includes("pt")
    );

    return lang![0].toUpperCase() || "pt";
  }, []);

  const langs = React.useMemo<Array<Array<string>>>(
    () => database.languages.codes,
    []
  );

  const [checked, setChecked] = React.useState<boolean>(false);
  const [lang, setLang] = React.useState<string>(defaultLang.toUpperCase());

  const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked);

  const onSelectChange = (event: SelectChangeEvent) =>
    setLang(event.target.value as string);

  const onSubmit = (event?: React.FormEvent) => event?.preventDefault();

  React.useEffect(() => {
    if (lang) {
      if (checked) setTranslateTo(lang);
      else setTranslateTo(null);
    }
  }, [checked, lang, setTranslateTo]);

  return (
    <form onSubmit={onSubmit} className="mx-auto">
      <h6 className="text-primary text-center text-xl font-bold mb-4">
        Translation {checked ? "ON" : "OFF"}
      </h6>

      <div className="flex gap-4 items-center">
        <Switch checked={checked} onChange={onSwitchChange} />

        <Select
          disabled={!checked}
          value={lang}
          className="min-w-[6rem]"
          onChange={onSelectChange}
        >
          {langs.map((lang, index) => {
            const [code, meaning] = lang;

            return (
              <MenuItem key={code + index} value={code.toUpperCase()}>
                {code.toUpperCase()} - {meaning}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </form>
  );
}
