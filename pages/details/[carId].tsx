import path from "path";
import fs from "fs/promises";
import { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import back from "@icons/arrow-left.svg";
import forward from "@icons/arrow-right.svg";
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
  LogoContainer,
  Name,
  OrderButton,
  OrderContainer,
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
  const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
  const [secondCar, setSecondCar] = useState<Car>(cars[1]);
  const [thirtyCar, setThirtyCar] = useState<Car>(cars[2]);
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
      let car = findData(carId.toString());
      setSelectedCar(findData(carId.toString()));

      setSecondCar(
        car.number === 1 ? cars[15] : cars[cars.indexOf(car!) - 1]
      );
  
      setThirtyCar(
        car.number === 16 ? cars[0] : cars[cars.indexOf(car!) + 1]
      );
    }
  }, []);

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
            <LogoContainer>
              <Logo
                src={images[`${selectedCar.logo}.png`]}
                alt={selectedCar.brand}
                layout="responsive"
              />
            </LogoContainer>
            <HeaderInfos>
              <Name>
                {selectedCar.brand} {selectedCar.model}
              </Name>
              <Price>${selectedCar.price}/day</Price>
            </HeaderInfos>
          </Header>
          <CustomLink href="/">
            <BackButton>
              <IconContainer src={back} alt="back arrow" layout="fixed" width={50} height={30}/>
              Back to catalog
            </BackButton>
          </CustomLink>
          <CarImage
            src={images[`${selectedCar.id}-side.png`]}
            alt={selectedCar.model}
            layout="intrinsic"
          />
          <CarInfo>
            <CarNumber>{FormatCarNumber(selectedCar.number || 0)} </CarNumber>
            <CarText>{selectedCar.color}</CarText>
          </CarInfo>
        </CarShow>
        <OrderContainer>
          <OrderButton>
            Order Now
            <IconContainer src={forward} alt="forward arrow" layout="fixed" width={50} height={30} />
          </OrderButton>
        </OrderContainer>
        <CarsNavigation>
          <Arrow onClick={prevClickHandler}>
            <ArrowIcon src={back} layout="fixed" width={30} height={30} />
          </Arrow>
          {screenSize.dynamicWidth > 809 && (
            <CarInactive>
              <SlideImage
                src={images[`${secondCar.id}-side.png`]}
                alt={secondCar.model}
                layout="intrinsic"
              />
            </CarInactive>
          )}
          <CarActive>
            <SlideImage
              src={images[`${selectedCar.id}-side.png`]}
              alt={selectedCar.model}
              layout="intrinsic"
            />
          </CarActive>
          {screenSize.dynamicWidth > 809 && (
            <CarInactive>
              <SlideImage
                src={images[`${thirtyCar.id}-side.png`]}
                alt={thirtyCar.model}
                layout="intrinsic"
              />
            </CarInactive>
          )}
          <Arrow onClick={nextClickHandler}>
            <ArrowIcon src={forward} layout="fixed" width={30} height={30} />
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
  const paths = ids.map((id: string) => ({ params: { carId: id } }));

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
