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
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxVariants = {
  hover: { scale: 1.2 },
};

export default function App() {
  const [id, setId] = useState();
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            variants={boxVariants}
            whileHover="hover"
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
          >
            {n == "2" && !clicked ? (
              <Circle layoutId="circle" style={{ borderRadius: 50 }} />
            ) : null}
            {n == "3" && clicked ? (
              <Circle layoutId="circle" style={{ borderRadius: 50 }} />
            ) : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 200, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button onClick={toggleClicked}>Switch</Button>
    </Wrapper>
  );
}
