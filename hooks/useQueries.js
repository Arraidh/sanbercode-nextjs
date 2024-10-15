import react from "react";

export const useQueries = ({
  prefixUrl = "",
  updateNotes = false,
  headers = {},
}) => {
  const [data, setData] = react.useState({
    data: null,
    isLoading: false,
    isError: false,
  });

  const fetchingData = react.useCallback(
    async ({ url = "", method = "GET", headers = {} }) => {
      setData({
        ...data,
        isLoading: true,
      });
      try {
        const response = await fetch(url, { method, headers });
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
    if (prefixUrl) {
      fetchingData({ url: prefixUrl, headers: headers });
    }
  }, [updateNotes]);

  return { ...data };
};
