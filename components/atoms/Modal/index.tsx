import React, { MouseEventHandler, useCallback, useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Modal.module.sass";
import Icon from "../Icon";

export type ModalContent = {
  title?: string;
  children?: React.ReactNode;
};

type ModalProps = {
  outerClassName?: string;
  visible: boolean;
  onClose: (e?: MouseEvent) => void;
  children: React.ReactNode;
  title: string;
};

const Modal = ({
  outerClassName,
  visible,
  onClose,
  children,
  title,
}: ModalProps) => {
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", escFunction, false);
      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }
  }, [escFunction]);

  useEffect(() => {
    if (visible) {
      const target = document.querySelector("#modal");
      if (target) {
        disableBodyScroll(target);
      }
    } else {
      clearAllBodyScrollLocks();
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <div id="modal" className={styles.modal}>
          <div className={cn(styles.outer, outerClassName)}>
            <OutsideClickHandler onOutsideClick={onClose}>
              {title && <p className={styles.header}>{title}</p>}
              {children && <div>{children}</div>}
              <button
                className={styles.close}
                onClick={() => {
                  onClose();
                }}
              >
                <Icon name="close" size="24" />
              </button>
            </OutsideClickHandler>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
