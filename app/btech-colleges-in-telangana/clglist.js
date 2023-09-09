import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import TableBanner from "../components/Adsense/tableBanner";

const JntuhTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const adFrequency = 20; // Define ad frequency here

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("college_list").select("*");

      if (error) {
        console.error("Superbase Error fetching data:", error);
        setError(error.message);
      } else {
        setData(data);
        console.log("All rows:", data);
      }
    }

    fetchData();
  }, []);

  const insertAds = (list) => {
    const adRows = [];
    let adCount = 0;

    for (let i = adFrequency; i < list.length; i += adFrequency) {
      if (adCount === 0) {
        adRows.push(
          <tr key={`ad-${i}`}>
            <td className="px-6 py-4 whitespace-nowrap" colSpan="9">
              {/* Your ad content goes here */}
              {/* <div className="text-center py-4 text-gray-600">
                Advertisement
              </div> */}
              <TableBanner />
            </td>
          </tr>
        );
        adCount++;
      }
    }
    return adRows;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl dark:text-white">
          Institute-wise Courses offered in Telangana
        </h3>
        <p className="text-gray-600 mt-2 dark:text-white">
          {/* OU = Osmania University, NA = Not Applicable, SW = State-wide, COED =
          Co-Education */}

          <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            OU = Osmania University
          </span>

          <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            NA = Not Applicable
          </span>

          {/* <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            SW = State-wide
          </span> */}

          <span class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
            COED = Co-Education
          </span>
        </p>
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left ">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b dark:bg-gray-700 dark:text-white">
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                // className="py-3 px-6 border border-gray-300"
              >
                S.No
              </th>
              <th
                // className="py-3 px-6 border border-gray-300"
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Code
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Institute
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Place
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                District
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Region
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Minority
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Mode
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-600 divide-y border  border-gray-200 dark:bg-gray-800 dark:text-white">
            {data.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* {idx === Math.floor(data.length / 10) && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan="9">

                      <div className="text-center py-4 text-gray-600">
                        Advertisement
                      </div>
                    </td>
                  </tr>
                )} */}

                {idx % adFrequency === 0 &&
                  idx > 0 &&
                  insertAds(data).length > 0 &&
                  /* Insert ads after every 25 rows except for the first row */
                  insertAds(data)}

                <tr>
                  <td
                    // className="px-6 py-4 whitespace-nowrap"

                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900  sm:pl-6 dark:text-white"
                  >
                    {item.S_no}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.code}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.Institute}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.Place}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.Dist}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    <span
                      className={` ${
                        item.Region == "OU"
                          ? "bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                          : "bg-pink-100 text-pink-800  mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
                      }`}
                    >
                      {item.Region}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {/* {item.Type} */}
                    <span
                      className={` ${
                        item.Type == "PVT"
                          ? "bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-pink-100 text-pink-800  mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
                      }`}
                    >
                      {item.Type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    <span
                      className={` ${
                        item.Minority == "NA"
                          ? "bg-green-100 text-green-800 mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {item.Minority}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    <span
                      className={` ${
                        item.Mode == "COED"
                          ? "bg-indigo-100 text-indigo-800  mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
                          : "bg-pink-100 text-pink-800  mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
                      }`}
                    >
                      {item.Mode}
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JntuhTable;
