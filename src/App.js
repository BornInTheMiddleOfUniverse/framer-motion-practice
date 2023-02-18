import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    120deg,
    rgba(0, 255, 191, 1) 0%,
    rgba(0, 255, 182, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  ); ;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.8);
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 40px;
  border-color: transparent;
  height: 30px;
  width: 100px;
  color: blakc;
  background-color: white;
  cursor: pointer;
  :hover {
    color: rgba(0, 212, 255, 1);
  }
`;

const Circle = styled(motion.div)`
  background-color: rgba(0, 212, 255, 1);
  height: 80px;
  width: 80px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 50%;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxVariants = {
  hover: (i) => ({
    scale: 1.2,
    x: i == 1 || i == 3 ? -30 : 30,
    y: i == 3 || i == 4 ? 25 : -25,
  }),
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [selectedBox, setSelectedBox] = useState(null);
  const toggleClicked = () => {
    setIndex((prev) => (prev === 1 ? 0 : 1));
  };
  const onClickBox = (i) => {
    setSelectedBox(i);
  };

  return (
    <Wrapper>
      <Grid>
        <Box
          layoutId="1"
          onClick={() => onClickBox("1")}
          variants={boxVariants}
          whileHover="hover"
          transision={{ type: "linear", duration: 0.5 }}
          custom={1}
        />
        <Box
          variants={boxVariants}
          custom={2}
          whileHover="hover"
          transision={{ type: "linear", duration: 0.5 }}
        >
          {index === 0 ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box
          variants={boxVariants}
          whileHover="hover"
          custom={3}
          transision={{ type: "linear", duration: 0.5 }}
        >
          {" "}
          {index === 1 ? <Circle layoutId="circle" /> : null}
        </Box>

        <Box
          layoutId="0"
          onClick={() => onClickBox("0")}
          variants={boxVariants}
          whileHover="hover"
          custom={4}
          transision={{ type: "linear", duration: 0.5 }}
        />
      </Grid>

      <Button onClick={toggleClicked}>Switch</Button>

      <AnimatePresence>
        {selectedBox ? (
          <Overlay
            variants={overlay}
            onClick={() => onClickBox(null)}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Box layoutId={selectedBox} style={{ width: 350, height: 230 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
