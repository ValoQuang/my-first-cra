import { Loading, Button } from "../main/components/index";
import { LuUserPlus } from "react-icons/lu";
import { useGetUserByNameQuery } from "../redux/page/pageSlice";

const AboutMe = () => {
  const { data, isLoading } = useGetUserByNameQuery(`${process.env.REACT_APP_GITHUB_NAME}`);

  return (
    <div className="flex align-center min-h-screen justify-center items-center max-lg:text-sm">
      {!data && isLoading ? (
        <>
          <div className="flex w-full flex-col h-full gap-4">
            <Loading />
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-64 w-32 shrink-0 rounded-xl"></div>
              </div>
              <div className="skeleton h-64 w-full"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="animate-fadeIn">
          <div className="hero bg-base-100">
            <div className="hero-content flex-col lg:flex-row">
              <img
                alt="imagemyself"
                src={data?.avatar_url}
                className="max-w-sm rounded-lg shadow-2xl w-64 h-full"
              />
              <div className="flex flex-col gap-5">
                <h1 className="text-5xl max-lg:text-xl font-bold">
                  {data?.bio}
                </h1>
                <p>
                  I graduated in 2018 in Helsinki, Finland, with bachelor degree
                  in Renewable Energy Technology.
                </p>

                <div className="stats lg:stats-horizontal shadow">
                  <div className="stat">
                    <div className="stat-title">Current company</div>
                    <div className="stat-value">{data?.company}</div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Public repositories</div>
                    <div className="stat-value">{data?.public_repos}</div>
                  </div>
                </div>
                <Button
                  anchor="to-do"
                  icon={<LuUserPlus />}
                  title="Get to know me more"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
