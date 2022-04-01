import { FC, Fragment } from "react";
import Image from "next/image";
import Head from "next/head";
import brokenCar from "@images/broken-car.png";
import styled from "styled-components";
interface NotFoundPageProps {}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFoundPage: FC<NotFoundPageProps> = (props) => {
  return (
    <Fragment>
      <Head>
        <head>
          <title>404 | Page Not Found</title>
        </head>
      </Head>
      <Container>
        <Image src={brokenCar} width={256} height={256} layout="intrinsic" />
        <h1>404 | Page not Found</h1>
      </Container>
    </Fragment>
  );
};

export default NotFoundPage;
