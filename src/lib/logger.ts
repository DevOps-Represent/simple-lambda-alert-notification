type Level = "info" | "error" | "warn";
type Detail = string | Record<string, unknown>;

export const logger = {
  info: (detail: Detail) => log("info", detail),
  error: (detail: Detail) => log("error", detail),
  warn: (detail: Detail) => log("warn", detail),
};

function log(level: Level, detail: Detail) {
  console.log(JSON.stringify({ level, detail }));
}