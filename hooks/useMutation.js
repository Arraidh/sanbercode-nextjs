import react from "react";

export const useMutation = () => {
  const [data, setData] = react.useState({
    data: null,
    isLoading: false,
    isError: false,
  });

  const mutates = react.useCallback(
    async ({ url = "", method = "POST", payload = {}, headers = {} }) => {
      setData({
        ...data,
        isLoading: true,
      });
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify(payload),
        });
        const results = await response.json();

        setData({
          ...data,
          data: results,
          isLoading: false,
        });
        return { ...results };
      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
        return error;
      }
    },
    []
  );

  return { ...data, mutates };
};
