import React, { useState } from "react";
import Bidding from "./Bidding";
import SelectCrypto from "./SelectCrypto";
import EnterAmount from "./EnterAmount";
import Confirm from "./Confirm";
import Dashboard from "../../../layout/Dashboard";

const steps = ["Select crypto", "Enter amount", "Confirm"];

const SellCrypto = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Dashboard>
        <Bidding title="Create Alert" items={steps} activeIndex={activeIndex}>
          {activeIndex === 0 && (
            <SelectCrypto goNext={() => setActiveIndex(1)} />
          )}
          {activeIndex === 1 && (
            <EnterAmount
              goBack={() => setActiveIndex(0)}
              goNext={() => setActiveIndex(2)}
            />
          )}
          {activeIndex === 2 && (
            <Confirm
              goBack={() => setActiveIndex(1)}
              goFinish={() => setActiveIndex(0)}
            />
          )}
        </Bidding>
      </Dashboard>
    </>
  );
};

export default SellCrypto;
