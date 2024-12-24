import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SemesterType } from "@/utils/types";
import CustomAlert from "./CustomAlert";

interface HomeProps {
  sem: SemesterType;
  index: number;
  darkTheme: boolean;
  setSem1SPI: (value: number | null) => void;
  setSem2SPI: (value: number | null) => void;
  setSem3SPI: (value: number | null) => void;
  setSem4SPI: (value: number | null) => void;
  calculateCPI: (value: number) => void;
}

const CPIcard: React.FC<HomeProps> = ({
  sem,
  index,
  darkTheme,
  setSem1SPI,
  setSem2SPI,
  setSem3SPI,
  setSem4SPI,
  calculateCPI,
}) => {
  const [grades, setGrades] = useState<number[] | null[]>(
    Array(sem.credits.length).fill(null)
  );
  const [SPIvisible, setSPIvisible] = useState<boolean>(false);
  const [notAllFilled, setAllNotFilled] = useState<boolean>(false);
  const [SPI, setSPI] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [prevNotFilled, setPrevNotFilled] = useState<boolean>(false);

  // to check if all the numbers are filled or not
  const allNotFilled = (grades: number[] | null[]): boolean => {
    for (let i: number = 0; i < grades.length; i++) {
      if (grades[i] == null) return true;
    }
    return false;
  };

  const calculateSPI = (
    credits: number[],
    grades: number[] | null[],
    index: number
  ) => {
    // CPI calculation
    setCurrentCard(index);

    if (allNotFilled(grades)) {
      //   alert("all not filled");
      setSPIvisible(false);
      setAllNotFilled(true);
      return;
    }
    let sum: number = 0;
    let totalCred: number = 0;
    for (let i: number = 0; i < credits.length; i++) {
      sum += grades[i]! * credits[i]; // exclaimation marks tells us that grades[i] is definitely not null since we have checked it
      totalCred += credits[i];
    }
    setSPI(sum / totalCred);
    if (index == 0) {
      setSem1SPI(SPI);
    } else if (index == 1) {
      setSem2SPI(SPI);
    } else if (index == 2) {
      setSem3SPI(SPI);
    } else {
      setSem4SPI(SPI);
    }
    setAllNotFilled(false);
    setSPIvisible(true);
  };

  return (
    <div>
      <div className="p-4">
        {alertVisible && (
          <CustomAlert title={"Wait!"} description={"Not a valid Number!"} />
        )}
      </div>
      <Card
        className={`${
          darkTheme ? " bg-black text-white " : " bg-white text-black "
        }  m-4`}
      >
        <CardHeader>
          <CardTitle>Semester {`${sem.semester}`}</CardTitle>
          <CardDescription>
            Enter the Grades (Expected) of semester {`${sem.semester}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sem.subjects.map((subject: string, index: number) => {
            return (
              <div key={index}>
                <p className="py-2">{subject} :</p>
                <Input
                  placeholder="Expected Grade"
                  onChange={(input: any) => {
                    const value = input.target.value;
                    console.log(value.length);
                    if (value.length == 0) {
                      let tempGrades: number[] | null[] = grades;
                      tempGrades[index] = null;
                      setGrades(tempGrades);
                      return;
                    }
                    // console.log(input);
                    if (!isNaN(Number(value))) {
                      // valid number
                      setAlertVisible(false);
                      const int_value = Number(value);
                      let tempGrades: number[] | null[] = grades;
                      tempGrades[index] = int_value;
                      setGrades(tempGrades);
                    } else {
                      // TODO: show here that the intered number is not valid integer
                      setAlertVisible(true);
                      input.target.value = "";
                      //   alert(value);
                    }
                  }}
                />
              </div>
            );
          })}
        </CardContent>
        <div className="px-6">
          <Separator />
        </div>

        <CardFooter className="flex flex-col">
          <Button
            className="hover:bg-gray-700 my-4"
            onClick={() => {
              calculateSPI(sem.credits, grades, index);
              calculateCPI(index);
            }}
          >
            Calculate
          </Button>
          <div>
            {notAllFilled && index == currentCard && (
              <>
                <br />
                <p>All the details have not been filled</p>
              </>
            )}

            {SPIvisible && index == currentCard && (
              <>
                <br />
                <p>
                  Your SPI for semester {index + 1} is {SPI}
                </p>
              </>
            )}

            {prevNotFilled && index == currentCard && (
              <>
                <br />
                <p>Fill previous semester grades first</p>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CPIcard;
