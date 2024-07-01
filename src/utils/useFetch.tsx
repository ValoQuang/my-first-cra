import { useEffect } from "react";
import { Octokit } from "octokit";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../redux/store";
import {
  fetchingFailure,
  fetchingStart,
  fetchingSuccess,
} from "../redux/page/pageSlice";

export const useFetchGitHub = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: StoreState) => ({
    data: state.page.data,
    loading: state.page.loading,
    error: state.page.error,
  }));

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchData = async () => {
      dispatch(fetchingStart());
      const octokit = new Octokit({
        auth: `${process.env.REACT_APP_GITHUB_KEY}`,
      });
      try {
        const response = await octokit.request(
          `GET /users/${process.env.REACT_APP_GITHUB_NAME}`,
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
            signal,
          }
        );
        dispatch(fetchingSuccess(response.data));
      } catch (error: any) {
        dispatch(fetchingFailure(error.message));
      }
    };
    fetchData();
    return () => {
      // Cleanup function
      abortController.abort();
    };
  }, [dispatch]);

  return { data, loading, error };
};
