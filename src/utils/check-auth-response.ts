const checkAuthResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }

  const errorJson = await res.json();

  throw new Error(errorJson.message);
};

export default checkAuthResponse;
