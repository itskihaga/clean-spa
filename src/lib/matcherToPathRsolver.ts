export type Params = Record<string, string | undefined>;

export default (matcher: string) => {
  const extract = /\/:[^\/]+/g;
  const extracted = matcher.match(extract);
  const keys = extracted && extracted.map(e => e.replace("\?","")).map(e => e.substring(2));
  const exp = matcher.replace(extract, e => e.endsWith("?") ? "(?:/([^/]+?))?" : "/([^/]+?)");
  const reg = new RegExp(`^${exp}(?:/)?$`);
  return (path: string): Params | null => {
    const res = reg.exec(path);
    if (res) {
      if(keys){
        const params: Params = {};
        res.slice(1).forEach((e, i) => {
          params[keys[i]] = e;
        });
        return params;
      }
      return {}
    } else {
      return null;
    }
  };
};