import path from "path";
import fs from "fs/promises";
import { useRouter } from "next/router";
import { CarsBoard } from "@styles/home";
import images from "@utils/import-images";
import { Navbar, Card } from "@components";
import { GetStaticProps } from "next";

interface HomeProps {
  cars: {
    id: string;
    brand: string;
    model: string;
    price: string;
    logo: string;
    number: number;
    color: string;
  }[];
}

export default function Home({ cars }: HomeProps) {
  const router = useRouter();
  const cardClickHandler = (id: string) => {
    router.push(`/details/${id}`);
  };
  return (
    <div>
      <Navbar />
      <CarsBoard>
        {cars.map((car: any) => {
          return (
            <Card
              onClick={() => cardClickHandler(car.id)}
              brand={car.brand}
              model={car.model}
              price={car.price}
              image={images[`${car.id}.png`]}
            />
          );
        })}
      </CarsBoard>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (_) => {
  const filePath = path.join(process.cwd(), "src", "data", "dummyData.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return {
    props: {
      cars: data.cars,
    },
    revalidate: 3600,
  };
};
