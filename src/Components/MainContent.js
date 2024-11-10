import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ar-dz";
moment.locale("ar");

// axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`);

function MainContent() {
  // states

  const [NextPrayerIndex, SetNextPrayerIndex] = useState(3);

  const [Timings, setTimings] = useState({
    Fajr: "04:31",
    Dhuhr: "12:30",
    Asr: "15:52",
    Sunset: "18:25",
    Isha: "19:55",
  });

  const [RemainingTime, SetRemainingTime] = useState("");

  const [SelectedCity, SetSelectedCity] = useState({
    displayName: "مكه المكرمه",
    apiName: "Makkah al Mukarramah",
  });

  const [Today, SetToday] = useState("");

  // const [Timer, SetTimer] = useState(10);

  const availableCities = [
    { displayName: "مكه المكرمه", apiName: "Makkah al Mukarramah" },
    { displayName: " الرياض", apiName: "Riyadh" },
    { displayName: " الدمام", apiName: "Dammam" },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  // states

  const getTimimgs = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${SelectedCity.apiName}`
    );
    // console.log(response.data.data.timings);
    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    // console.log("call api");
    // console.log("hello world!");
    getTimimgs();

    // console.log("time today", t.format("Do MMMM YYYY | h:mm"));
  }, [SelectedCity]);

  useEffect(() => {
    const t = moment();
    SetToday(t.format("Do MMMM YYYY | h:mm"));

    let interval = setInterval(() => {
      // console.log("call timer");
      setupCountdownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [Timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let PrayerIndex = 3;

    if (
      momentNow.isAfter(moment(Timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(Timings["Dhuhr"], "hh:mm"))
    ) {
      PrayerIndex = 1;
      // console.log("next prayer is dhuhr");
    } else if (
      momentNow.isAfter(moment(Timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(Timings["Asr"], "hh:mm"))
    ) {
      PrayerIndex = 2;
      // console.log("next prayer is Asr");
    } else if (
      momentNow.isAfter(moment(Timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(Timings["Sunset"], "hh:mm"))
    ) {
      PrayerIndex = 3;
      // console.log("next prayer is Sunset");
    } else if (
      momentNow.isAfter(moment(Timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(Timings["Isha"], "hh:mm"))
    ) {
      PrayerIndex = 4;
      // console.log("next prayer is Isha");
    } else {
      PrayerIndex = 0;
      // console.log("next prayer is Fajr");
    }

    SetNextPrayerIndex(PrayerIndex);

    // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[PrayerIndex];
    const nextPrayerTime = Timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
    // console.log("nextPrayerTime", nextPrayerTime);

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }
    console.log("remainingTime", remainingTime);

    const DurationRemainingTime = moment.duration(remainingTime);

    SetRemainingTime(`
      ${DurationRemainingTime.seconds()} : 
      ${DurationRemainingTime.minutes()} :
      ${DurationRemainingTime.hours()}
    `);

    console.log(
      "DurationRemainingTime",
      DurationRemainingTime.hours(),
      DurationRemainingTime.minutes(),
      DurationRemainingTime.seconds()
    );

    // console.log(momentNow.isBefore(moment(Timings["Fajr"], "hh:mm")));
    const Isha = Timings["Isha"];
    const IshaMoment = moment(Isha, "hh:mm");
    // console.log("Isha", Isha);

    // console.log(momentNow.isAfter(IshaMoment));
    // console.log(momentNow.isBefore(IshaMoment));
  };

  const handleCityChange = (event) => {
    const cityObject = availableCities.find((city) => {
      // console.log("1", city.apiName);
      // console.log("2", event.target.value);
      // console.log("3", city.apiName == event.target.value);
      return city.apiName == event.target.value;
    });

    // console.log(event.target.value);
    SetSelectedCity(cityObject);
  };

  return (
    <>
      {/* TOP ROW */}
      <Grid container style={{ width: "100vw", gap: "30%" }}>
        <Grid xs={6} style={{ marginRight: "30px" }}>
          <div>
            <h2>{Today}</h2>
            <h1>{SelectedCity.displayName}</h1>

            {/* <h2>{Timer}</h2> */}
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاه {prayersArray[NextPrayerIndex].displayName}</h2>
            <h1>{RemainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider variant="middle" />

      {/* PRAYERS CARDS */}
      <Stack
        direction="row"
        style={{
          // marginRight: "30px",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        <Prayer name="الفجر" time={Timings.Fajr} image="images/image-1.jpeg" />
        <Prayer name="الظهر" time={Timings.Dhuhr} image="images/image-2.jpeg" />
        <Prayer name="العصر" time={Timings.Asr} image="images/image-3.jpeg" />
        <Prayer
          name="المغرب"
          time={Timings.Sunset}
          image="images/image-4.jpeg"
        />
        <Prayer name="العشاء" time={Timings.Isha} image="images/image-5.jpeg" />
      </Stack>
      {/* PRAYERS CARDS */}

      {/* SELECT CITY */}
      <Stack
        direction="row"
        style={{
          marginTop: "50px",
          width: "25%",
          margin: "50px auto",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">المدينه</InputLabel>
          <Select
            // style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* SELECT CITY */}
    </>
  );
}

export default MainContent;
// sx={{ width: "100%" }}
// style={{ display: "flex", justifycontent: "center", width: "100vw" }}
// "https://api.aladhan.com/v1/timingsByCity?country=SA&city=Riyadh"
