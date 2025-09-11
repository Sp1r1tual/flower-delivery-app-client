const getLocaldate = (): string => {
  const now = new Date();

  const localISOString = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000,
  ).toISOString();

  return localISOString;
};

export { getLocaldate };
