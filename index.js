"use strict";
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const advancedFormat = require("dayjs/plugin/advancedFormat");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
require("dayjs/locale/da");
require("dayjs/locale/de");
require("dayjs/locale/nb");
require("dayjs/locale/sv");
require("dayjs/locale/fr");
require("dayjs/locale/ja");
var Locale = /* @__PURE__ */ ((Locale2) => {
  Locale2["Danish"] = "da";
  Locale2["English"] = "en";
  Locale2["French"] = "fr";
  Locale2["German"] = "de";
  Locale2["Norwegian"] = "nb";
  Locale2["Swedish"] = "sv";
  Locale2["Japanese"] = "ja";
  return Locale2;
})(Locale || {});
var TimeFormat = /* @__PURE__ */ ((TimeFormat2) => {
  TimeFormat2["h24"] = "24";
  TimeFormat2["h12"] = "12";
  return TimeFormat2;
})(TimeFormat || {});
var TimezoneAbbreviations = /* @__PURE__ */ ((TimezoneAbbreviations2) => {
  TimezoneAbbreviations2["Central European Standard Time"] = "CET";
  TimezoneAbbreviations2["Central European Summer Time"] = "CEST";
  TimezoneAbbreviations2["Eastern European Standard Time"] = "EET";
  TimezoneAbbreviations2["Eastern European Summer Time"] = "EEST";
  TimezoneAbbreviations2["British Summer Time"] = "BST";
  TimezoneAbbreviations2["Greenwich Mean Time"] = "GMT";
  TimezoneAbbreviations2["Eastern Daylight Time"] = "EDT";
  TimezoneAbbreviations2["Eastern Standard Time"] = "EST";
  TimezoneAbbreviations2["Central Africa Time"] = "CAT";
  TimezoneAbbreviations2["East Africa Time"] = "EAT";
  TimezoneAbbreviations2["Pacific Daylight Time"] = "PDT";
  TimezoneAbbreviations2["Pacific Standard Time"] = "PST";
  TimezoneAbbreviations2["Central Daylight Time"] = "CDT";
  TimezoneAbbreviations2["Central Standard Time"] = "CST";
  TimezoneAbbreviations2["Australian Eastern Daylight Time"] = "AEDT";
  TimezoneAbbreviations2["Australian Eastern Standard Time"] = "AEST";
  return TimezoneAbbreviations2;
})(TimezoneAbbreviations || {});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
const customTimeZoneAbbreviation = ({ timeZone, date }) => {
  if (timeZone === "GMT")
    return timeZone;
  const timeZoneLong = new Intl.DateTimeFormat("en-US", { timeZoneName: "long", timeZone }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? "";
  return TimezoneAbbreviations[timeZoneLong];
};
const sameMonth = (start, end) => end.month() === start.month();
const sameDayOrNight = (start, end) => end.date() === start.date() || end.diff(start, "hour") < 24 && end.hour() < 8;
function prettyDates({
  startDate,
  endDate,
  timeZone = "Europe/Stockholm",
  timeFormat = TimeFormat.h24,
  locale = Locale.English,
  showTimeZone = false
}, format = { month: "MMM" }) {
  const start = dayjs(startDate).locale(locale).tz(timeZone);
  const isCurrentYear = start.year() === dayjs().year();
  const formatDate = () => {
    if (endDate) {
      const end = dayjs(endDate).locale(locale).tz(timeZone);
      if (sameDayOrNight(start, end)) {
        if (timeFormat === TimeFormat.h12) {
          return `${start.format(`D ${format.month}`)}${isCurrentYear ? "" : end.format(" YYYY")} ${start.format(
            `hh:mmA`
          )}-${end.format("hh:mmA")}`;
        } else {
          return `${start.format(`D ${format.month}`)}${isCurrentYear ? "" : end.format(" YYYY")} ${start.format(
            "HH:mm"
          )}-${end.format("HH:mm")}`;
        }
      } else {
        if (sameMonth(start, end)) {
          return `${start.format("D")}-${end.format(`D ${format.month}`)}${isCurrentYear ? "" : end.format(" YYYY")}`;
        } else {
          return start.format(`D ${format.month}`) + " - " + end.format(`D ${format.month}${isCurrentYear ? "" : end.format(" YYYY")}`);
        }
      }
    } else {
      if (timeFormat === TimeFormat.h12) {
        return `${start.format(`D ${format.month}`)}${isCurrentYear ? "" : start.format(" YYYY")} ${start.format(
          `hh:mmA`
        )}`;
      } else {
        return `${start.format(`D ${format.month}`)}${isCurrentYear ? "" : start.format(" YYYY")} ${start.format(
          `HH:mm`
        )}`;
      }
    }
  };
  const formattedDate = formatDate();
  if (showTimeZone) {
    const shortAbbreviation = customTimeZoneAbbreviation({ timeZone, date: startDate });
    return formattedDate + " " + (shortAbbreviation || dayjs(startDate).tz(timeZone).format("z"));
  } else {
    return formattedDate;
  }
}
module.exports = prettyDates;
