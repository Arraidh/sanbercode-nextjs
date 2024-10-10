import react from "react";

export const useQueries = ({ prefixUrl = "", updateNotes = false }) => {
  const [data, setData] = react.useState({
    data: null,
    isLoading: false,
    isError: false,
  });

  const fetchingData = react.useCallback(
    async ({ url = "", method = "GET" }) => {
      setData({
        ...data,
        isLoading: true,
      });
      try {
        const response = await fetch(url, { method });
        const results = await response.json();

        setData({
          ...data,
          data: results,
          isLoading: false,
        });
      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
      }
    },
    []
  );

  react.useEffect(() => {
    if (prefixUrl) fetchingData({ url: prefixUrl });
  }, []);
  react.useEffect(() => {
    if (prefixUrl) fetchingData({ url: prefixUrl });
  }, [updateNotes]);

  return { ...data };
};
