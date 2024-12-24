import React, { useState } from "react";
import { SemesterType } from "@/utils/types";
import CPIcard from "./CPIcard";
import { summation } from "@/lib/utils";

interface HomeProps {
  darkTheme: boolean;
}

export const Home: React.FC<HomeProps> = ({ darkTheme }) => {
  const [sem1SPI, setSem1SPI] = useState<number | null>(null);
  const [sem2SPI, setSem2SPI] = useState<number | null>(null);
  const [sem3SPI, setSem3SPI] = useState<number | null>(null);
  const [sem4SPI, setSem4SPI] = useState<number | null>(null);
  const [showCPI, setShowCPI] = useState<boolean>(false);
  const [CPI, setCPI] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [prevNotFilled, setPrevNotFilled] = useState<boolean>(false);
  const courses = [
    {
      semester: 1,
      spi: null,
      subjects: ["subject1", "subject2", "subject3", "subject4"],
      credits: [3, 4, 2, 3],
    },
    {
      semester: 2,
      spi: null,
      subjects: [
        "subject1",
        "subject2",
        "subject3",
        "subject4",
        "Object Based Modeling",
      ],
      credits: [3, 4, 2, 3, 3],
    },
    {
      semester: 3,
      spi: null,
      subjects: ["subject1", "subject2", "subject3", "subject4", "subject5"],
      credits: [3, 4, 2, 3, 4],
    },
    {
      semester: 4,
      spi: null,
      subjects: ["subject1", "subject2", "subject3", "subject4"],
      credits: [3, 4, 2, 3],
    },
  ];

  const calculateCPI = (index: number) => {
    // TODO: complete this function
    setTimeout(() => {
      if (index == 0) {
        if (sem1SPI != null) {
          setPrevNotFilled(false);
          setCPI(sem1SPI);
          setShowCPI(true);
        } else {
          setShowCPI(false);
          setErrorMessage("Sem 1 details not filled completely");
          setPrevNotFilled(true);
        }
      } else if (index == 1) {
        if (sem1SPI != null && sem2SPI != null) {
          setPrevNotFilled(false);
          const sem1sum: number = summation(courses[0].credits);
          const sem2sum: number = summation(courses[1].credits);
          setCPI((sem1SPI * sem1sum + sem2SPI * sem2sum) / (sem1sum + sem2sum));
          setShowCPI(true);
        } else {
          setShowCPI(false);
          setErrorMessage("Sem 2 details not filled completely");
          setPrevNotFilled(true);
        }
      } else if (index == 2) {
        if (sem1SPI != null && sem2SPI != null && sem3SPI != null) {
          setPrevNotFilled(false);
          const sem1sum: number = summation(courses[0].credits);
          const sem2sum: number = summation(courses[1].credits);
          const sem3sum: number = summation(courses[2].credits);
          setCPI(
            (sem1SPI * sem1sum + sem2SPI * sem2sum + sem3SPI * sem3sum) /
              (sem1sum + sem2sum + sem3sum)
          );
          setShowCPI(true);
        } else {
          setShowCPI(false);
          setErrorMessage("Sem 1/2/3 details not filled completely");
          setPrevNotFilled(true);
        }
      } else {
        if (
          sem1SPI != null &&
          sem2SPI != null &&
          sem3SPI != null &&
          sem4SPI != null
        ) {
          setPrevNotFilled(false);
          const sem1sum: number = summation(courses[0].credits);
          const sem2sum: number = summation(courses[1].credits);
          const sem3sum: number = summation(courses[2].credits);
          const sem4sum: number = summation(courses[3].credits);
          setCPI(
            (sem1SPI * sem1sum +
              sem2SPI * sem2sum +
              sem3SPI * sem3sum +
              sem4SPI * sem4sum) /
              (sem1sum + sem2sum + sem3sum + sem4sum)
          );
          setShowCPI(true);
        } else {
          setShowCPI(false);
          setErrorMessage("Sem 1/2/3/4 details not filled completely");
          setPrevNotFilled(true);
        }
      }
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-around">
        {showCPI && <br /> && (
          <div className="text-xl text-blue-600">Your current CPI is {CPI}</div>
        )}
        {prevNotFilled && <br /> && (
          <div className="text-2xl text-blue-600">{errorMessage}</div>
        )}
      </div>
      <div
        className={`${
          darkTheme ? "bg-black " : "bg-white"
        } grid sm:grid-cols-1 lg:grid-cols-2`}
      >
        {courses.map((sem: SemesterType, index: number) => {
          return (
            <div key={index}>
              <CPIcard
                index={index}
                sem={sem}
                darkTheme={darkTheme}
                setSem1SPI={setSem1SPI}
                setSem2SPI={setSem2SPI}
                setSem3SPI={setSem3SPI}
                setSem4SPI={setSem4SPI}
                calculateCPI={calculateCPI}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
