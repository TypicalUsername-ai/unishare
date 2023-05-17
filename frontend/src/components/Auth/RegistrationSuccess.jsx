import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';

const RegistrationSuccess = ({handleSave}) => {

    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    return(
        <Toast.Provider swipeDirection="right">
      <button
        className="formButton"
        onClick={() => {
          handleSave();  
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Register
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">Scheduled: Catch up</Toast.Title>
        <Toast.Description asChild>
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
          <button className="Button small green">Undo</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
    );
}    
export default RegistrationSuccess;