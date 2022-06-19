import { createSignal } from 'solid-js';
import Dialog from "solid-dismiss";
import { AiOutlineClose } from 'solid-icons/ai';
import { FiAward } from 'solid-icons/fi';
import styles from './Prize.module.css';

const Prize = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  let buttonRef;

  const onClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
      props.setIsOpen(false);
    }
  };

  return (
    <>
      <div
        class={styles.openButton}
        ref={buttonRef}
      >
        <FiAward
          size={60}
          color={props.isAwarded ? "gold" : "#000"}
          class={styles.prizeIcon}
        />
      </div>

      <Dialog
        menuButton={buttonRef}
        open={isOpen}
        setOpen={setIsOpen}
        modal
      >
        <div class={styles.modalContainer} onClick={onClickOverlay}>
          <div class={styles.modal}>
            <div class={styles.header}>
              <div class={styles.headerText}>
                <p>Prize</p>
              </div>
              <div class={styles.closeButtonSection}>
                <AiOutlineClose
                  size={24}
                  color="#000000"
                  onClick={() => setIsOpen(false)}
                  class={styles.closeButton}
                />
              </div>
            </div>
            <div class={styles.text}>
              <p>{props.prize}</p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Prize;
