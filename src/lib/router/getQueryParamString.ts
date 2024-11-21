export default function getQueryParamString(
  param: string | Array<string> | null | undefined,
): string {
  if (Array.isArray(param)) {
    return param.join(",");
  }

  return param || "";
}
