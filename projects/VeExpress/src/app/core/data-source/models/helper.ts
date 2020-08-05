export function from<T>(object: any) {
  let model = {} as T;
  Object.keys(object).forEach(key => {
    model[key] = object[key];
  });
  return model;
}
