import { FC } from "react";
import {
  BrandName,
  ByDay,
  CardContainer,
  CarImage,
  DolarSign,
  ModelName,
  Price,
  PriceContainer,
} from "./styled";

interface CardProps {
  price: number;
  brand: string;
  model: string;
  image: string;
  onClick?: (arg: any) => void
}

const Card: FC<CardProps> = (props) => {
  const { price, brand, model, image, onClick } = props;
  return (
    <CardContainer onClick={onClick}>
      <BrandName>{brand}</BrandName>
      <ModelName>{model.toUpperCase()}</ModelName>
      <CarImage src={image} alt={model} layout="intrinsic"/>
      <PriceContainer>
        <DolarSign>$</DolarSign>
        <Price>{price}</Price>
        <ByDay>/day</ByDay>
      </PriceContainer>
    </CardContainer>
  );
};

export default Card;
