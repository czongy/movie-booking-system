import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import { Link } from "react-router-dom";

export default function MovieShowtime() {
  const { id } = useParams();
  const dateArr = getCurrentDateArray();
  const [hall1, setHall1] = useState([]);
  const [hall2, setHall2] = useState([]);
  const [hall3, setHall3] = useState([]);

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/showtime/movieId?movieId=${id}`)
      .then((response) => {
        const allData = response.data;

        const ha1 = allData.filter((item) => item.hallId == 1);
        const ha2 = allData.filter((item) => item.hallId == 2);
        const ha3 = allData.filter((item) => item.hallId == 3);

        setHall1(ha1);
        setHall2(ha2);
        setHall3(ha3);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [id]);

  return (
    <div className="movie-schedule-container">
      <Tabs defaultActiveKey="0" transition={false} className="mb-3">
        {dateArr.map((date, tabIndex) => (
          <Tab
            key={tabIndex}
            eventKey={tabIndex}
            title={date.toString().substring(0, 10)}
          >
            <div className="row cinema">
              <div className="col-sm-2 text-center">
                <span>Eclipse Hall 1</span>
              </div>
              <div className="col-sm-10">
                {hall1
                  .filter((data) => {
                    const today = new Date().toISOString().substring(0, 10);
                    const currentTime = new Date().toLocaleTimeString("en-US", {
                      hour12: false,
                    });

                    return !(
                      data.date === today && data.startTime < currentTime
                    );
                  })
                  .map(
                    (data) =>
                      data.date ==
                        dateArr[tabIndex].toISOString().substring(0, 10) && (
                        <Link key={data.id} to={"./" + data.id}>
                          {data.startTime}
                        </Link>
                      )
                  )}
              </div>
            </div>
            <div className="row cinema">
              <div className="col-sm-2 text-center">
                <span>Eclipse Hall 2</span>
              </div>
              <div className="col-sm-10">
                {hall2
                  .filter((data) => {
                    const today = new Date().toISOString().substring(0, 10);
                    const currentTime = new Date().toLocaleTimeString("en-US", {
                      hour12: false,
                    });

                    return !(
                      data.date === today && data.startTime < currentTime
                    );
                  })
                  .map(
                    (data) =>
                      data.date ==
                        dateArr[tabIndex].toISOString().substring(0, 10) && (
                        <Link key={data.id} to={"./" + data.id}>
                          {data.startTime}
                        </Link>
                      )
                  )}
              </div>
            </div>
            <div className="row cinema">
              <div className="col-sm-2 text-center">
                <span>Eclipse Hall 3</span>
              </div>
              <div className="col-sm-10">
                {hall3
                  .filter((data) => {
                    const today = new Date().toISOString().substring(0, 10);
                    const currentTime = new Date().toLocaleTimeString("en-US", {
                      hour12: false,
                    });

                    return !(
                      data.date === today && data.startTime < currentTime
                    );
                  })
                  .map(
                    (data) =>
                      data.date ==
                        dateArr[tabIndex].toISOString().substring(0, 10) && (
                        <Link key={data.id} to={"./" + data.id}>
                          {data.startTime}
                        </Link>
                      )
                  )}
              </div>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

function getCurrentDateArray() {
  const dateArr = [];
  const date = new Date();
  for (let i = 0; i < 7; i++) {
    dateArr.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dateArr;
}
