import React, { useState } from "react";
import Bidding from "./Bidding";
import SelectCrypto from "./SelectCrypto";
import EnterAmount from "./EnterAmount";
import Confirm from "./Confirm";
import Image from "next/image";
import Link from "next/link";
import Dashboard from "../../../layout/Dashboard";
import Modal from "../../../components/atoms/Modal";

const steps = ["Select Crypto", "Enter Amount", "Confirm"];

const SellCrypto = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Modal
        visible={visible}
        onClose={() => {}}
        title={"Page is still in construction"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "50vh",
            textAlign: "center",
          }}
        >
          <Image width={512} height={512} src="/images/404.png" alt="hero" />
          <Link href="/dashboard/overview">
            <a onClick={() => setVisible(false)}>Back to Overview</a>
          </Link>
        </div>
      </Modal>
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
