import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Navbar, CustomLink, Card } from "@components";
import data from "../dummyData.json";
import { CarsBoard } from "../styles/home";
import images from "../src/shared/utils/import-images";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {

    console.log(images);
  }, [])
  return (
    <div>
      <Navbar />
      <CarsBoard>
        {data.cars.map((car: any) => {
          return (
            <CustomLink href={`/details/${car.id}`} key={car.id}>
              <Card
                brand={car.brand}
                model={car.model}
                price={car.price}
                image={images[`${car.id}.png`]}
              />
            </CustomLink>
          );
        })}
      </CarsBoard>
    </div>
  );
}
