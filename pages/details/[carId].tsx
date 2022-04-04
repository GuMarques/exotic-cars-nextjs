import path from "path";
import fs from "fs/promises";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import back from "@icons/arrow-left.svg";
import images from "@utils/import-images";
import { CustomLink, Navbar } from "@components";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  Arrow,
  ArrowIcon,
  BackButton,
  CarActive,
  CarImage,
  CarInactive,
  CarInfo,
  CarNumber,
  CarShow,
  CarsNavigation,
  CarText,
  Header,
  HeaderInfos,
  IconContainer,
  Logo,
  Name,
  OuterContainer,
  Price,
  SlideImage,
} from "@styles/details";
import { FormatCarNumber } from "@utils/format-carnumbers";

interface Car {
  id: string;
  brand: string;
  model: string;
  price: string;
  logo: string;
  number: number;
  color: string;
}

interface DetailsProps {
  cars: Car[];
}

export default function Details({ cars }: DetailsProps) {
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [secondCar, setSecondCar] = useState<Car>();
  const [thirtyCar, setThirtyCar] = useState<Car>();
  const [screenSize, getDimension] = useState({
    dynamicWidth: 100,
    dynamicHeight: 200,
  });
  const router = useRouter();

  function findData(id: string) {
    return (
      cars.find((value) => {
        return value.id === id;
      }) || cars[0]
    );
  }

  useEffect(() => {
    const carId = router.query.carId;
    if (carId) {
      setSelectedCar(findData(carId[0]));
    }
  });

  useEffect(() => {
    setSecondCar(
      selectedCar?.number === 1
        ? cars[15]
        : cars[cars.indexOf(selectedCar!) - 1]
    );

    setThirtyCar(
      selectedCar?.number === 16
        ? cars[0]
        : cars[cars.indexOf(selectedCar!) + 1]
    );
  }, [selectedCar]);

  useEffect(() => {
    setDimension();
  }, []);

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  const nextClickHandler = () => {
    setSelectedCar(thirtyCar);
    setThirtyCar(secondCar);
    setSecondCar(selectedCar);
  };

  const prevClickHandler = () => {
    setSelectedCar(secondCar);
    setThirtyCar(selectedCar);
    setSecondCar(thirtyCar);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <OuterContainer>
        <CarShow>
          <Header>
            <Logo src={images[`${selectedCar?.logo}.png`]} />
            <HeaderInfos>
              <Name>
                {selectedCar?.brand} {selectedCar?.model}
              </Name>
              <Price>${selectedCar?.price}/day</Price>
            </HeaderInfos>
          </Header>
          <CustomLink href="/">
            <BackButton>
              <IconContainer src={back} />
              Back to catalog
            </BackButton>
          </CustomLink>
          <CarImage src={images[`${selectedCar?.id}-side.png`]} />
          <CarInfo>
            <CarNumber>{FormatCarNumber(selectedCar?.number || 0)} </CarNumber>
            <CarText>{selectedCar?.color}</CarText>
          </CarInfo>
        </CarShow>
        <CarsNavigation>
          <Arrow onClick={prevClickHandler}>
            <ArrowIcon src={back} />
          </Arrow>
          {screenSize.dynamicWidth > 809 && (
            <CarInactive>
              <SlideImage src={images[`${secondCar?.id}-side.png`]} />
            </CarInactive>
          )}
          <CarActive>
            <SlideImage src={images[`${selectedCar?.id}-side.png`]} />
          </CarActive>
          {screenSize.dynamicWidth > 809 && (
            <CarInactive>
              <SlideImage src={images[`${thirtyCar?.id}-side.png`]} />
            </CarInactive>
          )}
          <Arrow onClick={nextClickHandler}>
            <ArrowIcon src={back} right />
          </Arrow>
        </CarsNavigation>
      </OuterContainer>
    </div>
  );
}

const getData = async () => {
  const filePath = path.join(process.cwd(), "src", "data", "dummyData.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData.toString());
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const ids = data.cars.map((car: any) => car.id);
  const paths = ids.map((id: string) => ({params: { carId: id}}))

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (_) => {
  const data = await getData();

  return {
    props: {
      cars: data.cars,
    },
    revalidate: 3600,
  };
};
