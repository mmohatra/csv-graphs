import { BsClock, BsHash, BsType } from "react-icons/bs";

export const DateIcon = BsClock;
export const NumberIcon = BsHash;
export const StringIcon = BsType;

export const dataTypeIcons = {
  date: DateIcon,
  number: NumberIcon,
  string: StringIcon,
};

const dateTokensMap = {
  YYYY: "%Y",
  MM: "%m",
  DD: "%d",
  YY: "%y",
  Month: "%B",
  HH: "%H",
  mm: "%M",
  ss: "%S",
};

function translateDateFormat(df) {
  var out = new String(df);
  Object.keys(dateTokensMap).forEach(function (token) {
    var reg = new RegExp(token, "g");
    out = out.replace(reg, dateTokensMap[token]);
  });
  return out;
}

const formatsLabels = [
  "YYYY-MM-DD",
  "DD/MM/YYYY",
  "YYYY-MM",
  "YY-MM",
  "MM/YY",
  "MM/YYYY",
  "DD Month YYYY",
  "YYYY",
  "YYYY-MM-DD HH:mm:ss",
  "YYYY-MM-DDTHH:mm:ss",
];

const dateFormats = {};
formatsLabels.forEach(function (label) {
  dateFormats[label] = translateDateFormat(label);
});
